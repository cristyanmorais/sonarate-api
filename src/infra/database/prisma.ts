import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Configuração para usar UTC-3
  log: ['query', 'info', 'warn', 'error'],
  // Configuração do timezone
  // Isso fará com que todas as datas sejam salvas em UTC-3
  // e também serão retornadas em UTC-3
  // O PostgreSQL irá converter automaticamente
  // baseado na configuração do banco de dados
});

// Configuração do timezone no PostgreSQL
prisma.$executeRaw`SET timezone TO 'America/Sao_Paulo'`;

export { prisma }; 