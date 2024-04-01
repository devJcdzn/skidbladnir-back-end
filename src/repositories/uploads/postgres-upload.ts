import {
  IGenerateUploadUrlRepository,
  Params,
} from "../../controllers/uploads/protocols";
import { prisma } from "../../db";

export class PostgresGenerateUploadUrl implements IGenerateUploadUrlRepository {
  async save(params: Params): Promise<{ id: string }> {
    const { name, key, contentType } = params;

    const file = await prisma.file.create({
      data: {
        name,
        key,
        contentType,
      },
    });

    return file;
  }
}
