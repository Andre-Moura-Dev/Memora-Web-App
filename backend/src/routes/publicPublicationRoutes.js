// src/routes/publicPublicationRoutes.js
import express from 'express';
import PublicationService from '../services/PublicationService.js';

const router = express.Router();

// GET /api/public/publications  -> lista só publicadas, com conteudo
router.get('/', async (req, res, next) => {
  try {
    const pubs = await PublicationService.getAllPublicPublications();
    res.json(pubs);
  } catch (err) {
    next(err);
  }
});

// GET /api/public/publications/:id  -> detalhe público
router.get('/:id', async (req, res, next) => {
  try {
    const pub = await PublicationService.getPublicationById(req.params.id);
    res.json(pub);
  } catch (err) {
    next(err);
  }
});

export default router;
