"use client"

import { useEffect } from "react";

import style from "./error.module.css";
const {container, title, message, button} = style;

interface Props {
    error: Error;
    reset: () => void;
}

const Error = ({error, reset}: Props) => {
    useEffect(() => {
        console.error('Ошибка на /cars:', error);
    }, [error]);

    return (
        <div className={container}>
            <h2 className={title}>Что-то пошло не так.</h2>
            <p className={message}>{error.message}</p>
            <button 
                className={button} 
                onClick={() => reset()}
            >Попробовать снова</button>
        </div>
    )
}

export default Error;