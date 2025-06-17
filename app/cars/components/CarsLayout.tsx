// app/cars/components/CarsLayout.tsx
"use client";

import SortSelect from "./SortSelect";
import Pagination from "./Pagination";
import CarCard from './CarCard'

import styles from "../cars.module.css";
import { Car } from "../types";

interface Props {
  cars: Car[];
  currentPage: number;
  totalPages: number;
  sort: string;
}

const { container, title, controls, cardsGrid } = styles;

const CarsLayout = ({ cars, currentPage, totalPages, sort }: Props) => {
  return (
    <main className={container}>
      <h1 className={title}>Список автомобилей</h1>

      <div className={controls}>
        <SortSelect />
      </div>

      <div className={cardsGrid}>
        {cars.map((car, index) => (
          <CarCard 
                key={car.unique_id} 
                car={car} 
                priority={index < 3} 
            />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        sort={sort}
      />
    </main>
  );
};

export default CarsLayout;
