import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';              // 👈 importa o path
import { fileURLToPath } from 'url';  // 👈 para conseguir __dirname em ESM

import authRoutes from './routes/authRoutes.js';
import administratorRoutes from './routes/administratorRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import publicationRoutes from './routes/publicationRoutes.js';
import publicPublicationRoutes from './routes/publicPublicationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';   // 👈 IMPORTA AQUI

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admins', administratorRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/public/publications', publicPublicationRoutes);
app.use('/api/uploads', uploadRoutes);     

// servir arquivos estáticos da pasta uploads
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'))
);

// Middleware de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Algo deu errado no servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
