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
    // Checks if the email is already registered
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) throw new Error('Email already registered');

    // Checks if the username is already taken
    const existingUsername = await this.repository.findByUsername(data.username);
    if (existingUsername) throw new Error('Username already registered');

    // Hashes the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Creates the user with the hashed password
    return this.repository.create({
      ...data,
      password: hashedPassword
    });
  }
  
  async findAll(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<Account | null> {
    const account = await this.repository.findById(id);
    if (!account) throw new Error('User not found');
    return account;
  }

  async update(id: number, data: UpdateAccountDTO): Promise<Account> {
    // Checks if the user exists
    const account = await this.repository.findById(id);
    if (!account) throw new Error('User not found');

    // If updating the email, checks if it already exists
    if (data.email) {
      const existingEmail = await this.repository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) throw new Error('Email already registered');
    }

    // If updating the username, checks if it already exists
    if (data.username) {
      const existingUsername = await this.repository.findByUsername(data.username);
      if (existingUsername && existingUsername.id !== id) throw new Error('Username already registered');
    }

    // If updating the password, hashes it
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<Account> {
    const account = await this.repository.findById(id);
    if (!account) throw new Error('User not found');
    return this.repository.delete(id);
  }

  async validateCredentials(email: string, password: string): Promise<{ account: Account; token: string }> {
    const account = await this.repository.findByEmail(email);
    if (!account) throw new Error('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, account.password);
    if (!isValidPassword) throw new Error('Invalid credentials');

    const token = this.authService.generateToken(account);

    return {
      account,
      token
    };
  }
} 