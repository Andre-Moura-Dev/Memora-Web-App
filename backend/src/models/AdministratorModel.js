import db from "../../config/database.js";
import bcrypt from "bcrypt";

class Administrator {
  static async create({ nome, email, senha, nivel_acesso, tipo_usuario }) {
    if(!senha || typeof senha !== 'string') {
      throw new Error('Senha inválida!');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      `INSERT INTO administradores (nivel_acesso, nome, email, senha, tipo_usuario)
       VALUES (?, ?, ?, ?, ?)`,
      [nivel_acesso, nome, email, hashedPassword, tipo_usuario]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT id_administradores, nivel_acesso, nome, email, tipo_usuario
       FROM administradores
       WHERE id_administradores = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT id_administradores, nivel_acesso, nome, email, senha, tipo_usuario
       FROM administradores
       WHERE email = ?`,
      [email]
    );
    return rows[0] || null;
  }

  static async findAll() {
    const [rows] = await db.query(
      `SELECT
        id_administradores,
        nivel_acesso,
        nome,
        email,
        tipo_usuario
       FROM administradores`
    );
    return rows;
  }

  static async update(id, { nome, email, nivel_acesso, tipo_usuario }) {
    const [result] = await db.query(
      `UPDATE administradores
       SET nome = ?, email = ?, nivel_acesso = ?, tipo_usuario = ?
       WHERE id_administradores = ?`,
      [nome, email, nivel_acesso, tipo_usuario, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Administrador não encontrado!');
    }

    return this.findById(id);
  }

  static async updatePassword(id, newPassword) {
    if (!newPassword || typeof newPassword !== 'string') {
      throw new Error('Nova senha inválida');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      `UPDATE administradores
       SET senha = ?
       WHERE id_administradores = ?`,
      [hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Administrador não encontrado!');
    }
  }

  static async delete(id) {
    const [result] = await db.query(
      `DELETE FROM administradores WHERE id_administradores = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Administrador não Encontrado!');
    }
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
      throw new Error('senha e hash são necessárias para comparação!');
    }
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
export default Administrator;