import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthService } from '../../../domain/services/auth.service';

export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  try {
    const authService = new AuthService();
    const decoded = authService.verifyToken(token);
    
    // Adiciona o usuário decodificado à requisição
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}; 