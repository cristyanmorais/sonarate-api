import { PrismaClient } from '../../generated/prisma';
import { Account, CreateAccountDTO, UpdateAccountDTO } from '../entities/account.entity';

export class AccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateAccountDTO): Promise<Account> {
    return this.prisma.account.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async findAll(): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: {
        deletedAt: null
      }
    });
  }

  async findById(id: number): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { 
        id,
        deletedAt: null
      }
    });
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { 
        email,
        deletedAt: null
      }
    });
  }

  async findByUsername(username: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { 
        username,
        deletedAt: null
      }
    });
  }

  async update(id: number, data: UpdateAccountDTO): Promise<Account> {
    return this.prisma.account.update({
      where: { 
        id,
        deletedAt: null
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  async delete(id: number): Promise<Account> {
    return this.prisma.account.update({
      where: { 
        id,
        deletedAt: null
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
} 