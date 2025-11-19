"use client";
import styles from "./navbar.module.css";

type NavBarProps = {
    page: (page: string) => void;
    icon: (icon: string) => void;
    pageTest: string;
}

export default function NavBar({page, icon, pageTest}: NavBarProps) {

    function changePage(newPage: string, newIcon: string) {
        
        page(newPage);
        icon(newIcon);
    }

    let ActualPage = "admninistradores";

    console.log(pageTest);

    if(pageTest === "administradores") {
        ActualPage = "administradores";
    } else if(pageTest === "permissoes") {
        ActualPage = "permissoes";
    } else if(pageTest === "publicacoes") {
        ActualPage = "publicacoes";
    }

    return (
        <nav className={styles.navbar}>
            <h1 className={`${styles.option} ${ActualPage === 'administradores' ? styles.selected : ''}`} onClick={() => changePage("administradores", "Avatar")}>Administradores</h1>
            <h1 className={`${styles.option} ${ActualPage === 'permissoes' ? styles.selected : ''}`} onClick={() => changePage("permissoes", "Shield")}>Permissões</h1>
            <h1 className={`${styles.option} ${ActualPage === 'publicacoes' ? styles.selected : ''}` } onClick={() => changePage("publicacoes", "Icon")}>Publicações</h1>
        </nav>
    );
}