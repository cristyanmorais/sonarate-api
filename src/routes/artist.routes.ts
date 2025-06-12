import { Router, Request, Response } from 'express';
import { ArtistController } from '../infra/http/controllers/artist.controller';
import { authMiddleware } from '../infra/http/middlewares/auth.middleware';
import { validateArtistData } from '../infra/http/middlewares/artist.middleware';

const router = Router();
const controller = new ArtistController();

// Public Routes
router.get('/', async (req: Request, res: Response) => {
    await controller.findAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await controller.findById(req, res);
});

// Protected Routes
// router.use(authMiddleware); // Auth middleware to protect routes below

router.post('/create', validateArtistData, async (req: Request, res: Response) => {
    await controller.create(req, res);
});

router.put('/update/:id', validateArtistData, async (req: Request, res: Response) => {
    await controller.update(req, res);
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await controller.delete(req, res);
});

export default router;