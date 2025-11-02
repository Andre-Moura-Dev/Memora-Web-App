"use client";
import styles from "./administradores.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import Add from "../../../assets/add-square.png";
import Exclamation from "../../../assets/Exclamation.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Input from "@/components/Input/Input";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import React from "react";
import InputMain from "@/components/InputMain/InputMain";

export default function AdminPage() {

    let inputs = [
        { label: "Nome", name: "nome", type: "text", key: 1, typeForm: "admin" },
        { label: "Email", name: "email", type: "email", key: 2, typeForm: "admin" },
        { label: "Senha", name: "senha", type: "password", key: 3, typeForm: "admin" },
        { label: "Confirmação da senha", name: "confirmaSenha", type: "password", key: 4, typeForm: "admin" }
    ];

    let options = ["","Nível 1", "Nível 2", "Nível 3", "Nível 4"];

    const imageExclamation = Exclamation;
    
    // Lógica para lidar com o envio do formulário
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);

        if (
            !formData.get("nome") || 
            !formData.get("email") || 
            !formData.get("senha") || 
            !formData.get("confirmaSenha") || 
            !formData.get("nivelAcesso")) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        if (formData.get("senha") !== formData.get("confirmaSenha")) {
            alert("As senhas não coincidem!");
            return;
        }

        const user = {
            nome: formData.get("nome"),
            email: formData.get("email"),
            senha: formData.get("senha"),
            confirmaSenha: formData.get("confirmaSenha"),
            nivelAcesso: formData.get("nivelAcesso"),
        };

        console.log("Usuário cadastrado:", user);
        alert("Administrador cadastrado com sucesso!");
    }

    return (
        <>
            <div className={styles.container}>
                <Header />

                <div className={styles.main}>
                    <GreenLeftBar/>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Image src={Add} alt="Cadastrar Administrador" width="23" height="25"/>
                            <h2 className={styles.title}>Cadastrar Administrador</h2>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {inputs.map((input) => (
                                <React.Fragment key={input.key}>
                                    {/* <div className={styles.formItem}>
                                        <label className={styles.label}>{input.label}<span style={{ color: "red" }}>*</span></label>
                                        <input type={input.type} name={input.name} className={`${styles.input} ${input.key === 3 || input.key === 4 ? styles.changeWidth : ''}`} />
                                    </div> */}

                                    <InputMain input={input} />

                                    {input.key === 3 && (
                                        <div className={styles.textsPasswords}>
                                            <div className={styles.exclamationIcon}>
                                                <Image src={imageExclamation} alt="Exclamação" width="11" height="11"/>
                                                <p className={styles.textPassword}>A senha deve ter pelo menos 8 caracteres</p>
                                            </div>
                                            <p className={styles.textPassword}><b>Dicas de segurança:</b></p>
                                            <p className={styles.textPassword}>Não use seu nome, sobrenome ou e-mail</p>
                                            <p className={styles.textPassword}>Não use caracteres iguais em sequência</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}

                            <div className={styles.formItem}>
                                <label className={styles.label}>Nível de Acesso<span style={{ color: "red" }}>*</span></label>
                                <select name="nivelAcesso" className={`${styles.input} ${styles.changeWidth}`}>
                                    <option defaultValue={""}>Selecione o nível de acesso</option>
                                    {options.slice(1).map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <Button label="Cadastrar" variant="primary" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}