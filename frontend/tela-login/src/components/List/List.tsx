"use client";
import styles from "@/components/List/list.module.css";
import Image from "next/image";
import Edit from "@/assets/edit.png";
import Trash from "@/assets/trash.png";
import Avatar from "@/assets/user-profile.png";
import Shield from "@/assets/shield.png";
import Icon from "@/assets/image-add.png";
import { useRouter } from "next/navigation";

type ListProps = {
    icon: string;
    name: string;
    id: string | number;
    page: string;
}


export default function List({ icon, name, id, page }: ListProps) {
    const router = useRouter();

    let image = Avatar;

    if(icon == "Avatar") {
        image = Avatar;
    } else if(icon == "Shield") {
        image = Shield;
    } else if(icon == "Icon") {
        image = Icon;
    }

    let basePath = "";
    if (page === "administradores") {
        basePath = "/administradores";
    } else if (page === "permissoes") {
        basePath = "/permissoes";
    } else if (page === "publicacoes") {
        basePath = "/publicacoes";
    }

    const handleEdit = () => {
        router.push(`${basePath}/${id}/editar`);
    };

    const handleDelete = () => {
        alert(`Tem certeza que deseja excluir ${name}?`);
        router.push(`${basePath}/${id}/excluir`);
    };
    

    return (
        <li className={styles.item} onClick={() =>{}}>
            <div className={styles.user}>
                <Image src={image} alt="Avatar"/>
                <p>{name}</p>
            </div>
            <div className={styles.options}>
                <button className={styles.button} onClick={handleEdit}>
                    <Image src={Edit} alt="Editar"/>
                </button>
                <button className={styles.button} onClick={handleDelete}>
                    <Image src={Trash} alt="Excluir"/>
                </button>
            </div>  
        </li>
    );
}