import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Header from "@/components/Header/header";
import List from "@/components/List/List";
import Menu from "@/components/Menu/Menu";
import NavBar from "@/components/NavBar/NavBar";
import { permissoes } from "@/utils/permissoes";
import styles from "@/app/permissoes/permissoes.module.css";

export default function ListPermissions() {
  const page = "permissoes";
  const icon = "Shield";

  let ActualPage = permissoes;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <GreenLeftBar />

        <div className={styles.content}>
          <NavBar newPage="permissoes" />

          <Menu page={page} />
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
