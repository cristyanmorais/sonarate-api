import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Verifica se o usuário está tentando acessar/modificar sua própria conta
export const isAccountOwner = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const accountId = Number(req.params.id);
  
    if (userId !== accountId) {
      return res.status(403).json({ error: 'You are not allowed to access this account' });
    }
  
    next();
};

// Valida os dados antes de criar/atualizar uma conta
export const validateAccountData = (req: Request, res: Response, next: NextFunction) => {
    const accountSchema = z.object({
        name: z.string().min(3, 'Name need to be at least 3 characters'),
        surname: z.string().min(3, 'Surname need to be at least 3 characters'),
        username: z.string().min(5, 'Username need to be at least 5 characters').regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Password need to be at least 8 characters'),
    });

    const validate = accountSchema.safeParse(req.body);

    if (!validate.success) {
        res.status(400).json({ error: validate.error.errors.map(err => err.message).join(', ') });
        return;
    }

    next();
};

