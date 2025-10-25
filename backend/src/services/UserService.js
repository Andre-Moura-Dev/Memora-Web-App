import User from "../models/UsersModel.js";
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";

class UserService {
    static async registerUser({ nome, email, senha }) {
        if (!senha) throw new Error('Senha é obrigatória');
        
        const existingUser = await User.findByEmail(email);
        if(existingUser) throw new Error('Esse email já está sendo utilizado');

        return await User.create({ nome, email, senha });
    }

    static async loginUser(email, senha) {
        if (!email || !senha) throw new Error('Email e senha são obrigatórios');

        const user = await User.findByEmail(email);
        if(!user) throw new Error('Usuário não encontrado');

        const isMatch = await User.comparePasswords(senha, user.senha_hash);
        if (!isMatch) throw new Error('Credenciais inválidas');

        const token = jwt.sign(
            { id: user.id_usuarios, email: user.email },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        const { senha_hash: _, ...userData } = user;
        return { user: userData, token };
    }

    static async getUserById(id) {
        return await User.findById(id);
    }

    static async updateUser(id, updateData) {
        if (updateData.email) {
            const existingUser = await User.findByEmail(updateData.email);
            if (existingUser && existingUser.id_usuarios !== parseInt(id)) {
                throw new Error('Esse email já está sendo utilizado');
            }
        }
        return await User.update(id, updateData);
    }

    static async updateUserPassword(id, currentPassword, newPassword) {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuário não encontrado');

        const isMatch = await User.comparePasswords(currentPassword, user.senha_hash);
        if(!isMatch) throw new Error('Senha atual está incorreta');

        await User.updatePassword(id, newPassword);
    }

    static async deleteUser(id) {
        return await User.delete(id);
    }
}

export default UserService;