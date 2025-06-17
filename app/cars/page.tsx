import { getCars } from "@/lib/api";
import Image from "next/image";

import { Car } from "./types";

import styles from "./cars.module.css";
const { container, title, controls, sortSelect, cardsGrid, pagination, card, cardImage, cardContent, cardTitle, cardText } = styles;

const CarsPage = async () => {
    const response = await getCars(1);
    const cars = response.data;


    
    return (
        <main className={container}>
            <h1 className={title}>Список автомобилей</h1>

            <div className={controls}>
                <select className={sortSelect}>
                    <option value="">Без сортировки</option>
                    <option value="asc">
                        Цена: по возрастанию
                    </option>
                    <option value="desc">
                        Цена: по убыванию
                    </option>
                </select>
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