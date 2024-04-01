import { Router } from "express";
import { randomUUID } from "node:crypto";

import { uploadBodySchema } from "../services/schemas/upload-body";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../lib/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../db";
import { uploadRoutes } from "./uploads";

export const routes = Router();

routes.use("/uploads", uploadRoutes);

