import axios from "axios";

import {CarApiResponse} from "@/app/cars/types";

const BASE_URL = "https://plex-parser.ru-rating.ru";

export const getCars = async (
    page = 1,
    sort?: "asc" | "desc"
) => {
    const params = new URLSearchParams({
        _limit: "12",
        _page: String(page),
    });

    if(sort) {
        params.set("_sort", "price");
        params.set("_order", sort)
    }

     try {
    const response = await axios.get<CarApiResponse>(`${BASE_URL}/cars?${params.toString()}`);
    return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("API error:", error.message);
            throw new Error("Не удалось загрузить автомобили с сервера");
        } else {
            console.error("API error (неизвестный тип):", error);
            throw new Error("Произошла неизвестная ошибка при загрузке");
        }
    }
}