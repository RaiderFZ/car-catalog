import {useSearchParams, useRouter } from "next/navigation";

const SortSelect = () => {

    return (
        <select value={currentSort} onChange={handleChange}>
            <option value="">Без сортировки</option>
            <option value="asc">Цена: по возрастанию</option>
            <option value="desc">Цена: по убыванию</option>
        </select> 
    )
}