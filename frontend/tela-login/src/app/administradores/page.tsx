"use client";
import styles from "@/app/administradores/administradores.module.css";
import Menu from "@/components/Menu/Menu";
import List from "@/components/List/List";
import NavBar from "@/components/NavBar/NavBar";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Header from "@/components/Header/header";
import { admninistradores } from "@/utils/administradores";

export default function ListAdmin() {
  const page = "administradores";
  const icon ="Avatar";

  let ActualPage = admninistradores;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <GreenLeftBar />

        <div className={styles.content}>
          <NavBar newPage="administradores" />

          <Menu page={page} />
          <ul className={styles.data}>
            {ActualPage.map((item) => (
              <List key={item.id} icon={icon} name={item.title} id={item.id} page={page} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
