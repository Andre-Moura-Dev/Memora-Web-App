import db from '../../config/database.js';

class Publication {
  // 👉 Cria uma nova publicação
  static async create({ ID_Administradores, titulo, conteudo, categoria, status }) {
    if (!ID_Administradores || !titulo || !conteudo || !categoria) {
      throw new Error('Campos obrigatórios: ID_Administradores, titulo, conteudo, categoria');
    }

    // Verifica se o administrador existe
    const [adminExists] = await db.query(
      `SELECT id_administradores FROM Administradores WHERE id_administradores = ?`,
      [ID_Administradores]
    );

    if (adminExists.length === 0) {
      throw new Error('Administrador não encontrado');
    }

    const [result] = await db.query(
      `INSERT INTO Publicacoes (ID_Administradores, titulo, conteudo, categoria, curtidas, comentarios, status)
       VALUES (?, ?, ?, ?, 0, 0, ?)`,
      [ID_Administradores, titulo, conteudo, categoria, status || 'Rascunho']
    );

    return this.findById(result.insertId);
  }

  // 👉 Busca publicação por ID
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT p.id_publicacoes, p.titulo, p.conteudo, p.categoria, 
              p.data_publicacao, p.data_atualizacao, p.curtidas, p.comentarios, p.status,
              a.id_administradores, a.nome AS autor_nome, a.email AS autor_email
       FROM Publicacoes p
       JOIN Administradores a ON p.ID_Administradores = a.id_administradores
       WHERE p.id_publicacoes = ?`,
      [id]
    );
    return rows[0] || null;
  }

  // 👉 Lista todas as publicações
  // 👉 Lista todas as publicações (para painel admin)
  static async findAll() {
    const [rows] = await db.query(
      `SELECT 
          p.id_publicacoes, 
          p.titulo, 
          p.conteudo,            -- AGORA VAI JUNTO
          p.categoria, 
          p.data_publicacao,
          p.status, 
          p.curtidas, 
          p.comentarios, 
          a.nome AS autor_nome
      FROM Publicacoes p
      JOIN Administradores a ON p.ID_Administradores = a.id_administradores
      ORDER BY p.data_publicacao DESC`
    );
    return rows;
  }

  // 👉 Lista publicações públicas (somente "Publicado")
  static async findAllPublic() {
    const [rows] = await db.query(
      `SELECT 
          p.id_publicacoes,
          p.titulo,
          p.conteudo,
          p.categoria,
          p.data_publicacao,
          p.status,
          a.nome AS autor_nome
      FROM Publicacoes p
      JOIN Administradores a ON p.ID_Administradores = a.id_administradores
      WHERE p.status = 'Publicado'
      ORDER BY p.data_publicacao DESC`
    );
    return rows;
  }


  // 👉 Lista todas as publicações de um administrador específico
  static async findByAdmin(adminId) {
    const [rows] = await db.query(
      `SELECT id_publicacoes, titulo, categoria, status, data_publicacao, curtidas, comentarios
       FROM Publicacoes
       WHERE ID_Administradores = ?
       ORDER BY data_publicacao DESC`,
      [adminId]
    );
    return rows;
  }

  // 👉 Atualiza uma publicação
  static async update(id, { titulo, conteudo, categoria, status }) {
    const [result] = await db.query(
      `UPDATE Publicacoes
       SET titulo = ?, conteudo = ?, categoria = ?, status = ?, data_atualizacao = CURRENT_TIMESTAMP
       WHERE id_publicacoes = ?`,
      [titulo, conteudo, categoria, status, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Publicação não encontrada');
    }

    return this.findById(id);
  }

  // 👉 Atualiza curtidas e comentários (por exemplo, quando o usuário interage)
  static async updateStats(id, { curtidas, comentarios }) {
    const [result] = await db.query(
      `UPDATE Publicacoes
       SET curtidas = ?, comentarios = ?, data_atualizacao = CURRENT_TIMESTAMP
       WHERE id_publicacoes = ?`,
      [curtidas, comentarios, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Publicação não encontrada');
    }

    return this.findById(id);
  }

  // 👉 Deleta uma publicação
  static async delete(id) {
    const [result] = await db.query(
      `DELETE FROM Publicacoes WHERE id_publicacoes = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Publicação não encontrada');
    }
  }

  // 👉 Publica (muda status para "Publicado")
  static async publish(id) {
    const [result] = await db.query(
      `UPDATE Publicacoes
       SET status = 'Publicado', data_atualizacao = CURRENT_TIMESTAMP
       WHERE id_publicacoes = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Publicação não encontrada');
    }

    return this.findById(id);
  }

  // 👉 Arquiva uma publicação
  static async archive(id) {
    const [result] = await db.query(
      `UPDATE Publicacoes
       SET status = 'Arquivado', data_atualizacao = CURRENT_TIMESTAMP
       WHERE id_publicacoes = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Publicação não encontrada');
    }

    return this.findById(id);
  }
}

export default Publication;