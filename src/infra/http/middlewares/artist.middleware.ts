import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateArtistData = (req: Request, res: Response, next: NextFunction) => {
    const artistSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long'),
    });

    const validation = artistSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ error: validation.error.errors.map(err => err.message).join(', ') });
        return;
    }

    next();
}