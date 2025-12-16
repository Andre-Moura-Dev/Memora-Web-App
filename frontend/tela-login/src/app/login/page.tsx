"use client";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logoMemora.png";
import Image from "next/image";
import styles from "./login.module.css";
import Input from "@/components/Input/Input";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function Logar() {
    if (senha.length < 6) {
      alert("Sua senha precisa ter no mínimo 6 dígitos!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admins/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.trim().toLowerCase(),
            senha: senha, // ⚠️ backend espera "senha", não "password"
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("Erro no login:", err);
        alert(err.error || "Usuário ou senha inválidos!");
        return;
      }

      const data = await response.json();
      console.log("Resposta login:", data);

      // ⚠️ backend devolve { admin, token }
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // redireciona para o painel
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
          id="email"
          placeholder="Informe o seu email de usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="email"
        />
        <Input
          label="Senha:"
          id="senha"
          placeholder="Informe a sua senha de 6 dígitos"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
        />
        <Link href='' className={styles.forgotPassword}>
          Esqueceu a senha?
        </Link>
        <button className={styles.button} onClick={loginTest}>
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