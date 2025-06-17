import Image from "next/image";
import styles from "../cars.module.css";
import { Car } from "../types";

const { card, cardImage, cardContent, cardTitle, cardText } = styles;

interface Props {
  car: Car;
  priority?: boolean;
}

const CarCard = ({ car, priority = false }: Props) => {
  return (
    <div className={card}>
      {car.images?.image?.[0] ? (
        <Image
          src={car.images.image[0]}
          alt={`Авто ${car.mark_id}`}
          className={cardImage}
          width={400}
          height={300}
          unoptimized
          priority={priority}
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
  );
};

export default CarCard;