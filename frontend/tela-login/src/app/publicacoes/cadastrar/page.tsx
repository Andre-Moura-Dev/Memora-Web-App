"use client";
import styles from "./publicacoes.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import Add from "../../../assets/add-square.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";
import React from "react";

export default function PublicationPage() {

    const InputTitle = { label: "Título:", name: "titulo", type: "text", key: 1, typeForm: "publication" };
    // const InputStatus = { label: "Status", name: "status", type: "text", key: 4, typeForm: "publication" };
    // const InputContent = { label: "Conteúdo:", name: "content", type: "textarea", key: 1, typeForm: "publication" };
    // const InputCategory = { label: "Categoria", name: "categoria", type: "text", key: 3, typeForm: "publication" };
    const InputDate = { label: "Data de Publicação:", name: "dataPublicacao", type: "date", key: 3, typeForm: "publication" };

    let categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];

    const options = ["Adicionar Cabeçalho", "Adicionar Subtítulo", "Adicionar Texto", "Adicionar Link", "Adicionar Imagem"];

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        
        const formData = new FormData(event.target as HTMLFormElement);
        
        
        const contentContainer = document.querySelector('[data-name="content"]');

        let content: string[] = [];
        contentContainer?.childNodes.forEach((child) => {

            const text = child.textContent;
            if (text && !text.includes('Adicionar')) {
                content.push(text);
                // console.log(child.firstChild);
            }

        });


        formData.append("conteudo", content.join('\n'));

        // console.log(content);
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

        alert("Publicação adicionada com sucesso!");
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
                            <InputMain input={InputTitle} />

                            <div className={styles.formRow}>

                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categoria:<span style={{ color: "white" }}>*</span></label>
                                    <select name="categoria" className={styles.input}>
                                        <option defaultValue={""}>Selecione a categoria</option>
                                        {categories.slice(1).map((categorie) => (
                                            <option key={categorie} value={categorie}>{categorie}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputMain input={InputDate} />
                            </div>

                            
                            <div className={styles.formItem}>
                                <label className={styles.label}>Conteúdo:</label>
                                {/* <textarea name="conteudo" className={`${styles.input} ${styles.textarea}`} /> */}

                                <div className={styles.textAreaContainer} data-name='content'>

                                    <div className={styles.optionsContainer}>
                                        {options.map((option) => (
                                            <div key={option} className={styles.AddButton} onClick={handleOption}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formItem}>
                                <label className={styles.label}>Status:</label>
                                <input type="text" className={`${styles.input} ${styles.changeWidth}`} name="status" />
                            </div>
                            <Button label="Adicionar publicação" variant="primary" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}