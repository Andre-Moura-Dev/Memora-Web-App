import UserService from '../services/UserService.js';
import { validationResult } from 'express-validator';

class UserController {
  static async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { nome, email, senha } = req.body;
      if (!senha) return res.status(400).json({ error: 'Senha é obrigatória' });

      const user = await UserService.registerUser({ nome, email, senha });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, senha } = req.body;
      if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

      const result = await UserService.loginUser(email, senha);
      res.json(result);
    } catch (error) {
      if (error.message === 'Usuário não encontrado' || error.message === 'Credenciais inválidas') {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { id } = req.params;
      const updated = await UserService.updateUser(id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Senha atual e nova são obrigatórias' });
      }

      await UserService.updateUserPassword(req.user.id, currentPassword, newPassword);
      res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      if (error.message === 'Senha atual está incorreta') {
        return res.status(401).json({ error: error.message });
      }
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;