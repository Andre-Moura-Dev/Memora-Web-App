import styles from "@/components/Menu/menu.module.css";
import Image from "next/image";
import Add from "@/assets/add-square.png";
import Search from "@/assets/search.png";
import Input from "../Input/Input";
import { useRouter } from "next/navigation";

type Menuprops = {
    page: string;
}


export default function Menu({ page }: Menuprops) {
    const router = useRouter(); 

    let title = "";
    let basePath = "";

    switch (page) {
        case "administrador":
            title = "Cadastrar administrador";
            basePath = "/administradores";
        break;
        case "permissao":
            title = "Criar nova permissão";
            basePath = "/permissoes";
        break;
        case "publicacao":
            title = "Adicionar nova publicação";
            basePath = "/publicacoes";
        break;
            default:
            basePath = "/";
    }

    const handleRegister = () => {
        router.push(`${basePath}/cadastrar`);
    };

    return (
        <nav className={styles.container}>
            <button className={styles.register} onClick={handleRegister}>
                <Image src={Add} alt="Registrar" width={30} height={30}/>
                <p className={styles.label}>{title}</p>
            </button>

            <div className={styles.search}>
                <Image src={Search} alt="Buscar" width={25} height={25}/>
                <Input 
                    label="" 
                    placeholder={`Buscar ${page === "administrador" ? "administrador" : page === "permissao" ? "permissão" : "publicação"}`} 
                    className={styles.inputSearch} 
                />
            </div>
        </nav>
    );
}