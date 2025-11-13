import Administrator from '../models/AdministratorModel.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import bcrypt from 'bcrypt';

class AdministratorService {
  //Cadastro de administrador
  static async registerAdministrator({ nome, email, senha, nivel_acesso, tipo_usuario }) {
    if (!nome || !email || !senha || !nivel_acesso || !tipo_usuario) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    // Verifica se já existe um administrador com o mesmo email
    const existingAdmin = await Administrator.findByEmail(email);
    if (existingAdmin) {
      throw new Error('Esse email já está sendo utilizado.');
    }

    // Cria o novo administrador com senha criptografada
    const newAdmin = await Administrator.create({
      nome,
      email,
      senha,
      nivel_acesso,
      tipo_usuario,
    });

    return newAdmin;
  }

  //Login de administrador
  static async loginAdministrator(email, senha) {
    if (!email || !senha) {
      throw new Error('Email e senha são obrigatórios.');
    }

    const admin = await Administrator.findByEmail(email);
    if (!admin) {
      throw new Error('Administrador não encontrado.');
    }

    // Verifica a senha com bcrypt
    const isMatch = await bcrypt.compare(senha, admin.senha);
    if (!isMatch) {
      throw new Error('Credenciais inválidas.');
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id_administradores: admin.id_administradores,
        email: admin.email,
        nivel_acesso: admin.nivel_acesso,
        tipo_usuario: admin.tipo_usuario,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Remove a senha da resposta
    const { senha: _, ...adminData } = admin;

    return { admin: adminData, token };
  }

  //Busca administrador por ID
  static async getAdministratorById(id) {
    const admin = await Administrator.findById(id);
    if (!admin) throw new Error('Administrador não encontrado.');
    return admin;
  }

  //Atualiza dados do administrador
  static async updateAdministrator(id, updateData) {
    const { nome, email, nivel_acesso, tipo_usuario } = updateData;

    if (!nome || !email || !nivel_acesso || !tipo_usuario) {
      throw new Error('Campos obrigatórios ausentes.');
    }

    // Evita duplicidade de email
    const existingAdmin = await Administrator.findByEmail(email);
    if (existingAdmin && existingAdmin.id_administradores !== parseInt(id)) {
      throw new Error('Esse email já está sendo utilizado.');
    }

    return await Administrator.update(id, { nome, email, nivel_acesso, tipo_usuario });
  }

  //Atualiza senha
  static async updateAdministratorPassword(id, currentPassword, newPassword) {
    const admin = await Administrator.findById(id);
    if (!admin) {
      throw new Error('Administrador não encontrado.');
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.senha);
    if (!isMatch) {
      throw new Error('Senha atual incorreta.');
    }

    await Administrator.updatePassword(id, newPassword);
    return { message: 'Senha atualizada com sucesso.' };
  }

  //Exclui administrador
  static async deleteAdministrator(id) {
    const admin = await Administrator.findById(id);
    if (!admin) {
      throw new Error('Administrador não encontrado.');
    }

    await Administrator.delete(id);
    return { message: 'Administrador removido com sucesso.' };
  }
}

export default AdministratorService;