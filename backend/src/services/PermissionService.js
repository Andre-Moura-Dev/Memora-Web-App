import Permission from "../models/PermissionModel.js";

class PermissionService {
    static async createPermission({ ID_Administradores, descricao, nivel_permissao }) {
        return await Permission.create({ ID_Administradores, descricao, nivel_permissao });
    }

    static async getPermissionById(id) {
        const permission = await Permission.findById(id);
        if (!permission) throw new Error('Permissão não econtrada');
        return permission;
    }

    static async getPermissionByAdminId(adminId) {
        return await Permission.findByAdminId(adminId);
    }

    static async updatePermission(id, updateData) {
        const permission = await Permission.findById(id);
        if (!permission) throw new Error('Permissão não encontrada');

        return await Permission.update(id, updateData);
    }

    static async deletePermission(id) {
        return await Permission.delete(id);
    }
}

export default PermissionService;