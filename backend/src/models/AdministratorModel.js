import db from '../../config/database.js';
import bcrypt from 'bcrypt';

class Administrator {
  static async create({ nome, email, senha, nivel_acesso }) {

    if (!senha || typeof senha !== 'string') {
      throw new Error('Senha inválida');
    }

    const hashedPassword = await bcrypt.hash(password_a, 10);
    
    const [userResult] = await db.query(
      'INSERT INTO Usuarios (nome, email, senha_hash, criado_em) VALUES (?, ?, ?, NOW())',
      [nome, email, hashedPassword]
    );

    const userId = userResult.insertId;

    const [adminResult] = await db.query(
      'INSERT INTO Administradores (nivel_acesso, ID_Usuarios) VALUES (?, ?)',
      [nivel_acesso, userId]
    );

    return this.findById(adminResult.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT a.id_administradores, a.nivel_acesso, u.id_usuarios, u.nome, u.email, u.criado_em
       FROM Administradores a
       JOIN Usuarios u ON a.ID_Usuarios = u.id_usuarios
       WHERE A.id_administradores = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT a.id_administradores, a.nivel_acesso, u.id_usuarios, u.nome, u.email, u.senha_hash
       FROM Administradores a
       JOIN Usuarios u ON a.ID_Usuarios = u.id_usuarios
       WHERE u.email = ?`,
      [email]
    );
    return rows[0];
  }

  static async update(id, { nome, email, nivel_acesso }) {

    const [adminRow] = await db.query(
      'SELECT ID_Usuarios FROM Administradores WHERE id_administradores = ?',
      [id]
    );

    if (adminRow.length === 0) throw new Error('Administrador não encontrado');

    const userId = adminRow[0].ID_Usuarios;

    await db.query(
      'UPDATE Usuarios SET nome = ?, email = ? WHERE id_usuarios = ?',
      [nome, email, userId]
    );

    await db.query(
      'UPDATE Administradores SET nivel_acesso = ? WHERE id_administradores = ?',
      [nivel_acesso, id]
    );
    return this.findById(id);
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [adminRow] = await db.query(
      'SELECT ID_Usuarios FROM Administradores WHERE id_administradores = ?',
      [id]
    );

    if (adminRow.length === 0) throw new Error('Administrador não encontrado');

    const userId = adminRow[0].ID_Usuarios;

    await db.query(
      'UPDATE Usuarios SET senha_hash = ? WHERE id_usuarios = ?',
      [hashedPassword, userId]
    );
  }

  static async delete(id) {
    const [adminRow] = await db.query(
      'SELECT ID_Usuarios FROM Administradores WHERE id_administradores = ?',
      [id]
    );

    if (adminRow.length === 0) throw new Error('Administrador não encontrado');

    const userId = adminRow[0].ID_Usuarios;

    await db.query('DELETE FROM Administradores WHERE id_administradores = ?', [id]);

    await db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [userId]);
  }

  static async comparePasswords(plainPassword, hashedPassword) {

    if(!plainPassword || !hashedPassword) {
      throw new Error('Senha e hash são necessárias para fazer a comparação');
    }
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default Administrator;