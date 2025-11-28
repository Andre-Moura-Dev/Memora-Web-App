"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/header";
import styles from "./main.module.css";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Menu from "@/components/Menu/Menu";
import List from "@/components/List/List";
import NavBar from "@/components/NavBar/NavBar";

// TIPAGENS básicas do que vem da API
type Admin = {
  id_administradores: number;
  nome: string;
  email: string;
  nivel_acesso?: string;
};

type Permission = {
  id_permissoes: number;
  descricao: string;
  nivel_permissao: string;
};

type Publication = {
  id_publicacoes: number;
  titulo: string;
  categoria: string;
  status: string;
};

// tipo genérico que o <List /> consome
type ListItem = {
  id: number;
  title: string;
};

export default function Home() {
  const [newPage, setNewPage] = useState<"administradores" | "permissoes" | "publicacoes">("administradores");

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  const [loading, setLoading] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Carrega os dados sempre que muda a aba
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("Token não encontrado no localStorage");
        }

        const commonOptions: RequestInit = {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "x-auth-token": token } : {}),
          },
        };

        if (newPage === "administradores") {
          const res = await fetch(`${apiBase}/api/admins`, commonOptions);
          if (!res.ok) {
            console.error("Erro ao buscar administradores:", await res.text());
          } else {
            const data: Admin[] = await res.json();
            setAdmins(data);
          }
        }

        if (newPage === "permissoes") {
          const res = await fetch(`${apiBase}/api/permissions`, commonOptions);
          if (!res.ok) {
            console.error("Erro ao buscar permissões:", await res.text());
          } else {
            const data: Permission[] = await res.json();
            setPermissions(data);
          }
        }

        if (newPage === "publicacoes") {
          const res = await fetch(`${apiBase}/api/publications`, commonOptions);
          if (!res.ok) {
            console.error("Erro ao buscar publicações:", await res.text());
          } else {
            const data: Publication[] = await res.json();
            setPublications(data);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [newPage, apiBase]);

  // monta a lista que o <List /> precisa com base na aba atual
  let items: ListItem[] = [];
  let page: "administradores" | "permissoes" | "publicacoes" = newPage;
  let icon: "Avatar" | "Shield" | "Icon" = "Avatar";

  if (newPage === "administradores") {
    items = admins.map((adm) => ({
      id: adm.id_administradores,
      title: adm.nome,
    }));
    icon = "Avatar";
  } else if (newPage === "permissoes") {
    items = permissions.map((perm) => ({
      id: perm.id_permissoes,
      title: perm.descricao,
    }));
    icon = "Shield";
  } else if (newPage === "publicacoes") {
    items = publications.map((pub) => ({
      id: pub.id_publicacoes,
      title: pub.titulo,
    }));
    icon = "Icon";
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.main}>
        <GreenLeftBar />

        <div className={styles.content}>
          {/* NavBar continua controlando qual aba está ativa */}
          <NavBar page={setNewPage} icon={() => {}} pageTest={newPage} />

          <Menu page={newPage} />

          <ul className={styles.data}>
            {loading && <li>Carregando...</li>}

            {!loading && items.length === 0 && (
              <li>Nenhum registro encontrado.</li>
            )}

            {!loading &&
              items.map((item) => (
                <List
                  key={item.id}
                  icon={icon}
                  name={item.title}
                  id={item.id}
                  page={page}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
