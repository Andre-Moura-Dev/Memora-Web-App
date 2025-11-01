"use client";
import styles from "./editarAdministradores.module.css";
import Header from "../../../../components/Header/header";
import Image from "next/image";
import Edit from "../../../../assets/edit.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Button from "@/components/Button/Button";
import React, { useState } from "react";
import InputMain from "@/components/InputMain/InputMain";

export default function EditPage() {

    const [adminData, setAdminData] = useState({
        nome: "João Silva",
        email: "joao.silva@example.com",
        senha: "",
        confirmaSenha: "",
        nivelAcesso: "Nível 1"
    });

    const inputs = [
        { label: "Nome", name: "nome", type: "text", key: 1, value: adminData.nome },
        { label: "Email", name: "email", type: "email", key: 2, value: adminData.email },
        { label: "Nova Senha", name: "senha", type: "password", key: 3, value: adminData.senha },
        { label: "Confirmação da Senha", name: "confirmaSenha", type: "password", key: 4, value: adminData.confirmaSenha }
    ];

    const options = ["", "Nível 1", "Nível 2", "Nível 3", "Nível 4"];
    const editImage = Edit;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setAdminData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!adminData.nome || !adminData.email || !adminData.senha || !adminData.confirmaSenha || !adminData.nivelAcesso) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        if (adminData.senha && adminData.senha !== adminData.confirmaSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        console.log("Administrador Atualizado:", adminData);
        alert();
    }

    return (
        <>
            <div className={styles.container}>
                <Header/>

                <div className={styles.main}>
                    <GreenLeftBar/>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Image src={Edit} alt="Editar Administrador" width="19" height="19" />
                            <h2 className={styles.title}>Editar Administrador</h2>
                        </div>

                        <form className={styles.form}>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}