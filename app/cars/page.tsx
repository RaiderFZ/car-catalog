
import Image from "next/image";

import { getCars } from "@/lib/api";
import SortSelect from "./components/SortSelect";

import { Car } from "./types";

import styles from "./cars.module.css";
const { container, title, controls, cardsGrid, pagination, card, cardImage, cardContent, cardTitle, cardText } = styles;

interface Props {
    searchParams: {
        sort?: "asc" | "desc";
    };
}

const CarsPage = async ({searchParams = {}}: Props) => {
    const sort = searchParams.sort || undefined;
    const response = await getCars(1, sort);
    const cars = response.data;
    
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
                <button>Назад</button>
                <span>Страница 1 из N</span>
                <button>Вперед</button>
            </div>
        </main>
    )
}

export default CarsPage;