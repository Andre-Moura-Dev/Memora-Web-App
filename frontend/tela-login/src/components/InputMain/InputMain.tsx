"use client";
import { Component, ComponentProps } from "react";
import styles from "./inputmain.module.css";

interface InputMainProps extends ComponentProps<"input">  {
    input: {
        label: string;
        name: string;
        type: string;
        key: number;
    }
}

export default function InputMain({ input }: InputMainProps) {
    return (
        <div className={styles.formItem}>
            <label className={styles.label}>{input.label}<span style={{ color: "red" }}>*</span></label>
            <input type={input.type} name={input.name} className={`${styles.input} ${input.key === 3 || input.key === 4 ? styles.changeWidth : ''}`} />
        </div>
    );
}