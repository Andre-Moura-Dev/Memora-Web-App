// src/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// onde salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde as imagens vão ficar
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

// rota: POST /api/uploads/image
router.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  // caminho relativo que vamos usar no front
  const url = `/uploads/${req.file.filename}`;

  return res.status(201).json({
    url,
  });
});

export default router;
