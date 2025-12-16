"use client";
import React from "react";
import styles from "./inputmain.module.css";

interface InputMainProps {
  input: {
    label: string;
    name: string;
    type: string;
    value: string | Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputKey?: number; // renomeado para evitar conflito com key do React
    typeForm: string;
  };
}

export default function InputMain({ input }: InputMainProps) {
  return (
    <div className={styles.formItem}>
      <label className={styles.label}>
        {input.label}
        <span
          style={input.typeForm === "publication" ? { color: "white" } : { color: "red" }}
        >
          *
        </span>
      </label>
      <input
        type={input.type}
        name={input.name}
        value={input.value instanceof Date ? input.value.toISOString().split('T')[0] : input.value}
        onChange={input.onChange}
        className={`${styles.input} ${
          input.inputKey === 3 || input.inputKey === 4 ? styles.changeWidth : ""
        }`}
      />
    </div>
  );
}
