import PermissionService from '../services/PermissionService.js';
import { validationResult } from 'express-validator';

class PermissionController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { ID_Administradores, descricao, nivel_permissao } = req.body;
      const permission = await PermissionService.createPermission({ ID_Administradores, descricao, nivel_permissao });
      res.status(201).json(permission);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const permission = await PermissionService.getPermissionById(id);
      if (!permission) return res.status(404).json({ error: 'Permissão não encontrada' });
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }

  static async getByAdmin(req, res, next) {
    try {
      const { adminId } = req.params;
      const permissions = await PermissionService.getPermissionsByAdminId(adminId);
      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { id } = req.params;
      const updated = await PermissionService.updatePermission(id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await PermissionService.deletePermission(id);
      res.json({ message: 'Permissão excluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default PermissionController;
