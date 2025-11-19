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
import NavBar from "@/components/NavBar/NavBar";

export default function Home() {
    
    const [newPage, setNewPage] = useState("administradores");
    const [newIcon, setNewIcon] = useState("Avatar");

    let ActualPage = admninistradores;
    let page = "administradores";
    let icon = "Avatar";

    if(newPage === "administradores") {
        ActualPage = admninistradores;
        page = "administradores";
        icon = "Avatar";
    } else if(newPage === "permissoes") {
        ActualPage = permissoes;
        page = "permissoes";
        icon = "Shield";
    } else if(newPage === "publicacoes") {
        ActualPage = publications;
        page = "publicacoes";
        icon = "Icon";
    }

    return (
        <div className={styles.container}>
          <Header />
          <div className={styles.main}>
            <GreenLeftBar />

            <div className={styles.content}>
              <NavBar page={setNewPage} icon={setNewIcon} pageTest={newPage} />

              <Menu page={newPage}/>
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