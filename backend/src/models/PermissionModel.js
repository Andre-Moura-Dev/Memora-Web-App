import db from "../../config/database.js";

class Permission {
    static async create({ ID_Administradores, descricao, nivel_permissao }) {
        if (!ID_Administradores || !descricao || !nivel_permissao) {
            throw new Error('Por favor, preencha todos os campos obrigatórios');
        }

        const [existingAdmin] = await db.query(
            `SELECT id_administradores FROM Administradores WHERE id_administardores = ?`,
            [ID_Administradores]
        );

        if (existingAdmin.length === 0) {
            throw new Error('Administrador não encontrado!');
        }

        const [result] = await db.query(
            `INSERT INTO Permissoes (ID_Administradores, descricao, nivel_permissao)
             VALUES (?, ?, ?)`
            [ID_Administradores, descricao, nivel_permissao]
        );

        return this.findById(result.insertId);
    }

    static async findById(id) {
        const [rows] = await db.query(
            `SELECT p.id_permissoes, p.descricao, p.nivel_permissao,
                    a.id_administradores, a.nome, a.email, a.nivel_acesso
             FROM Permissoes p
             JOIN Administradores a ON p.ID_Administradores = a.id_administradores
             WHERE p.id_permissoes = ?`,
            [id]
        );
        return rows[0] || null;
    }

    static async findAll() {
        const [rows] = await db.query(
            `SELECT p.id_permissoes, p.descricao, p.nivel_permissao,
                    a.id_administradores, a.nome AS administrador_nome
             FROM Permissoes p
             JOIN Administradores a ON p.ID_Administradores = a.id_administradores`
        );
        return rows;
    }

    static async findByAdmin(adminId) {
        const [rows] = await db.query(
            `SELECT id_permissoes, descricao, nivel_permissao
             FROM Permissoes
             WHERE ID_Administradores = ?`,
            [adminId]
        );
        return rows;
    }

    static async update(id, { descricao, nivel_permissao }) {
        const [result] = await db.query(
            `UPDATE Permissoes
             SET descricao = ?, nivel_permissao = ?
             WHERE id_permissoes = ?`,
            [descricao, nivel_permissao, id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Permissão não encontrada');
        }

        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await db.query(
            `DELETE FROM Permissoes WHERE id_permissoes = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Permissões não encontrada');
        }
    }
}

export default Permission;