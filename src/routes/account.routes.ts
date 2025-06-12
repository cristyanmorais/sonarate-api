import { Router, Request, Response } from 'express';
import { AccountController } from '../infra/http/controllers/account.controller';
import { authMiddleware } from '../infra/http/middlewares/auth.middleware';
import { isAccountOwner, validateAccountData } from '../infra/http/middlewares/account.middleware';

const router = Router();
const controller = new AccountController();

// Public Routes
router.post('/login', async (req: Request, res: Response) => {
  await controller.login(req, res);
});

router.post('/register', validateAccountData, async (req: Request, res: Response) => {
  await controller.create(req, res);
});

// Protected Routes
// router.use(authMiddleware); // Auth middleware to protect routes below

router.get('/', async (req: Request, res: Response) => {
  await controller.findAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  await controller.findById(req, res);
});

router.put('/update/:id', async (req: Request, res: Response) => {
  await controller.update(req, res);
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
  await controller.delete(req, res);
});

export default router; 