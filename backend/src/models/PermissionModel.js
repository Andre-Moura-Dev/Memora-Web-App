import db from '../../config/database.js';

class Permission {
    static async create({ ID_Adminitradores, descricao, nivel_permissao }) {
        const [result] = await db.query(
            'INSERT INTO Permissoes (ID_Administradores, descricao, nivel_permissao) VALUES (?, ?, ?)',
            [ID_Adminitradores, descricao, nivel_permissao]
        );
        return this.findById(result.insertId);
    }

    static async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM Permissoes WHERE id_permissoes = ?',
            [id]
        );
        return rows[0];
    }

    static async findByAdminId(adminId) {
        const [rows] = await db.query(
            'SELECT * FROM Permissoes WHERE ID_Administradores = ?',
            [adminId]
        );
        return rows;
    }

    static async update(id, { descricao, nivel_permissao }) {
        await db.query(
            'UPDATE Permissoes SET descricao = ?, nivel_permissao = ? WHERE id_permissoes = ?',
            [descricao, nivel_permissao, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        await db.query('DELETE FROM Permissoes WHERE id_permissoes = ?', [id]);
    }
}

export default Permission;