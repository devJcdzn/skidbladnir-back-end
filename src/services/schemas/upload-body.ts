import { z } from "zod";

export const uploadBodySchema = z.object({
  name: z.string().min(3),
  contentType: z.string().regex(/\w+\/[-+, \w]+/g),
});

export const getFilesParamsSchema = z.object({
  id: z.string().cuid(),
});
