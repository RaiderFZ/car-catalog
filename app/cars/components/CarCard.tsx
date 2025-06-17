import Image from "next/image";
import styles from "../cars.module.css";
import { Car } from "../types";
import { memo } from "react";

const { card, cardImage, cardContent, cardTitle, cardText } = styles;

interface Props {
  car: Car;
  priority?: boolean;
}
function CarCardComponent({ car, priority = false }: Props) {
  return (
    <div className={card}>
      <div className={card}>
        {car.images?.image?.[0] ? (
          <Image
            src={car.images.image[0]}
            alt={`Авто ${car.mark_id}`}
            className={cardImage}
            width={400}
            height={300}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 400px"
            onError={() => console.error(`Failed to load image: ${car.images?.image?.[0]}`)}
          />
        ) : (
          <div className={cardImage}>Нет фото</div>
        )}
        <div className={cardContent}>
          <h3 className={cardTitle} title={car.mark_id}>{car.mark_id}</h3>
          <p className={cardText}>Папка: {car.folder_id}</p>
          <p className={cardText}>Цена: {car.price.toLocaleString()} ₽</p>
        </div>
      </div>
    </div>
  );
};
const CarCard = memo(CarCardComponent);

export default CarCard;