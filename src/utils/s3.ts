import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../config/index';

interface CreatePresignedPostParams {
  key: string;
  contentType: string;
}

if (
  !config.AWS.Region ||
  !config.AWS.AccessKeyId ||
  !config.AWS.AWSSecretKey ||
  !config.AWS.BucketName
) {
  throw new Error('AWS configuration is missing.');
}

const s3Config = {
  region: config.AWS.Region,
  credentials: {
    accessKeyId: config.AWS.AccessKeyId,
    secretAccessKey: config.AWS.AWSSecretKey,
  },
};

const s3 = new S3Client(s3Config);

const BUCKET_NAME: string = config.AWS.BucketName;

export async function createPresignedPost({
  key,
  contentType,
}: CreatePresignedPostParams): Promise<{
  fileLink: string;
  signedUrl: string;
}> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const fileLink: string = `https://${BUCKET_NAME}.s3.${config.AWS.Region}.amazonaws.com/${key}`;

  const signedUrl: string = await getSignedUrl(s3, command, {
    expiresIn: 5 * 60,
  });

  return { fileLink, signedUrl };
}
