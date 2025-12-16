// src/app/publicacoes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logoMemora.png";
import styles from "./publication.module.css";


type Publication = {
  id_publicacoes: number;
  titulo: string;
  conteudo: string | null;
  categoria: string;
  status: string;
  data_publicacao: string;
  autor_nome?: string;
};

export default function PublicationDetailPage() {
  const params = useParams<{ id: string }>();
  const [pub, setPub] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublication() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(
          `${apiUrl}/api/public/publications/${params.id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          console.error("Erro ao buscar publicação:", await res.text());
          setPub(null);
          return;
        }

        const data: Publication = await res.json();
        setPub(data);
      } catch (err) {
        console.error("Erro ao conectar com servidor:", err);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      fetchPublication();
    }
  }, [params]);

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Carregando publicação...</p>
      </div>
    );
  }

  if (!pub) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.error}>Publicação não encontrada.</p>
          <Link href="/index" className={styles.backLink}>
            ← Voltar para o portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/index" className={styles.logoLink}>
            <Image src={Logo} alt="Memora" width={150} height={60} />
          </Link>
          <Link href="/login" className={styles.loginButtonOutline}>
            Login administrador
          </Link>
        </div>
      </header>
      

      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.metaRow}>
            <span className={styles.category}>{pub.categoria}</span>
            <span className={styles.date}>
              {new Date(pub.data_publicacao).toLocaleDateString("pt-BR")}
            </span>
            {pub.autor_nome && (
              <span className={styles.author}>por {pub.autor_nome}</span>
            )}
          </div>

          <h1 className={styles.title}>{pub.titulo}</h1>

          <div
            className={styles.content}
            // mostramos o HTML exatamente como foi salvo (com <img>, <h2>, <p> etc.)
            dangerouslySetInnerHTML={{ __html: pub.conteudo || "" }}
          />

          <div className={styles.backArea}>
            <Link href="/index" className={styles.backLink}>
              ← Voltar para o portal
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
