import Publication from "../models/PublicationModel.js";

class PublicationService {
    static async createPublication({ ID_Administradores, titulo, conteudo, categoria, status }) {
        if (!titulo || !conteudo) {
            throw new Error('Título e conteúdo são obrigatórios');
        }
        return await Publication.create({ ID_Administradores, titulo, conteudo, categoria, status });
    }

    static async getPublicationById(id) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');
        return pub;
    }

    static async getAllPublications() {
        return await Publication.findAll();
    }

    static async updatePublication(id, updateData) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.update(id, updateData);
    }

    static async updateLikesAndComments(id, curtidas, comentarios) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.updateLikesAndComments(id, { curtidas, comentarios });
    }

    static async deletePublication(id) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.delete(id);
    }
}

export default PublicationService;