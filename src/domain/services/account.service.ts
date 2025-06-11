import { Account, CreateAccountDTO, UpdateAccountDTO } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { AuthService } from './auth.service';
import bcrypt from 'bcrypt';

export class AccountService {
  private repository: AccountRepository;
  private authService: AuthService;

  constructor() {
    this.repository = new AccountRepository();
    this.authService = new AuthService();
  }

  async create(data: CreateAccountDTO): Promise<Account> {
    // Verifica se já existe um usuário com o mesmo email
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    // Verifica se já existe um usuário com o mesmo username
    const existingUsername = await this.repository.findByUsername(data.username);
    if (existingUsername) {
      throw new Error('Username already registered');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Cria o usuário com a senha criptografada
    return this.repository.create({
      ...data,
      password: hashedPassword
    });
  }

  async findById(id: number): Promise<Account | null> {
    const account = await this.repository.findById(id);
    if (!account) {
      throw new Error('User not found');
    }
    return account;
  }

  async update(id: number, data: UpdateAccountDTO): Promise<Account> {
    // Verifica se o usuário existe
    const account = await this.repository.findById(id);
    if (!account) {
      throw new Error('User not found');
    }

    // Se estiver atualizando o email, verifica se já existe
    if (data.email) {
      const existingEmail = await this.repository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new Error('Email already registered');
      }
    }

    // Se estiver atualizando o username, verifica se já existe
    if (data.username) {
      const existingUsername = await this.repository.findByUsername(data.username);
      if (existingUsername && existingUsername.id !== id) {
        throw new Error('Username already registered');
      }
    }

    // Se estiver atualizando a senha, criptografa
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<Account> {
    const account = await this.repository.findById(id);
    if (!account) {
      throw new Error('User not found');
    }
    return this.repository.delete(id);
  }

  async findAll(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async validateCredentials(email: string, password: string): Promise<{ account: Account; token: string }> {
    const account = await this.repository.findByEmail(email);
    if (!account) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, account.password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    const token = this.authService.generateToken(account);

    return {
      account,
      token
    };
  }
} 