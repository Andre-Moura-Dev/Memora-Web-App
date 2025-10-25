import express from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// rotas públicas
router.post(
  '/register',
  [
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'A senha deve ter ao menos 6 caracteres').isLength({ min: 6 })
  ],
  UserController.register
);

router.post(
  '/login',
  [
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'A senha é obrigatória').not().isEmpty()
  ],
  UserController.login
);

// rotas protegidas
router.get('/:id', authMiddleware, UserController.getById);

router.put(
  '/:id',
  authMiddleware,
  [
    check('nome', 'Nome é obrigatório').optional().not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').optional().isEmail()
  ],
  UserController.update
);

router.put(
  '/:id/password',
  authMiddleware,
  [
    check('currentPassword', 'Senha atual é obrigatória').not().isEmpty(),
    check('newPassword', 'Nova senha precisa ter ao menos 6 caracteres').isLength({ min: 6 })
  ],
  UserController.updatePassword
);

router.delete('/:id', authMiddleware, UserController.delete);

export default router;
