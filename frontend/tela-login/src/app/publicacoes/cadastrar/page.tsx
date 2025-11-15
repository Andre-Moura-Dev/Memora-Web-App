"use client";
import { useState } from "react";
import styles from "./publicacoes.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Add from "../../../assets/add-square.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";

export default function PublicationPage() {

    const [titulo, setTitulo] = useState<string>('');
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [status, setStatus] = useState<string>('Rascunho');

    const router = useRouter();

    // Dados Estáticos
    let categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];
    const options = ["Adicionar Cabeçalho", "Adicionar Subtítulo", "Adicionar Texto", "Adicionar Link", "Adicionar Imagem"];

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const dadosPublicacao = {
            titulo,
            dataPublicacao,
            categoria,
            status,
        };

        console.log("Dados da Publicação: ", dadosPublicacao);

        // Captura o conteúdo da div contentEditable
        const contentContainer = document.querySelector('[data-name="content"]');
        const contentHTML = contentContainer?.innerHTML || '';
        console.log("Conteúdo HTML:", contentHTML);

        if (!titulo || !categoria || !dataPublicacao || !contentHTML || !status) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        if (!contentHTML || contentHTML.trim() === "") {
            alert("O conteúdo é obrigatório");
            return;
        }

        savePublicationToDB(dadosPublicacao, contentHTML);

        alert("Publicação Adicionada com sucesso!");

        router.push('/main');
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

    // Simula salvamento no banco de dados
    function savePublicationToDB(data: any, contentHTML: string) {
        const allPublications = JSON.parse(localStorage.getItem('publications') || '[]');
        const newPublication = {
            id: Date.now(),
            ...data,
            conteudo: contentHTML,
            dataCriacao: new Date().toISOString(),
        };
        allPublications.push(newPublication);
        localStorage.setItem('publications', JSON.stringify(allPublications));
        console.log("Publicação salva localmente: ", newPublication);
    }

    // Definição de inputs
    const InputTitle = { label: "Título:", name: "titulo", type: 'text', key: 1, typeForm: "publication" };
    const InputDate = { label: "Data de Publicação", name: "dataPublicacao", type: "date", key: 3, typeForm: "publication" }

    return (
        <>
            <div className={styles.container}>
                <Header />

                <div className={styles.main}>
                    <GreenLeftBar />

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Image src={Add} alt="Nova Publicação" width="23" height="25" />
                            <h2 className={styles.title}>Nova publicação</h2>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {/* InputMain controlado */}
                            <InputMain 
                                input={InputTitle} 
                                value={titulo} 
                                onChange={(e) => setTitulo(e.target.value)} 
                            />

                            <div className={styles.formRow}>
                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categoria:<span style={{ color: "white" }}>*</span></label>
                                    {/* Select Controlado */}
                                    <select 
                                        name="categoria" 
                                        className={styles.input} 
                                        value={categoria} 
                                        onChange={(e) => setCategoria(e.target.value)}
                                    >
                                        <option value="">Selecione a categoria</option>
                                        {categories.slice(1).map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* InputMain controlado */}
                                <InputMain 
                                    input={InputDate} 
                                    value={dataPublicacao} 
                                    onChange={(e) => setDataPublicacao(e.target.value)} 
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
                                    <div className={styles.textArea} data-name="content" contentEditable={true}></div>
                                </div>
                            </div>

                            <div className={styles.formItem}>
                                <label className={styles.label}>Status:</label>
                                {/* Select controlado */}
                                <select 
                                    className={`${styles.input} ${styles.changeWidth}`} 
                                    name="status" 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Rascunho">Rascunho</option>
                                    <option value="Publicado">Publicado</option>
                                    <option value="Arquivado">Arquivado</option>

                                </select>
                            </div>
                            <Button label="Adicionar publicação" variant="primary" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}