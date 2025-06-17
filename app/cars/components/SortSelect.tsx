'use client';

import {useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

import Spinner from '../Spinner';
import { updateSearchParams } from "../utils";

import style from '../cars.module.css';


const SortSelect = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const currentSort = searchParams.get("sort") || "";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;

        const query = updateSearchParams(searchParams, {
            sort: newSort || undefined,
            page: "1", 
        });

        startTransition(() => {
            router.push(`/cars?${query}`);
        });
    }

    return (
        <>
            <label>
                Сортировка:
                <select 
                    className={style.sortSelect} 
                    value={currentSort} 
                    onChange={handleChange}
                >
                <option value="">Без сортировки</option>
                <option value="asc">Цена: по возрастанию</option>
                <option value="desc">Цена: по убыванию</option>
            </select> 
            </label>
            
            {isPending && <Spinner/>}
        </>
        
       
    )
}

export default SortSelect;