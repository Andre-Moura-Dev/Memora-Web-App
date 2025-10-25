"use client";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logoMemora.png";
import Image from "next/image";
import styles from "./login.module.css";
import Input from "@/components/Input/Input";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function Logar() {
    if (senha.length < 8) {
      alert("Sua senha precisa ter no mínimo 8 dígitos!");
      return router.push("/login");
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user,
                password: senha,
            }),
        });

        if (!response.ok) {
            alert("Usuário ou senha inválidos!");
            return;
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/main");
        
    } catch (error) {
        console.error("Erro ao fazer login: ", error);
        alert("Erro ao conectar com o servidor. Tente novamente.");
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <Input
          label="Email:"
          id="usuario"
          placeholder="Informe o seu nome de usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="text"
        />
        <Input
          label="Senha:"
          id="senha"
          placeholder="Informe a sua senha de 8 dígitos"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
        />
        <Link href="./main" className={styles.forgotPassword}>
          Esqueceu a senha?
        </Link>
        <button className={styles.button} onClick={Logar}>
          Logar
        </button>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" width={250} height={100} />
        </div>
      </div>
    </div>
  );
}