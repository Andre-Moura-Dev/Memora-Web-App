"use client";
import styles from "@/app/administradores/administradores.module.css";
import Menu from "@/components/Menu/Menu";
import List from "@/components/List/List";
import NavBar from "@/components/NavBar/NavBar";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Header from "@/components/Header/header";
import { publications } from "@/utils/publicacoes";

export default function ListPublic() {
  const page = "publicacoes";
  const icon = "Icon";

  let ActualPage = publications;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <GreenLeftBar />

        <div className={styles.content}>
          <NavBar newPage="publicacoes" />

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
