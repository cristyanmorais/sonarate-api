import prisma from './index';

async function testConnection() {
  try {
    // Tenta conectar ao banco de dados
    await prisma.$connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');

    // Tenta fazer uma query simples
    const result = await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('✅ Query de teste executada com sucesso:', result);

    // Tenta criar uma tabela de teste
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        test_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela de teste criada com sucesso!');

    // Insere um registro de teste
    await prisma.$executeRaw`
      INSERT INTO test_connection (test_date) VALUES (CURRENT_TIMESTAMP)
    `;
    console.log('✅ Registro de teste inserido com sucesso!');

    // Busca o registro inserido
    const testRecord = await prisma.$queryRaw`
      SELECT * FROM test_connection ORDER BY id DESC LIMIT 1
    `;
    console.log('✅ Registro de teste recuperado:', testRecord);

    // Remove a tabela de teste
    await prisma.$executeRaw`DROP TABLE IF EXISTS test_connection`;
    console.log('✅ Tabela de teste removida com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  } finally {
    // Sempre desconecta do banco de dados
    await prisma.$disconnect();
  }
}

// Executa o teste
testConnection(); 