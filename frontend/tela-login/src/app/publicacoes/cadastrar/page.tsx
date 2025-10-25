"use client";
import styles from "./publicacoes.module.css";
import Header from "../../../components/Header/header";
import Image from "next/image";
import Add from "../../../assets/add-square.png";
import GreenLeftBar from "@/components/GreenLeftBar/GreenLeftBar";
import Input from "@/components/Input/Input";
import { useRouter } from "next/navigation";

export default function PublicationPage() {
    return (
        <>
            <div className={styles.container}>
                <Header />

                <div className={styles.main}>
                    <GreenLeftBar/>

                    <div className={styles.content}>

                    </div>

                </div>
            </div>
        </>
    );
}