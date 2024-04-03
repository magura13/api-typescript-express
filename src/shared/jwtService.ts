import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

interface IJWTData {
  uid: string | undefined;
}

export class JWTGenerator {
  public sign = (data: IJWTData): string | 'JWT_SECRET_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
  };

  public signRefresh = (data:IJWTData): string | 'JWT_SECRET_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
    return jwt.sign(
      data,
      process.env.JWT_SECRET,
      {
          expiresIn: '7d',
      }
  );
  }

  

  public verify = (
    token: string
  ): IJWTData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof decoded === 'string') {
        return 'INVALID_TOKEN';
      }
      return decoded as IJWTData;
    } catch (error) {
      return 'INVALID_TOKEN';
    }
  };
}
