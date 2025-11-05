"use client";
import { useEffect, useState } from "react"; 
import styles from "./editarPublicacoes.module.css"; 
import Header from "../../../../components/Header/header";
import Image from "next/image";
import Edit from "../../../../assets/edit.png"; 
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import InputMain from "@/components/InputMain/InputMain";
import Button from "@/components/Button/Button";
import { useParams } from 'next/navigation';

export default function EditPublicationPage() {
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [dataPublicacao, setDataPublicacao] = useState("");
    const [conteudo, setConteudo] = useState<string[]>([]);
    const [status, setStatus] = useState("");

    
    useEffect(() => {
        const fetchPublication = async () => {

            
            setTitulo("Título Original da Publicação");
            setCategoria("Notícias");
            setDataPublicacao("2025-03-10");
            setStatus("Publicado");
            
            setConteudo([
                "Este é o primeiro parágrafo do conteúdo original.",
                "Este é um subtítulo editado.",
                "Este é o último parágrafo."
            ]);
        };

        fetchPublication();
    }, [id]); 

    
    useEffect(() => {
        const contentContainer = document.querySelector('[data-name="content"]');
        if (contentContainer) {
            contentContainer.innerHTML = ''; 

            
            conteudo.forEach((item, index) => {
                const p = document.createElement('p'); 
                p.className = styles.contentText; 
                p.textContent = item;
                p.contentEditable = 'true'; 
                p.dataset.index = index.toString(); 
                contentContainer.appendChild(p);
            });
        }
    }, [conteudo]); 


    const InputTitle = { label: "Título:", name: "titulo", type: "text", key: 1, typeForm: "publication" };
    const InputDate = { label: "Data de Publicação:", name: "dataPublicacao", type: "date", key: 3, typeForm: "publication" };

    let categories = ["", "Notícias", "Eventos", "Comunicados", "Outros"];

    const options = ["Adicionar Cabeçalho", "Adicionar Subtítulo", "Adicionar Texto", "Adicionar Link", "Adicionar Imagem"];

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        
        const contentContainer = document.querySelector('[data-name="content"]');
        let content: string[] = [];
        contentContainer?.childNodes.forEach((child) => {
            const text = (child as HTMLElement).textContent;
            if (text && !text.includes('Adicionar')) {
                content.push(text);
            }
        });

        formData.append("conteudo", content.join('\n'));

        
        if (
            !formData.get("titulo") ||
            !formData.get("categoria") ||
            !formData.get("dataPublicacao") ||
            !formData.get("conteudo") ||
            !formData.get("status")
        ) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        
        console.log("Dados atualizados da publicação:", Object.fromEntries(formData));

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

        let element: HTMLElement | undefined;

        switch (option.textContent) {
            case "Adicionar Cabeçalho":
                element = document.createElement("h2");
                element.contentEditable = "true";
                element.className = styles.contentHeader;
                element.textContent = "Novo Cabeçalho";
                break;

            case "Adicionar Subtítulo":
                element = document.createElement("h3");
                element.contentEditable = "true";
                element.className = styles.contentSubheader;
                element.textContent = "Novo Subtítulo";
                break;

            case "Adicionar Texto":
                element = document.createElement("p");
                element.contentEditable = "true";
                element.className = styles.contentText;
                element.textContent = "Digite seu texto aqui...";
                break;

            case "Adicionar Link":
                const anchor = document.createElement("a");
                anchor.contentEditable = "true";
                anchor.className = styles.contentLink;
                anchor.textContent = "Digite seu link aqui...";
                anchor.href = "#";
                element = anchor;
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
                return;
        }

        if (!element) return;

        contentContainer.appendChild(element);
    }

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
                            {/* Input de Título - Preenchido com o estado */}
                            <InputMain input={{...InputTitle, value: titulo}} onChange={(e) => setTitulo(e.target.value)} />

                            <div className={styles.formRow}>
                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categoria:<span style={{ color: "white" }}>*</span></label>
                                    <select
                                        name="categoria"
                                        className={styles.input}
                                        value={categoria} // Preenchido com o estado
                                        onChange={(e) => setCategoria(e.target.value)} // Atualiza o estado
                                    >
                                        <option value="">Selecione a categoria</option>
                                        {categories.slice(1).map((categorie) => (
                                            <option key={categorie} value={categorie}>{categorie}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Input de Data - Preenchido com o estado */}
                                <InputMain
                                    input={{...InputDate, value: dataPublicacao}}
                                    onChange={(e) => setDataPublicacao(e.target.value)}
                                />
                            </div>

                            <div className={styles.formItem}>
                                <label className={styles.label}>Conteúdo:</label>
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
                                <input
                                    type="text"
                                    className={`${styles.input} ${styles.changeWidth}`}
                                    name="status"
                                    value={status} // Preenchido com o estado
                                    onChange={(e) => setStatus(e.target.value)} // Atualiza o estado
                                />
                            </div>
                            <Button label="Atualizar publicação" variant="primary" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}