import express from 'express';
import { check } from 'express-validator';
import PublicationController from '../controllers/publicationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


// Listar todas as publicações (PÚBLICO)
router.get('/', PublicationController.getAll);

// Buscar publicação por ID (PÚBLICO)
router.get('/:id', PublicationController.getById);

// Criar publicação
router.post(
  '/',
  authMiddleware,
  [
    check('ID_Administradores', 'ID do administrador é obrigatório').isInt(),
    check('titulo', 'Título é obrigatório').not().isEmpty(),
    check('conteudo', 'Conteúdo é obrigatório').not().isEmpty(),
    check('categoria', 'Categoria é obrigatória').not().isEmpty(),
    check('status', 'Status é obrigatório').not().isEmpty()
  ],
  PublicationController.create
);


// Listar todas as publicações
router.get('/', authMiddleware, PublicationController.getAll);

// Listar publicações de um administrador específico
router.get('/admin/:adminId', authMiddleware, PublicationController.getPublicationsByAdmin);

// Buscar publicação por ID
router.get('/:id', authMiddleware, PublicationController.getById);

// Atualizar publicação
router.put(
  '/:id',
  authMiddleware,
  [
    check('titulo', 'Título é obrigatório').optional().not().isEmpty(),
    check('conteudo', 'Conteúdo é obrigatório').optional().not().isEmpty(),
    check('categoria', 'Categoria é obrigatória').optional().not().isEmpty(),
    check('status', 'Status é obrigatório').optional().not().isEmpty()
  ],
  PublicationController.update
);

// Atualizar curtidas e comentários (métricas)
router.put(
  '/:id/stats',
  authMiddleware,
  [
    check('curtidas', 'Curtidas devem ser um número').optional().isInt(),
    check('comentarios', 'Comentários devem ser um número').optional().isInt()
  ],
  PublicationController.updateStats
);

// Publicar uma publicação
router.patch('/:id/publish', authMiddleware, PublicationController.publish);

// Arquivar uma publicação
router.patch('/:id/archive', authMiddleware, PublicationController.archive);

// Deletar publicação
router.delete('/:id', authMiddleware, PublicationController.delete);

export default router;
