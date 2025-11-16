"use client";

import styles from "./navbar.module.css";

type NavBarProps = {
    page: (page: string) => void;
    icon: (icon: string) => void;
    pageTest: string;
};

export default function NavBar({ page, icon, pageTest }: NavBarProps) {
    const navigation = [
        { label: "Administradores", value: "administradores", icon: "Avatar" },
        { label: "Permissões", value: "permissoes", icon: "Shield" },
        { label: "Publicações", value: "publicacoes", icon: "Icon" },
    ];

    function handleChange(item: any) {
        page(item.value);
        icon(item.icon);
    }

    return (
        <nav className={styles.navbar}>
            {navigation.map((item) => (
                <h1
                    key={item.value}
                    className={`${styles.option} ${
                        pageTest === item.value ? styles.selected : ""
                    }`}
                    onClick={() => handleChange(item)}
                >
                    {item.label}
                </h1>
            ))}
        </nav>
    );
}
