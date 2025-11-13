import express from 'express';
import { check } from 'express-validator';
import PermissionController from '../controllers/permissionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Criar permissão
router.post(
  '/',
  authMiddleware,
  [
    check('ID_Administradores', 'ID do administrador é obrigatório').isInt(),
    check('descricao', 'Descrição é obrigatória').not().isEmpty(),
    check('nivel_permissao', 'Nível de permissão é obrigatório').not().isEmpty()
  ],
  PermissionController.create
);

// Listar todas as permissões
router.get('/', authMiddleware, PermissionController.getAll);

// Listar todas as permissões de um admin
router.get('/admin/:adminId', authMiddleware, PermissionController.getByAdmin);

// Buscar permissão por id
router.get('/:id', authMiddleware, PermissionController.getById);

// Atualizar permissão
router.put(
  '/:id',
  authMiddleware,
  [
    check('descricao', 'Descrição é obrigatória').optional().not().isEmpty(),
    check('nivel_permissao', 'Nível de permissão é obrigatório').optional().not().isEmpty()
  ],
  PermissionController.update
);

// Deletar permissão
router.delete('/:id', authMiddleware, PermissionController.delete);

export default router;
