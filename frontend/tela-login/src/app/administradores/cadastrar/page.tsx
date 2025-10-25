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

export default function AdminPage() {

    let inputs = [
        { label: "Nome", name: "nome", type: "text", key: 1 },
        { label: "Email", name: "email", type: "email", key: 2 },
        { label: "Senha", name: "senha", type: "password", key: 3 },
        { label: "Confirmação da senha", name: "confirmaSenha", type: "password", key: 4 }
    ];

    let options = ["","Administrador", "Editor", "Visualizador"];

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

                        <form className={styles.form}>
                            {inputs.map((input) => (
                                <>
                                    <div className={styles.formItem} key={input.key}>
                                        <label className={styles.label}>{input.label}<span style={{ color: "red" }}>*</span></label>
                                        <input type={input.type} name={input.name} className={`${styles.input} ${input.key === 3 || input.key === 4 ? styles.changeWidth : ''}`} />
                                    </div>
                                    
                                    {input.key === 3 && (
                                        <div className={styles.textsPasswords} key={input.key}>
                                            <div className={styles.exclamationIcon}>
                                                <Image src={Exclamation} alt="Exclamação" width="11" height="11"/>
                                                <p className={styles.textPassword}>A senha deve ter pelo menos 8 caracteres</p>
                                            </div>
                                            <p className={styles.textPassword}><b>Dicas de segurança:</b></p>
                                            <p className={styles.textPassword}>Não use seu nome, sobrenome ou e-mail</p>
                                            <p className={styles.textPassword}>Não use caracteres iguais em sequência</p>
                                        </div>
                                    )}
                                </>
                            ))}

                            <div className={styles.formItem}>
                                <label className={styles.label}>Nível de Acesso<span style={{ color: "red" }}>*</span></label>
                                <select name="nivelAcesso" className={`${styles.input} ${styles.changeWidth}`}>
                                    {options.map((option) => (
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