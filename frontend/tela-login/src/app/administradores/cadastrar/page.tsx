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
import React, { useState } from "react";
import InputMain from "@/components/InputMain/InputMain";

export default function AdminPage() {
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: ""
    });

    let inputs = [
        { label: "Nome", name: "nome", type: "text", key: 1, typeForm: "admin" },
        { label: "Email", name: "email", type: "email", key: 2, typeForm: "admin" },
        { label: "Senha", name: "senha", type: "password", key: 3, typeForm: "admin" },
        { label: "Confirmação da senha", name: "confirmaSenha", type: "password", key: 4, typeForm: "admin" }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    let options = ["","Nível 1", "Nível 2", "Nível 3", "Nível 4"];

    const imageExclamation = Exclamation;
    
    // Lógica para lidar com o envio do formulário
    // substitua essa função no AdminPage

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
                
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        // validações básicas
        if (
            !formData.get("nome") || 
            !formData.get("email") || 
            !formData.get("senha") || 
            !formData.get("confirmaSenha") || 
            !formData.get("nivelAcesso")
        ) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        if (formData.get("senha") !== formData.get("confirmaSenha")) {
            alert("As senhas não coincidem!");
            return;
        }

        const nome = formData.get("nome") as string;
        const email = formData.get("email") as string;
        const senha = formData.get("senha") as string;
        const nivelAcesso = formData.get("nivelAcesso") as string;

        // montar body para bater com o backend
        const body = {
            nome,
            email,
            senha,
            nivel_acesso: nivelAcesso,      // nome que o backend espera
            tipo_usuario: "Administrador",  // você pode depois trocar por um select
        };

        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admins/register`;
            console.log("POST URL:", url);
            console.log("Body enviado:", body);

            const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            });

            const text = await res.text();
            console.log("Status registro admin:", res.status);
            console.log("Resposta bruta:", text);

            if (!res.ok) {
            let errorBody: any = {};
            try {
                errorBody = JSON.parse(text);
            } catch {
                errorBody = {};
            }
            throw new Error(errorBody.error || "Erro ao cadastrar administrador");
            }

            const createdAdmin = JSON.parse(text);
            console.log("Administrador cadastrado:", createdAdmin);
            alert("Administrador cadastrado com sucesso!");

            router.push("/main");
            // se quiser, limpa o form:
            form.reset();
        } catch (err: any) {
            console.error(err);
            alert("Erro ao cadastrar administrador: " + err.message);
        }
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

                                    <InputMain input={{...input, value: formValues[input.name as keyof typeof formValues], onChange: handleInputChange, inputKey: input.key}} />

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