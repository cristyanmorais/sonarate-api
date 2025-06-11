import jwt from 'jsonwebtoken';
import { Account } from '../entities/account.entity';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
  private readonly JWT_EXPIRES_IN = '24h';

  generateToken(account: Account): string {
    const payload = {
      id: account.id,
      email: account.email,
      username: account.username
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
} 