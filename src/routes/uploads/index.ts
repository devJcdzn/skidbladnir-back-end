import { Router } from "express";
import { prisma } from "../../db";
import { randomUUID } from "crypto";
import { r2 } from "../../lib/cloudflare";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  getFilesParamsSchema,
  uploadBodySchema,
} from "../../services/schemas/upload-body";

const router = Router();

router.post("/", async (req, res) => {
  const { name, contentType } = uploadBodySchema.parse(req.body);

  const fileKey = randomUUID().concat("-").concat(name);

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: "skidbladnir-dev",
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 600 }
  );

  const file = await prisma.file.create({
    data: {
      name,
      key: fileKey,
      contentType,
    },
  });

  return res.status(201).json({ fileId: file.id, signedUrl });
});

router.get("/:id", async (req, res) => {
  const { id } = getFilesParamsSchema.parse(req.params);

  const file = await prisma.file.findFirstOrThrow({
    where: { id },
  });

  const signedUrl = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: "skidbladnir-dev",
      Key: file.key,
    }),
    { expiresIn: 600 }
  );

  return res.status(301).redirect(signedUrl);
});

export { router as uploadRoutes };
