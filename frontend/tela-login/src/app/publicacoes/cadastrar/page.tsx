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

    let inputs = [
        { label: "Título", name: "titulo", type: "text", key: 1 },
        { label: "Categoria", name: "categoria", type: "text", key: 2 },
        { label: "Data de Publicação", name: "dataPublicacao", type: "date", key: 3 },
        { label: "Status", name: "status", type: "text", key: 4 }
    ];

    let statusOptions = ["", "Rascunho", "Publicado", "Arquivado"];

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        
        if (
            !formData.get("titulo") || 
            !formData.get("categoria") || 
            !formData.get("dataPublicacao") || 
            !formData.get("status")) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
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

                        <form className={styles.form}>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}