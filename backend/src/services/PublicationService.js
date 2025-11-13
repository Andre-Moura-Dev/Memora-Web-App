import Publication from "../models/PublicationModel.js";

class PublicationService {
    static async createPublication({ ID_Administradores, titulo, conteudo, categoria, status }) {
        // A validação está sendo feita na model, mas pode ser mantida aqui para regras de negócio antes de chegar à model
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

    static async getPublicationsByAdminId(adminId) {
        return await Publication.findByAdmin(adminId);
    }

    static async updatePublication(id, { titulo, conteudo, categoria, status }) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.update(id, { titulo, conteudo, categoria, status });
    }

    static async updatePublicationStats(id, { curtidas, comentarios }) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.updateStats(id, { curtidas, comentarios });
    }

    static async publishPublication(id) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.publish(id);
    }

    static async archivePublication(id) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.archive(id);
    }

    static async deletePublication(id) {
        const pub = await Publication.findById(id);
        if (!pub) throw new Error('Publicação não encontrada');

        return await Publication.delete(id);
    }
}

export default PublicationService;