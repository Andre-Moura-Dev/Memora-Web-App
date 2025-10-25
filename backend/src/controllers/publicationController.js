import PublicationService from '../services/PublicationService.js';
import { validationResult } from 'express-validator';

class PublicationController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { ID_Administradores, titulo, conteudo, categoria, status } = req.body;
      const pub = await PublicationService.createPublication({ ID_Administradores, titulo, conteudo, categoria, status });
      res.status(201).json(pub);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const pub = await PublicationService.getPublicationById(id);
      if (!pub) return res.status(404).json({ error: 'Publicação não encontrada' });
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

  static async updateLikesAndComments(req, res, next) {
    try {
      const { id } = req.params;
      const { curtidas, comentarios } = req.body;
      const updated = await PublicationService.updateLikesAndComments(id, curtidas, comentarios);
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
