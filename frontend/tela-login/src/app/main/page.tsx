"use client";

import Header from "@/components/Header/header";
import styles from "./main.module.css";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Menu from "@/components/Menu/Menu";
import List from "@/components/List/List";
import { useEffect, useState } from "react";
import { admninistradores } from "@/utils/administradores";
import { permissoes } from "@/utils/permissoes";
import { publications } from "@/utils/publicacoes";
import NavBar from "@/components/NavBar/NavBar";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
    const params = useParams();
    const router = useRouter();

    const currentPage = (params?.section as string) || "administradores";

    const [page, setPage] = useState(currentPage);
    const [icon, setIcon] = useState("Avatar");

    const pageConfig: Record<string, any> = {
        administradores: {
            data: admninistradores,
            icon: "Avatar",
        },
        permissoes: {
            data: permissoes,
            icon: "Shield",
        },
        publicacoes: {
            data: publications,
            icon: "Icon",
        },
    };

    const currentConfig = pageConfig[page] || pageConfig["administradores"];

    useEffect(() => {
        router.replace(`/main/${page}`);
    }, [page]);

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.main}>
                <GreenLeftBar />

                <div className={styles.content}>
                    <NavBar 
                        page={setPage} 
                        icon={setIcon} 
                        pageTest={page} 
                    />

                    <Menu page={page} />

                    <ul className={styles.data}>
                        {currentConfig.data.map((item: any) => (
                            <List
                                key={item.id}
                                icon={currentConfig.icon}
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