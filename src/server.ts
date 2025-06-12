import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accountRoutes from './routes/account.routes';
import artistRoutes from './routes/artist.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/accounts', accountRoutes);
app.use('/artists', artistRoutes);

const PORT = process.env.PORT || 8000;

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

export default app;
