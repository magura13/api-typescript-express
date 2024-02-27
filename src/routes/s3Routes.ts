import express, { Request, Response } from 'express';
import { createPresignedPost } from '../utils/s3';

interface SignedUrlRequestBody {
    key: string;
    content_type: string;
    
}

interface PresignedPostData {
  fileLink: string;
  signedUrl: string;
}

const s3Router = express.Router();

s3Router.post('/signed_url', async (req: Request<{}, {}, SignedUrlRequestBody>, res: Response) => {
    try {
        let { key, content_type } = req.body;
        key = 'public/' + key;
        const data: PresignedPostData = await createPresignedPost({ key, contentType: content_type });
    
        return res.send({
            status: 'success',
            data,
        });

    } catch(err: any) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: err.message,
        });
    }
});

export default s3Router;
