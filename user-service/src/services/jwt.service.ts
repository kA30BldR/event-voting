import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

class JwtService {
  private static readonly secretKey: string = 'your-secret-key';
  private static readonly expiresIn: string = '1h';

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.secretKey) as JwtPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}

export default JwtService;
