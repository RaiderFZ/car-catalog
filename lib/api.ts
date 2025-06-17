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

    const response = await axios.get<CarApiResponse>(`${BASE_URL}/cars?${params.toString()}`);
    return response.data;
}