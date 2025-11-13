import PublicationService from '../services/PublicationService.js';
import { validationResult } from 'express-validator';

class PublicationController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { ID_Administradores, titulo, conteudo, categoria, status } = req.body;
      const pub = await PublicationService.createPublication({
        ID_Administradores,
        titulo,
        conteudo,
        categoria,
        status,
      });
      res.status(201).json(pub);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const pub = await PublicationService.getPublicationById(id);
      res.json(pub);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const pubs = await PublicationService.getAllPublications();
      res.json(pubs);
    } catch (error) {
      next(error);
    }
  }

  static async getPublicationsByAdmin(req, res, next) {
    try {
      const { adminId } = req.params;
      const pubs = await PublicationService.getPublicationsByAdminId(adminId);
      res.json(pubs);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { id } = req.params;
      const updated = await PublicationService.updatePublication(id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async updateStats(req, res, next) {
    try {
      const { id } = req.params;
      const { curtidas, comentarios } = req.body;
      const updated = await PublicationService.updatePublicationStats(id, { curtidas, comentarios });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async publish(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await PublicationService.publishPublication(id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async archive(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await PublicationService.archivePublication(id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await PublicationService.deletePublication(id);
      res.json({ message: 'Publicação excluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default PublicationController;