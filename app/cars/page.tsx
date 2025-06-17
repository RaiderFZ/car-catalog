
import Image from "next/image";
import Link from "next/link";

import { getCars } from "@/lib/api";
import SortSelect from "./components/SortSelect";

import { Car } from "./types";

import styles from "./cars.module.css";
const { container, title, controls, cardsGrid, pagination, card, cardImage, cardContent, cardTitle, cardText } = styles;

interface Props {
    searchParams?: Record<string, string | string[] | undefined>;
}

const CarsPage = async ({searchParams = {}}: Props) => {
    const resolvedParams = await searchParams;
    
    const validParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(resolvedParams)) {
        if (typeof value === "string") {
            validParams[key] = value;
        } else if (Array.isArray(value)) {
            validParams[key] = value.join(","); // Join array into a string
        }
    }

    const params = new URLSearchParams(validParams);
    
    const rawSort = params.get("sort");
    const rawPage = params.get("page");

    const sort = rawSort === "asc" || rawSort === "desc" ? rawSort : undefined;
    const currentPage = Number(rawPage) || 1;

    const response = await getCars(currentPage, sort);
    const cars = response.data;
    const meta = response.meta;
    const totalPages = meta.last_page
    
    const cleanSearchParams: Record<string, string> = {};
    if (sort) cleanSearchParams.sort = sort;

    return (
        <main className={container}>
            <h1 className={title}>Список автомобилей</h1>

            <div className={controls}>
                <SortSelect/>
            </div>

            <div className={cardsGrid}>
                {cars.length === 0 ? (
                    <p>Нет доступных автомобилей</p>
                ) : (
                    cars.map((car: Car) => (
                        
                        <div 
                            key={car.unique_id}
                            className={card}>
                            {car.images?.image?.[0] ? (
                            <Image
                                src={car.images?.image?.[0]}
                                alt={`Авто ${car.mark_id}`}
                                className={cardImage}
                                width={400}
                                height={300}
                                unoptimized
                            />
                            ) : (
                                <div className={cardImage}>Нет фото</div>
                            )}
                            <div className={cardContent}>
                                <h3 className={cardTitle}>{car.mark_id}</h3>
                                <p className={cardText}>Папка: {car.folder_id}</p>
                                <p className={cardText}>Цена: {car.price.toLocaleString()} ₽</p>
                            </div>
                            
                        </div>
                    ))
                )}
            </div>

            <div className={pagination}>
                <Link 
                    href={{
                        pathname: "/cars",
                        query: {
                            ...cleanSearchParams,
                            page: String(Math.max(1, currentPage - 1)),
                        },
                    }}
                >
                    <button disabled={currentPage === 1}>
                        Назад
                    </button>
                </Link>
                
                <span>Страница {currentPage} из {totalPages}</span>

                <Link
                    href={{
                        pathname: "/cars",
                        query: {
                            ...cleanSearchParams,
                            page: String(Math.min(totalPages, currentPage + 1)),
                        },
                    }}
                >
                    <button disabled={currentPage === totalPages}>Вперед</button>
                </Link>
                
            </div>
        </main>
    )
}

export default CarsPage;