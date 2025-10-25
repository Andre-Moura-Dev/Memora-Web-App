import express from 'express';
import { check } from 'express-validator';
import PublicationController from '../controllers/publicationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// criar publicação
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

// listar todas publicações
router.get('/', authMiddleware, PublicationController.getAll);

// listar publicação por id
router.get('/:id', authMiddleware, PublicationController.getById);

// atualizar publicação
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

// atualizar curtidas e comentários
router.put(
  '/:id/metrics',
  authMiddleware,
  [
    check('curtidas', 'Curtidas devem ser um número').optional().isInt(),
    check('comentarios', 'Comentários devem ser um número').optional().isInt()
  ],
  PublicationController.updateLikesAndComments
);

// deletar publicação
router.delete('/:id', authMiddleware, PublicationController.delete);

export default router;
