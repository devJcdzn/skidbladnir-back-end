export interface Params {
  name: string;
  key: string;
  contentType: string;
}

export interface IGenerateUploadUrlRepository {
  save(params: Params): Promise<{ id: string }>;
}
