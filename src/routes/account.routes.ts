import { Router, Request, Response } from 'express';
import { AccountController } from '../infra/http/controllers/account.controller';
import { authMiddleware } from '../infra/http/middlewares/auth.middleware';
import { isAccountOwner, validateAccountData } from '../infra/http/middlewares/account.middleware';

const router = Router();
const controller = new AccountController();

// Rotas públicas
router.post('/login', async (req: Request, res: Response) => {
  await controller.login(req, res);
});

router.post('/register', validateAccountData, async (req: Request, res: Response) => {
  await controller.create(req, res);
});

// Rotas protegidas
// router.use(authMiddleware); // Middleware de autenticação para todas as rotas abaixo

router.get('/', async (req: Request, res: Response) => {
  await controller.findAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  await controller.findById(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  await controller.update(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await controller.delete(req, res);
});

export default router; 