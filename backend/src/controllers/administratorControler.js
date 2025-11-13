import AdministratorService from '../services/AdministratorService.js';

class AdministratorController {
  static async register(req, res) {
    try {
      const { nome, email, senha, nivel_acesso, tipo_usuario } = req.body;
      const admin = await AdministratorService.registerAdministrator({
        nome,
        email,
        senha,
        nivel_acesso,
        tipo_usuario,
      });
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const result = await AdministratorService.loginAdministrator(email, senha);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const admin = await AdministratorService.getAdministratorById(id);
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await AdministratorService.updateAdministrator(id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      const result = await AdministratorService.updateAdministratorPassword(id, currentPassword, newPassword);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await AdministratorService.deleteAdministrator(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AdministratorController;