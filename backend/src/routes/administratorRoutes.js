import express from 'express';
import { check } from 'express-validator';
import AdministratorController from '../controllers/administratorControler.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota pública: Login
router.post('/login', [
  check('email', 'Por favor, inclua um email válido').isEmail(),
  check('senha', 'Senha é obrigatória').not().isEmpty(),
], AdministratorController.login);

// Rota pública: Registro
router.post(
  '/register',
  [
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'A senha deve ter ao menos 6 caracteres').isLength({ min: 6 }),
    check('nivel_acesso', 'Nível de acesso é obrigatório').not().isEmpty(),
    check('tipo_usuario', 'Tipo de usuário é obrigatório').not().isEmpty(), // Adicionado
  ],
  AdministratorController.register
);

// Rotas protegidas (apenas admins autenticados)
router.get('/', authMiddleware, AdministratorController.getAll)
router.get('/:id', authMiddleware, AdministratorController.getById);

router.put(
  '/:id',
  authMiddleware,
  [
    check('nome', 'Nome é obrigatório').optional().not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').optional().isEmail(),
    check('nivel_acesso', 'Nível de acesso é obrigatório').optional().not().isEmpty(),
    check('tipo_usuario', 'Tipo de usuário é obrigatório').optional().not().isEmpty(), // Adicionado
  ],
  AdministratorController.update
);

router.put(
  '/:id/password',
  authMiddleware,
  [
    check('currentPassword', 'Senha atual é obrigatória').not().isEmpty(),
    check('newPassword', 'Nova senha precisa ter ao menos 6 caracteres').isLength({ min: 6 })
  ],
  AdministratorController.updatePassword
);

router.delete('/:id', authMiddleware, AdministratorController.delete);

export default router;