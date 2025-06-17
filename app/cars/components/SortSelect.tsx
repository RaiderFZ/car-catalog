'use client';

import {useSearchParams, useRouter } from "next/navigation";

import style from '../cars.module.css';


const SortSelect = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;

        const params = new URLSearchParams(searchParams.toString());
        if(newSort) {
            params.set("sort", newSort);
        } else {
            params.delete("sort")
        }

        router.push(`/cars?{params.toString()}`)
    }

    return (
        <select className={style.sortSelect} value={currentSort} onChange={handleChange}>
            <option value="">Без сортировки</option>
            <option value="asc">Цена: по возрастанию</option>
            <option value="desc">Цена: по убыванию</option>
        </select> 
    )
}

export default SortSelect;