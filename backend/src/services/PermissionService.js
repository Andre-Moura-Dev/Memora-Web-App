import Permission from "../models/PermissionModel.js";

class PermissionService {
    static async createPermission({ ID_Administradores, descricao, nivel_permissao }) {
        return await Permission.create({ ID_Administradores, descricao, nivel_permissao });
    }

    static async getPermissionById(id) {
        const permission = await Permission.findById(id);
        if (!permission) throw new Error('Permissão não encontrada');
        return permission;
    }

    static async getAllPermissions() {
        return await Permission.findAll();
    }

    static async getPermissionsByAdminId(adminId) {
        return await Permission.findByAdmin(adminId);
    }

    static async updatePermission(id, { descricao, nivel_permissao }) {
        const permission = await Permission.findById(id);
        if (!permission) throw new Error('Permissão não encontrada');

        return await Permission.update(id, { descricao, nivel_permissao });
    }

    static async deletePermission(id) {
        // O método delete pode retornar algo ou lançar erro se não encontrar
        return await Permission.delete(id);
    }
}

export default PermissionService;