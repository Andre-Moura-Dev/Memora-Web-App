"use client";
import styles from "./publicacoes.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import Add from "../../../assets/add-square.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";

export default function PublicationPage() {
  const InputTitle = {
    label: "Título:",
    name: "titulo",
    type: "text",
    key: 1,
    typeForm: "publication",
  };

  const InputDate = {
    label: "Data de Publicação:",
    name: "dataPublicacao",
    type: "date",
    key: 3,
    typeForm: "publication",
  };

  let categories = ["", "Notícia", "Evento", "Comunicado", "Outro"];

  const options = [
    "Adicionar Cabeçalho",
    "Adicionar Subtítulo",
    "Adicionar Texto",
    "Adicionar Link",
    "Adicionar Imagem",
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const contentContainer = document.querySelector(
      '[data-name="content"]'
    ) as HTMLDivElement | null;

    const conteudo = contentContainer?.innerHTML || "";
    formData.append("conteudo", conteudo);

    const requiredFields = [
      "titulo",
      "categoria",
      "dataPublicacao",
      "conteudo",
      "status",
    ];
    for (const field of requiredFields) {
      if (
        !formData.get(field) ||
        (formData.get(field) as string).trim() === ""
      ) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
      }
    }

    const categoria = formData.get("categoria") as string;
    const status = formData.get("status") as string;

    const storedAdmin = localStorage.getItem("admin");
    const admin = storedAdmin ? JSON.parse(storedAdmin) : null;
    const ID_Administradores = admin?.id_administradores || 1;

    const body = {
      ID_Administradores,
      titulo: formData.get("titulo"),
      categoria,
      conteudo,
      status,
    };

    try {
      const token = localStorage.getItem("token");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/publications`;
      console.log("POST URL:", url);
      console.log("Body enviado:", body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}),
        },
        body: JSON.stringify(body),
      });

      console.log("Status:", res.status);

      const text = await res.text();
      console.log("Raw response text:", text);

      if (!res.ok) {
        let errorBody: any = {};
        try {
          errorBody = JSON.parse(text);
        } catch {
          errorBody = {};
        }
        console.error("Erro ao criar publicação:", errorBody);
        throw new Error(
          errorBody.error || errorBody.msg || "Erro ao criar publicação"
        );
      }

      const created = JSON.parse(text);
      console.log("Publicação criada:", created);
      alert("Publicação adicionada com sucesso!");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar publicação: " + err.message);
    }
  }

  function handleOption(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const option = event.currentTarget;
    const contentContainer = document.querySelector(
      '[data-name="content"]'
    ) as HTMLDivElement | null;
    const optionsEls = document.querySelectorAll(`.${styles.AddButton}`);

    optionsEls.forEach((opt) => {
      opt.classList.remove(styles.AddButtonSelected);
    });

    option.classList.add(styles.AddButtonSelected);

    if (!contentContainer) return;

    switch (option.textContent) {
      case "Adicionar Cabeçalho": {
        const header = document.createElement("h2");
        header.contentEditable = "true";
        header.className = styles.contentHeader;
        header.textContent = "Novo Cabeçalho";
        contentContainer.appendChild(header);
        break;
      }
      case "Adicionar Subtítulo": {
        const subheader = document.createElement("h3");
        subheader.contentEditable = "true";
        subheader.className = styles.contentSubheader;
        subheader.textContent = "Novo Subtítulo";
        contentContainer.appendChild(subheader);
        break;
      }
      case "Adicionar Texto": {
        const paragraph = document.createElement("p");
        paragraph.contentEditable = "true";
        paragraph.className = styles.contentText;
        paragraph.textContent = "Digite seu texto aqui...";
        contentContainer.appendChild(paragraph);
        break;
      }
      case "Adicionar Link": {
        const link = document.createElement("a");
        link.contentEditable = "true";
        link.className = styles.contentLink;
        link.textContent = "Digite seu link aqui...";
        link.href = "#";
        contentContainer.appendChild(link);
        break;
      }
      case "Adicionar Imagem": {
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.accept = "image/*";
        imageInput.click();

        imageInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file || !contentContainer) return;

          try {
            const formDataImg = new FormData();
            formDataImg.append("image", file);

            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const res = await fetch(`${apiUrl}/api/uploads/image`, {
              method: "POST",
              body: formDataImg,
            });

            if (!res.ok) {
              console.error("Erro ao enviar imagem:", await res.text());
              alert("Erro ao enviar imagem");
              return;
            }

            const data = await res.json(); // { url: "/uploads/..." }

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
                  Cadastre notícias, comunicados e eventos que aparecerão no
                  portal público.
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
              <div className={styles.formItem}>
                <InputMain input={InputTitle} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    Categoria:<span className={styles.required}>*</span>
                  </label>
                  <select name="categoria" className={styles.input}>
                    <option defaultValue={""}>Selecione a categoria</option>
                    {categories.slice(1).map((categorie) => (
                      <option key={categorie} value={categorie}>
                        {categorie}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formItem}>
                  <InputMain input={InputDate} />
                </div>
              </div>

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
                  ></div>
                </div>
              </div>

              <div className={styles.formItem}>
                <label className={styles.label}>Status:</label>
                <select
                  className={`${styles.input} ${styles.statusSelect}`}
                  name="status"
                >
                  <option value="Rascunho">Rascunho</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>
            </div>

            <div className={styles.formFooter}>
              <span className={styles.helperText}>
                Os campos marcados com <span className={styles.required}>*</span>{" "}
                são obrigatórios.
              </span>
              <Button
                label="Adicionar publicação"
                variant="primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
