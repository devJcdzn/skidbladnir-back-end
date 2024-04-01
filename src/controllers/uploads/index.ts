import { randomUUID } from "crypto";
import { uploadBodySchema } from "../../services/schemas/upload-body";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { badRequest, created } from "../helpers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../../lib/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { IGenerateUploadUrlRepository } from "./protocols";
import { prisma } from "../../db";

export class GenerateUploadUrl implements IController {
  async handle(request: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
    const { body } = request;

    const { name, contentType } = uploadBodySchema.parse(body);

    const fileKey = randomUUID().concat("-").concat(name);

    const signedUrl = await this.generateSignedUrl(fileKey, contentType);

    const file = await prisma.file.create({
      data: { name, key: fileKey, contentType },
    });

    return created({
      id: file.id,
      signedUrl,
    });
  }

  private async generateSignedUrl(key: string, contentType: string) {
    if (!key || contentType) return badRequest("Fields missing.");

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: "skidbladnir-dev",
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: 600 }
    );

    return getSignedUrl;
  }
}
