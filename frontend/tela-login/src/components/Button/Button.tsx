import styles from '@/components/Button/button.module.css';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<"button"> {
    label: string;
    variant?: "primary" | "secondary"; // opcional para estilo
}

export default function Button({ label, variant = "primary", ...props }: ButtonProps) {
    const button = `${styles.button} ${styles[variant]}`;
    return (

        <div className={styles.container}>
            <button className={button} {...props}>
                {label}
            </button>
        </div>
    );
}
