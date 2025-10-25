import db from '../../config/database.js';

class Publication {
    static async create({
        ID_Administradores,
        titulo,
        conteudo,
        categoria,
        status,
    }) {
        const now = new Date();
        const [result] = await db.query(
            `INSERT INTO Publicacoes
            (ID_Administradores, titulo, conteudo, categoria, data_publicacao, data_atualizacao, curtidas, comentario, status)
            VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?)`,
            [ID_Administradores, titulo, conteudo, categoria, now, now, status]
        );
        return this.findById(result.insertId);
    }

    static async findById(id) {
        const [rows] = await db.query(
            `SELECT p.*, a.nivel_acesso, u.nome AS autor
             FROM Publicacoes p
             JOIN Administradores a ON p.ID_Administradores = a.id_administradores
             JOIN Usuarios u ON a.ID_Usuarios = u.id_usuarios
             WHERE p.id_publicacoes = ?`,
            [id]
        );
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query(
            `SELECT p.*, a.nivel_acesso, u.nome AS autor
             FROM Publicacoes p
             JOIN Administradores a ON p.ID_Administradores = a.id_administradores
             JOIN Usuarios u ON a.ID_Usuarios = u.id_usuario
             ORDER BY p.data_publicacao DESC`
        );
        return rows;
    }

    static async update(id, { titulo, conteudo, categoria, status }) {
        await db.query(
            `UPDATE Publicacoes
             SET titulo = ?, conteudo = ?, categoria = ?, status = ?, data_atualizacao = NOW()
             WHERE id_publicacoes = ?`,
            [titulo, conteudo, categ]
        );
        return this.findById(id);
    }

    static async updateLikesAndComments(id, { curtidas, comentarios }) {
        await db.query(
            `UPDATE Publicacoes
             SET curtidas = ?, comentarios = ?
             WHERE id_publicacoes = ?`,
            [curtidas, comentarios, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        await db.query('DELETE FROM Publicacoes WHERE id_publicacoes = ?', [id]);
    }
}

export default Publication;