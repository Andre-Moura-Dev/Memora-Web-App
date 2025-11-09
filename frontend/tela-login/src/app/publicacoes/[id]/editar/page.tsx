"use client";
import { useEffect, useState } from "react"; 
import styles from "./editarPublicacoes.module.css"; 
import Header from "../../../../components/Header/header";
import Image from "next/image";
import Edit from "../../../../assets/edit.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";

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
    const [publication, setPublication] = useState<publicationProps>();

    let InputTitle = { label: "Título:", name: "titulo", value: publication?.titulo, type: "text", key: 1, typeForm: "publication" };
    // const InputStatus = { label: "Status", name: "status", type: "text", key: 4, typeForm: "publication" };
    // const InputContent = { label: "Conteúdo:", name: "content", type: "textarea", key: 1, typeForm: "publication" };
    // const InputCategory = { label: "Categoria", name: "categoria", type: "text", key: 3, typeForm: "publication" };
    let InputDate = { label: "Data de Publicação:", name: "dataPublicacao", value: publication?.data_publicacao, type: "text", key: 3, typeForm: "publication" };

    let categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];

    const options = ["Adicionar Cabeçalho", "Adicionar Subtítulo", "Adicionar Texto", "Adicionar Link", "Adicionar Imagem"];


    function getPublication() {
        // Simulação de uma chamada à API para obter os dados da publicação
        const fetchedPublication: publicationProps = {
            id: 1,
            titulo: "Avanço da IA no Brasil",
            conteudo: `<h2 contenteditable="true" class="undefined">Texto</h2><h3 contenteditable="true" class="undefined">textinho</h3>`,
            categoria: "Notícias",
            data_publicacao: "09-11-2025",
            status: "Publicado",
        };
        setPublication(fetchedPublication);
        console.log(fetchedPublication.data_publicacao);
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        
        const formData = new FormData(event.target as HTMLFormElement);
        
        
        const contentContainer = document.querySelector('[data-name="content"]');

        let content: string = '';

        content = contentContainer?.innerHTML || '';

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
            !formData.get("dataPublicacao") ||
            !formData.get("conteudo") ||
            !formData.get("status")) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        alert("Publicação atualizada com sucesso!");
    }

    function handleOption(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
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
        getPublication();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Header />

                <div className={styles.main}>
                    <GreenLeftBar />

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Image src={Edit} alt="Editar Publicação" width="23" height="25" />
                            <h2 className={styles.title}>Editar publicação</h2>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <InputMain input={InputTitle} />

                            <div className={styles.formRow}>

                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categoria:<span style={{ color: "white" }}>*</span></label>
                                    <select name="categoria" className={styles.input}>

                                        {
                                            publication?.categoria ?
                                                <option defaultValue={publication.categoria}>{publication.categoria}</option>
                                                :
                                                <option defaultValue={""}>Selecione a categoria</option>
                                        }

                                        {categories.slice(1).map((categorie) => (
                                            <option key={categorie} value={categorie}>{categorie}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputMain input={InputDate} />
                                {/* <InputMain input={{ ...InputDate, value: publication?.titulo }} /> */}
                            </div>

                            
                            <div className={styles.formItem}>
                                <label className={styles.label}>Conteúdo:</label>
                                {/* <textarea name="conteudo" className={`${styles.input} ${styles.textarea}`} /> */}

                                <div className={styles.textAreaContainer} data-name='content-container'>

                                    <div className={styles.optionsContainer}>
                                        {options.map((option) => (
                                            <div key={option} className={styles.AddButton} onClick={handleOption}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.textArea}  data-name="content" dangerouslySetInnerHTML={{ __html: publication?.conteudo || '' }}></div>

                                </div>
                            </div>

                            <div className={styles.formItem}>
                                <label className={styles.label}>Status:</label>
                                <select className={`${styles.input} ${styles.changeWidth}`} name="status">


                                    {
                                        publication?.status ?
                                            <option defaultValue={publication.status}>{publication.status}</option>
                                            :
                                            <option defaultValue="Rascunho">Rascunho</option>
                                    }

                                    <option value="Rascunho">Rascunho</option>
                                    <option value="publicado">Publicado</option>
                                    <option value="arquivado">Arquivado</option>
                                </select>
                            </div>
                            <Button label="Editar publicação" variant="primary" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}