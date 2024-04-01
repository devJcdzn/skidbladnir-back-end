# Skidbladnir

Stack: Node.Js, Express/Fastify, Prisma, Cloudflare R2

## Requirements

### Functional Requirements

- [ ] Upload
- [ ] View the last 5 uploads

### Business Roles

- [ ] Uploads must be removed after 7 days
- [ ] It will only be possible to view unexpired uploads
- [ ] It will only be possible to upload secure files
- [ ] Max file size: 1gb

### Not functional requirements

- [ ] Cloudflare R2 must be utilized
- [ ] Uploading must be done directly from the front-end
- [ ] Used Presigned Urls to Upload & Sharing

## Notes

### Mime Types

```ts
const bannedMimeTypes = [
  ".dll", // (dynamics libraries)
  ".bat", // (batch files)
  ".cmd", // (command files)
  ".sh", // (scripts shell)
  ".cgi", // (scripts cGI)
  ".jar", // (Java files)
  ".app", // (macOS apps)
];
```

### Code Snapshots

#### Cloudflare Connection(AWS SDK)

```ts
import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3CLient({
  region: "auto",
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});
```

#### Cloudflare Upload

```ts
const signedUrl = await getSignedUrl(
  r2,
  new PutObjectCommand({
    Bucket: "bucket-name",
    Key: "file.m4",
    ContentType: "video/mp4",
  }),
  { expiresIn: 600 }
);
```

```ts
await axios.put(uploadUrl, file, {
  headers: {
    "Content-Type": file.type,
  },
});
```
