import { Request, Response } from 'express';
import { AccountService } from '../../../domain/services/account.service';
import { CreateAccountDTO, UpdateAccountDTO } from '../../../domain/entities/account.entity';

export class AccountController {
  private service: AccountService;

  constructor() {
    this.service = new AccountService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateAccountDTO = req.body;
      const account = await this.service.create(data);
      return res.status(201).json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const account = await this.service.findById(Number(id));
      return res.json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data: UpdateAccountDTO = req.body;
      const account = await this.service.update(Number(id), data);
      return res.json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const accounts = await this.service.findAll();
      return res.json(accounts);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const { account, token } = await this.service.validateCredentials(email, password);
      
      return res.json({
        account,
        token
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
} 