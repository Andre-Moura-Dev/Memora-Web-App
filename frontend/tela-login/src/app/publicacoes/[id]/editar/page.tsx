"use client";
import { useEffect, useState } from "react"; 
import styles from "./editarPublicacoes.module.css"; 
import Header from "../../../../components/Header/header";
import Image from "next/image";
import Edit from "../../../../assets/edit.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";
import { PublicationProps } from "@/types/PublicationProps";
import { useParams, useRouter } from "next/navigation";

export default function EditPublicationPage() {

    const [title, setTitle] = useState<string>("");
    const [publicationDate, setPublicationDate] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [status, setStatus] = useState<string>("Rascunho");
    const [contentHTML, setContentHTML] = useState<string>("");

    const { id } = useParams(); // Obtém o ID da URL
    const router = useRouter();

    const categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];
    const options = ["Adicionar Cabeçalho", "Adicionar Subtítulo", "Adicionar Texto", "Adicionar Link", "Adicionar Imagem"];


    function loadPublicationData(pubId: number) {
        console.log("Carregando dados da publicação com ID:", pubId);
        const allPublications = JSON.parse(localStorage.getItem('publications') || '[]');
        const publicationToEdit = allPublications.find((pub: any) => pub.id === pubId);

        if (publicationToEdit) {
            setTitle(publicationToEdit.title);
            setPublicationDate(publicationToEdit.publicationDate);
            setCategory(publicationToEdit.category);
            setStatus(publicationToEdit.status);
            setContentHTML(publicationToEdit.content); // Carrega o HTML salvo

            setTimeout(() => {
                const contentDiv = document.querySelector('[data-name="content"]') as HTMLDivElement;
                if (contentDiv) {
                    contentDiv.innerHTML = publicationToEdit.content;
                }
            }, 0);
        } else {
            console.error("Publicação não encontrada para edição com ID:", pubId);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            // Verifica se id está definido antes de chamar
            loadPublicationData(Number(id));
        }
    }, [id]);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const dadosAtualizados = {
            id: Number(id),
            title, 
            publicationDate,
            category,
            status,
        };

        const contentContainer = document.querySelector('[data-name="content"]');
        const novoConteudoHTML = contentContainer?.innerHTML || '';

        console.log("Dados atualizados: ", dadosAtualizados);
        console.log("Novo conteúdo HTML:", novoConteudoHTML);

        if (!title || !category || !publicationDate || novoConteudoHTML.trim() === '' || !status) {
            alert("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        const newPublicationId = updatePublicationToDB(dadosAtualizados, novoConteudoHTML);

        alert("Publicação atualizada com sucesso!");
        router.push(`/publicacoes/${id}/editar`)
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

    function updatePublicationToDB(data: any, novoConteudoHTML: string) {
        const allPublications = JSON.parse(localStorage.getItem('publications') || '[]');
        const index = allPublications.findIndex((pub: any) => pub.id === Number(id));

        if (index !== -1) {
            allPublications[index] = {
                ...allPublications[index],
                title: data.title,
                publicationDate: data.publicationDate,
                category: data.category,
                status: data.status,
                content: novoConteudoHTML,
                updateAt: new Date().toISOString()
            }

            localStorage.setItem('publications', JSON.stringify(allPublications));
            console.log("Publicação atualizada localmente:", allPublications[index]);
        } else {
            console.error("Erro ao atualizar: Publicação não encontrada no localStorage");
        }
    }

    const InputTitle = { label: "Título", name: "titulo", type: "text", key: 1, typeForm: "publication" };
    const InputDate = { label: "Data de Publicação", name: "dataPublicacao", type: "date", key: 3, typeForm: "publication" }

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
                            <InputMain 
                                input={InputTitle} 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />

                            <div className={styles.formRow}>

                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categoria:<span style={{ color: "white" }}>*</span></label>
                                    <select 
                                        name="categoria" 
                                        className={styles.input} 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Selecione a categoria</option>
                                        {categories.slice(1).map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputMain 
                                    input={InputDate} 
                                    value={publicationDate} 
                                    onChange={(e) => setPublicationDate(e.target.value)} 
                                />
                            </div>

                            
                            <div className={styles.formItem}>
                                <label className={styles.label}>Conteúdo:</label>
                                
                                <div className={styles.textAreaContainer} data-name='content-container'>

                                    <div className={styles.optionsContainer}>
                                        {options.map((option) => (
                                            <div key={option} className={styles.AddButton} onClick={handleOption}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.textArea}  data-name="content" contentEditable={true} dangerouslySetInnerHTML={{__html: contentHTML}}></div>

                                </div>
                            </div>

                            <div className={styles.formItem}>
                                <label className={styles.label}>Status:</label>
                                <select 
                                    className={`${styles.input} ${styles.changeWidth}`} 
                                    name="status" value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Rascunho">Rascunho</option>
                                    <option value="Publicado">Publicado</option>
                                    <option value="Arquivado">Arquivado</option>

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