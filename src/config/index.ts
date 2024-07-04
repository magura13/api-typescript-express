import { config as loadConfig } from 'dotenv';

loadConfig({
  path: '.env',
});

interface AwsConfig {
  AccessKeyId: string | undefined;
  AWSSecretKey: string | undefined;
  BucketName: string | undefined;
  Region: string;
}

interface Config {
  PORT: number;
  AWS: AwsConfig;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || '', 10) || 3010,
  AWS: {
    AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    AWSSecretKey: process.env.AWS_SECRET_KEY,
    BucketName: process.env.AWS_S3_BUCKET_NAME,
    Region: 'us-east-1',
  },
};

export default config;
