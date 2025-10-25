import db from '../../config/database.js'
import bcrypt from 'bcrypt';

class User {
    static async create({ nome, email, senha }) {
        if (!senha || typeof senha !== 'string') {
            throw new Error('Senha inválida');
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const [result] = await db.query(
            'INSERT INTO Usuarios (nome, email, senha_hash, criado_em) VALUES (?, ?, ?, NOW())',
            [nome, email, hashedPassword]
        );

        return this.findById(result.insertId);
    }

    static async findById(id) {
        const [rows] = await db.query(
            'SELECT id_usuarios, nome, email, criado_em FROM Usuarios WHERE id_usuarios = ?',
            [id]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM Usuarios WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async update(id, { nome, email }) {
        await db.query(
            'UPDATE Usuarios SET nome = ?, email = ?, WHERE id_usuarios = ?',
            [nome, email, id]
        );
        return this.findById(id);
    }

    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query(
            'UPDATE Usuarios SET senha_hash = ? WHERE id_usuarios = ?',
            [hashedPassword, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM Usuarios WHERE id_usuarios = ?', [id]);
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        if(!plainPassword || !hashedPassword) {
            throw new Error('Senha e hash são necessários');
        }
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default User;