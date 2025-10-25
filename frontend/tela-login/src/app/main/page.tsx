"use client";
import Header from "@/components/Header/header";
import styles from "./main.module.css"
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Menu from "@/components/Menu/Menu";
import List from "@/components/List/List";
import { useState } from "react";
import { admninistradores } from "@/utils/administradores";
import { permissoes } from "@/utils/permissoes";
import { publications } from "@/utils/publicacoes";
import Avatar from "@/assets/user-profile.png";
import Shield from "@/assets/shield.png";
import Icon from "@/assets/image-add.png";

export default function Home() {
    const [page, setPage] = useState("administrador");
    const [icon, setIcon] = useState("Avatar");

    let ActualPage = admninistradores;

    if(page == "administrador") {
        ActualPage = admninistradores;
    } else if(page == "permissao") {
        ActualPage = permissoes;
    } else if(page == "publicacao") {
        ActualPage = publications;    
    }

    return (
        <div className={styles.container}>
          <Header />
          <div className={styles.main}>
            <GreenLeftBar />

            <div className={styles.content}>
              <nav className={styles.navbar}>
                <h1 className={`${styles.option} ${page === 'administrador' ? styles.selected : ''}`} onClick={() => {setPage("administrador"), setIcon("Avatar")}}>Administradores</h1>
                <h1 className={`${styles.option} ${page === 'permissao' ? styles.selected : ''}`} onClick={() => {setPage("permissao"), setIcon("Shield")}}>Permissões</h1>
                <h1 className={`${styles.option} ${page === 'publicacao' ? styles.selected : ''}` } onClick={() => {setPage("publicacao"), setIcon("Icon")}}>Publicações</h1>
              </nav>
              <Menu page={page}/>
                <ul className={styles.data}>
                  {ActualPage.map((item) => (
                    <List 
                      key={item.id} 
                      icon={icon} 
                      name={item.title} 
                      id={item.id} 
                      page={page} 
                    />
                  ))}
                </ul>
            </div>
          </div>
        </div>
    );
}