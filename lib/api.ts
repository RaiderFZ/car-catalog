// import axios from "axios";

// import {CarApiResponse} from "@/app/cars/types";

// const BASE_URL = process.env.API_URL ?? "https://plex-parser.ru-rating.ru";

// export const getCars = async (
//     page = 1,
//     sort?: "asc" | "desc"
// ) => {
//     const params = new URLSearchParams({
//         _limit: "12",
//         _page: String(page),
//     });

//     if(sort) {
//         params.set("_sort", "price");
//         params.set("_order", sort)
//     }

//      try {
//     const response = await axios.get<CarApiResponse>(`${BASE_URL}/cars?${params.toString()}`, {
//         timeout: 10000
//     });
//     console.log("API response:", response.data);
//     return response.data;
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error("API error:", error.message);
//             throw new Error("Не удалось загрузить автомобили с сервера");
//         } else {
//             console.error("API error (неизвестный тип):", error);
//             throw new Error("Произошла неизвестная ошибка при загрузке");
//         }
//     }
// }

export const getCars = async (page = 1, sort?: "asc" | "desc") => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plex-parser.ru-rating.ru";

  const params = new URLSearchParams({
    _limit: "12",
    _page: String(page),
  });

  if (sort) {
    params.set("_sort", "price");
    params.set("_order", sort);
  }

  const url = `${BASE_URL}/cars?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }

  return response.json();
};