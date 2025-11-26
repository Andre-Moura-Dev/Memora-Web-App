"use client";
import { ComponentProps } from "react";
import styles from "./inputmain.module.css";

interface InputMainProps extends ComponentProps<"input">  {
    input: {
        label: string;
        name: string;
        type: string;
        key: number;
        typeForm: string;
    };
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputMain({ input, value, onChange }: InputMainProps) {
    return (
        <div className={styles.formItem}>
            <label className={styles.label}>
                {input.label}
                <span style={input.typeForm === "publication" ? {color: 'white'} : {color: 'red'}}>*</span>
            </label>

            <input 
                type={input.type}
                name={input.name}
                value={value}
                onChange={onChange}
                className={`${styles.input} ${input.key === 3 || input.key === 4 ? styles.changeWidth : ''} `} 
            />
        </div>
    );
}