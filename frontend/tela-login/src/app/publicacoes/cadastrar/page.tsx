"use client";
import styles from "./publicacoes.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import Add from "../../../assets/add-square.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicationPage() {
  const [titulo, setTitulo] = useState<string>("");
  const [data_publicacao, setDataPublicacao] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [status, setStatus] = useState<string>("Rascunho");

  const InputTitle = {
    label: "Título:",
    name: "titulo",
    type: "text",
    key: 1,
    typeForm: "publication",
  };

  const InputDate = {
    label: "Data de Publicação:",
    name: "data_publicacao",
    type: "date",
    key: 3,
    typeForm: "publication",
  };

  const categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];

  const options = [
    "Adicionar Cabeçalho",
    "Adicionar Subtítulo",
    "Adicionar Texto",
    "Adicionar Link",
    "Adicionar Imagem",
  ];

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Estado atual:", { titulo, categoria, data_publicacao, status });

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const contentContainer = document.querySelector(
      '[data-name="content"]'
    ) as HTMLDivElement | null;
    const conteudo = contentContainer?.innerHTML.trim() || "";
    formData.append("conteudo", conteudo);

    // Verifica campos obrigatórios
    if (!titulo.trim() || !categoria.trim() || !data_publicacao.trim() || !conteudo.trim() || !status.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const storedAdmin = localStorage.getItem("admin");
    const admin = storedAdmin ? JSON.parse(storedAdmin) : null;
    const ID_Administradores = admin?.id_administradores || 1;

    const body = {
      ID_Administradores,
      titulo,
      categoria,
      conteudo,
      status,
      data_publicacao: data_publicacao,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiUrl}/api/publications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        const errorBody = text ? JSON.parse(text) : {};
        alert("Erro ao criar publicação: " + (errorBody.error || errorBody.msg || "Desconhecido"));
        return;
      }

      alert("Publicação adicionada com sucesso!");
      router.push("/main");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar publicação: " + err.message);
    }
  }

  function handleOption(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const option = event.currentTarget;
    const contentContainer = document.querySelector(
      '[data-name="content"]'
    ) as HTMLDivElement | null;
    const optionsEls = document.querySelectorAll(`.${styles.AddButton}`);
    optionsEls.forEach((opt) => opt.classList.remove(styles.AddButtonSelected));
    option.classList.add(styles.AddButtonSelected);

    if (!contentContainer) return;

    switch (option.textContent) {
      case "Adicionar Cabeçalho": {
        const h2 = document.createElement("h2");
        h2.contentEditable = "true";
        h2.className = styles.contentHeader;
        h2.textContent = "Novo Cabeçalho";
        contentContainer.appendChild(h2);
        break;
      }
      case "Adicionar Subtítulo": {
        const h3 = document.createElement("h3");
        h3.contentEditable = "true";
        h3.className = styles.contentSubheader;
        h3.textContent = "Novo Subtítulo";
        contentContainer.appendChild(h3);
        break;
      }
      case "Adicionar Texto": {
        const p = document.createElement("p");
        p.contentEditable = "true";
        p.className = styles.contentText;
        p.textContent = "Digite seu texto aqui...";
        contentContainer.appendChild(p);
        break;
      }
      case "Adicionar Link": {
        const a = document.createElement("a");
        a.contentEditable = "true";
        a.className = styles.contentLink;
        a.textContent = "Digite seu link aqui...";
        a.href = "#";
        contentContainer.appendChild(a);
        break;
      }
      case "Adicionar Imagem": {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file || !contentContainer) return;

          const formDataImg = new FormData();
          formDataImg.append("image", file);
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${apiUrl}/api/uploads/image`, {
              method: "POST",
              body: formDataImg,
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            const img = document.createElement("img");
            img.src = `${apiUrl}${data.url}`;
            img.className = styles.contentImage;
            contentContainer.appendChild(img);
          } catch (err) {
            console.error(err);
            alert("Erro ao enviar imagem");
          }
        };
        break;
      }
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <GreenLeftBar />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.pageTitleWrapper}>
              <Image src={Add} alt="Nova Publicação" width={24} height={24} />
              <div>
                <h2 className={styles.pageTitle}>Nova publicação</h2>
                <p className={styles.pageSubtitle}>
                  Cadastre notícias, comunicados e eventos que aparecerão no portal público.
                </p>
              </div>
            </div>
            <span className={styles.pageBadge}>Área administrativa</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h3>Informações da publicação</h3>
              <p>Preencha os campos abaixo para criar uma nova publicação.</p>
            </div>

            <div className={styles.formBody}>
              <InputMain input={{ ...InputTitle, value: titulo, onChange: (e) => setTitulo(e.target.value) }} />

              <div className={styles.formRow}>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    Categoria:<span className={styles.required}>*</span>
                  </label>
                  <select
                    name="categoria"
                    className={styles.input}
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "" ? "Selecione a categoria" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <InputMain input={{ ...InputDate, value: data_publicacao, onChange: (e) => setDataPublicacao(e.target.value) }} />
              </div>

              <div className={styles.formItem}>
                <label className={styles.label}>Conteúdo:</label>
                <div className={styles.textAreaContainer} data-name="content-container">
                  <div className={styles.optionsContainer}>
                    {options.map((option) => (
                      <div key={option} className={styles.AddButton} onClick={handleOption}>
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className={styles.textArea} data-name="content" contentEditable={true}></div>
                </div>
              </div>

              <div className={styles.formItem}>
                <label className={styles.label}>Status:</label>
                <select
                  className={`${styles.input} ${styles.statusSelect}`}
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Rascunho">Rascunho</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>
            </div>

            <div className={styles.formFooter}>
              <span className={styles.helperText}>
                Os campos marcados com <span className={styles.required}>*</span> são obrigatórios.
              </span>
              <Button label="Adicionar publicação" variant="primary" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
