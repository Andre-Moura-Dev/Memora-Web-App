"use client";
import React, { useEffect, useState } from "react";
import styles from "./editarPublicacoes.module.css";
import Header from "../../../../components/Header/header";
import Image from "next/image";
import Edit from "../../../../assets/edit.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface publicationProps {
  id: number;
  id_admin?: number;
  titulo: string;
  conteudo: string;
  categoria: string;
  data_atualizacao?: Date | string;
  data_publicacao: Date | string;
  curtidas?: number;
  comentarios?: number;
  status: string;
}

export default function EditPublicationPage(publicationType: publicationProps) {
  const { id } = useParams();

  const [publication, setPublication] = useState<publicationProps>({
    id: 0,
    titulo: "",
    conteudo: "",
    categoria: "",
    data_publicacao: "",
    status: "Rascunho",
  });

  let InputTitle = {
    label: "Título:",
    name: "titulo",
    value: publication?.titulo,
    type: "text",
    key: 1,
    typeForm: "publication",
  };
  // const InputStatus = { label: "Status", name: "status", type: "text", key: 4, typeForm: "publication" };
  // const InputContent = { label: "Conteúdo:", name: "content", type: "textarea", key: 1, typeForm: "publication" };
  // const InputCategory = { label: "Categoria", name: "categoria", type: "text", key: 3, typeForm: "publication" };
  let InputDate = {
    label: "Data de Publicação:",
    name: "dataPublicacao",
    value: publication?.data_publicacao,
    type: "text",
    key: 3,
    typeForm: "publication",
  };

  let cat = ["", "Notícias", "Eventos", "Comunicados", "Outros"];

  const options = [
    "Adicionar Cabeçalho",
    "Adicionar Subtítulo",
    "Adicionar Texto",
    "Adicionar Link",
    "Adicionar Imagem",
  ];

  // function getPublication() {
  //     // Simulação de uma chamada à API para obter os dados da publicação
  //     const fetchedPublication: publicationProps = {
  //         id: 1,
  //         titulo: "Avanço da IA no Brasil",
  //         conteudo: `<h2 contenteditable="true" class="undefined">Texto</h2><h3 contenteditable="true" class="undefined">textinho</h3>`,
  //         categoria: "Notícias",
  //         data_publicacao: "09-11-2025",
  //         status: "Publicado",
  //     };
  //     setPublication(fetchedPublication);
  //     console.log(fetchedPublication.data_publicacao);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublication({
      ...publication,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const contentContainer = document.querySelector('[data-name="content"]');

    let content: string = "";

    content = contentContainer?.innerHTML || "";

    // contentContainer?.childNodes.forEach((child) => {

    //     const text = child.textContent;
    //     if (text && !text.includes('Adicionar')) {
    //         content.push(text);
    //         // console.log(child.firstChild);
    //     }

    // });

    formData.append("conteudo", content);

    console.log(content);
    console.log("Dados da publicação:", Object.fromEntries(formData));

    if (
      !formData.get("titulo") ||
      !formData.get("categoria") ||
      !formData.get("data_publicacao") ||
      !formData.get("conteudo") ||
      !formData.get("status")
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const storedAdmin = localStorage.getItem("admin");
      const admin = storedAdmin ? JSON.parse(storedAdmin) : null;

      const body = {
        titulo: publication.titulo,
        categoria: publication.categoria,
        conteudo: content,
        status: publication.status,
        data_publicacao: publication.data_publicacao,
        ID_Administradores: admin?.id_administradores || 1,
      };

      console.log("API: ", body);

      const res = await fetch(`${apiUrl}/api/publications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("ERRO API:", errorText);
        alert(`Erro ao atualizar publicação: ${res.status} - ${errorText}`);
        return;
      }

      const data = await res.json();
      console.log("MESAGEM API:", data);

      alert("Publicação atualizada com sucesso!");
      router.push("/main");
    } catch (err: any) {
      console.error("Erro na requisição:", err);
      alert("Erro ao atualizar publicação:" + err.message);
    }
  }

  function handleOption(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const option = event.currentTarget;
    const contentContainer = document.querySelector('[data-name="content"]');
    const options = document.querySelectorAll(`.${styles.AddButton}`);

    options.forEach((opt) => {
      opt.classList.remove(styles.AddButtonSelected);
    });

    option.classList.add(styles.AddButtonSelected);

    if (!contentContainer) return;

    switch (option.textContent) {
      case "Adicionar Cabeçalho":
        const header = document.createElement("h2");
        header.contentEditable = "true";
        header.className = styles.contentHeader;
        header.textContent = "Novo Cabeçalho";
        contentContainer.appendChild(header);
        break;

      case "Adicionar Subtítulo":
        const subheader = document.createElement("h3");
        subheader.contentEditable = "true";
        subheader.className = styles.contentSubheader;
        subheader.textContent = "Novo Subtítulo";
        contentContainer.appendChild(subheader);
        break;

      case "Adicionar Texto":
        const paragraph = document.createElement("p");
        paragraph.contentEditable = "true";
        paragraph.className = styles.contentText;
        paragraph.textContent = "Digite seu texto aqui...";
        contentContainer.appendChild(paragraph);
        break;

      case "Adicionar Link":
        const link = document.createElement("a");
        link.contentEditable = "true";
        link.className = styles.contentLink;
        link.textContent = "Digite seu link aqui...";
        link.href = "#";
        contentContainer.appendChild(link);
        break;

      case "Adicionar Imagem":
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.accept = "image/*";
        imageInput.click();
        imageInput.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.className = styles.contentImage;
            contentContainer.appendChild(img);
          }
        };
        break;
    }
  }

  // Carregar os dados da publicação ao montar o componente
  useEffect(() => {
    if (!id) return;

    async function fetchPublication() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/publications/${id}`);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        console.log("Dados recebidos da API:", data);
        // console.log("Valor de data.categoria:", data.categoria);
        // console.log("Tipo de data.categoria:", typeof data.categoria);

        // Formatar data para YYYY-MM-DD
        let formattedDate = "";
        if (data.data_publicacao) {
          const d = new Date(data.data_publicacao);
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const year = d.getFullYear();
          formattedDate = `${year}-${month}-${day}`;
        }

        // Normalizar categoria
        const categories = ["Notícias", "Eventos", "Comunicados", "Outros"];

        const rawCategoria = data.categoria?.trim();

        // let normalizedCategory = validCategories.find(cat => cat.toLowerCase() === rawCategoria?.toLowerCase()) || "";

        const normalizedCategory = categories.includes(rawCategoria)
          ? rawCategoria
          : "";

        setPublication({
          id: data.id,
          titulo: data.titulo || "",
          conteudo: data.conteudo || "",
          categoria: data.categoria || "",
          data_publicacao: formattedDate,
          status: data.status || "Rascunho",
        });
        console.log(publication);
      } catch (err) {
        console.error("Erro ao carregar publicação:", err);
      }
    }

    fetchPublication();
  }, [id]);

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.main}>
          <GreenLeftBar />

          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <div className={styles.pageTitleWrapper}>
                <Image
                  src={Edit}
                  alt="Editar Publicação"
                  width={24}
                  height={24}
                />
                <div>
                  <h2 className={styles.pageTitle}>Editar publicação</h2>
                  <p className={styles.pageSubtitle}>
                    Atualize notícias, comunicados ou eventos existentes.
                  </p>
                </div>
              </div>
              <span className={styles.pageBadge}>Área administrativa</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h3>Informações da publicação</h3>
                <p>Preencha os campos abaixo para atualizar a publicação.</p>
              </div>

              <div className={styles.formBody}>
                {/* Título */}
                <div className={styles.formItem}>
                  <InputMain
                    input={{
                      label: "Título:",
                      name: "titulo",
                      type: "text",
                      value: publication.titulo,
                      onChange: (e) =>
                        setPublication({
                          ...publication,
                          titulo: e.target.value,
                        }),
                      typeForm: "publication",
                      inputKey: 1,
                    }}
                  />
                </div>

                {/* Categoria e Data */}
                <div className={styles.formRow}>
                  <div className={styles.formItem}>
                    <label className={styles.label}>
                      Categoria:<span className={styles.required}>*</span>
                    </label>
                    <select
                      name="categoria"
                      className={styles.input}
                      value={publication.categoria}
                      onChange={(e) =>
                        setPublication({
                          ...publication,
                          categoria: e.target.value,
                        })
                      }
                    >
                      <option value="">Selecione a categoria</option>
                      {cat.slice(1).map((categorie) => (
                        <option key={categorie} value={categorie}>
                          {categorie}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formItem}>
                    <InputMain
                      input={{
                        label: "Data de Publicação:",
                        name: "data_publicacao",
                        type: "date",
                        value: publication.data_publicacao,
                        onChange: (e) =>
                          setPublication({
                            ...publication,
                            data_publicacao: e.target.value,
                          }),
                        typeForm: "publication",
                        inputKey: 2,
                      }}
                    />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className={styles.formItem}>
                  <label className={styles.label}>Conteúdo:</label>

                  <div
                    className={styles.textAreaContainer}
                    data-name="content-container"
                  >
                    <div className={styles.optionsContainer}>
                      {options.map((option) => (
                        <div
                          key={option}
                          className={styles.AddButton}
                          onClick={handleOption}
                        >
                          {option}
                        </div>
                      ))}
                    </div>

                    <div
                      className={styles.textArea}
                      data-name="content"
                      contentEditable={true}
                      dangerouslySetInnerHTML={{
                        __html: publication.conteudo || "",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className={styles.formItem}>
                  <label className={styles.label}>Status:</label>
                  <select
                    className={`${styles.input} ${styles.statusSelect}`}
                    name="status"
                    value={publication.status}
                    onChange={(e) =>
                      setPublication({ ...publication, status: e.target.value })
                    }
                  >
                    <option value="Rascunho">Rascunho</option>
                    <option value="Publicado">Publicado</option>
                    <option value="Arquivado">Arquivado</option>
                  </select>
                </div>
              </div>

              <div className={styles.formFooter}>
                <span className={styles.helperText}>
                  Os campos marcados com{" "}
                  <span className={styles.required}>*</span> são obrigatórios.
                </span>
                <Button
                  label="Atualizar publicação"
                  variant="primary"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
