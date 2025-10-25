import AdministratorService from '../services/AdministratorService.js';

class AdministratorController {
  static async register(req, res) {
    try {
      const { nome, email, senha, nivel_acesso } = req.body;
      const admin = await AdministratorService.registerAdministrator({ nome, email, senha, nivel_acesso });
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
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });
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
      await AdministratorService.updateAdministratorPassword(id, currentPassword, newPassword);
      res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await AdministratorService.deleteAdministrator(id);
      res.json({ message: 'Administrador excluído com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AdministratorController;
