"use client";
import { useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";

type NavBarProps = {
    // page: (page: string) => void;
    // icon: (icon: string) => void;
    newPage: string;
}

export default function NavBar({newPage}: NavBarProps) {
    const router = useRouter();
    const [page, setPage] = useState(newPage);
    // const pathname = usePathname();

    // function changePage(page: string) {
    //     if(page === "administradores") {
    //         router.push(`/${page}`);
    //         setPage("administradores");
    //     } else if(page === "permissoes") {
    //         setPage("permissoes");
    //         console.log("PERMISSÃO!!!");
    //         router.push(`/${page}`);
    //     } else if(page === "publicacoes") {
    //         router.push(`/${page}`);
    //         setPage("publicacoes");
    //     } else {
    //         alert("Página não encontrada!");
    //     }
    //     console.log(page);
    // }


    

    return (
        <nav className={styles.navbar}>
            <h1 className={`${styles.option} ${page === 'administradores' ? styles.selected : ''}`} onClick={() => {router.push("administradores"), setPage("administradores")}}>Administradores</h1>
            <h1 className={`${styles.option} ${page === 'permissoes' ? styles.selected : ''}`} onClick={() => {router.push("permissoes"), setPage("permissoes")}}>Permissões</h1>
            <h1 className={`${styles.option} ${page === 'publicacoes' ? styles.selected : ''}` } onClick={() => {router.push("publicacoes"), setPage("publicacoes")}}>Publicações</h1>

            {/* <h1 className={`${styles.option} ${page === 'administradores' ? styles.selected : ''}`} onClick={() => changePage(newPage)}>Administradores</h1>
            <h1 className={`${styles.option} ${page === 'permissoes' ? styles.selected : ''}`} onClick={() => changePage(newPage)}>Permissões</h1>
            <h1 className={`${styles.option} ${page === 'publicacoes' ? styles.selected : ''}` } onClick={() => changePage(newPage)}>Publicações</h1> */}
        </nav>
    );
}