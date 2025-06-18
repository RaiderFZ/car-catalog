import axios from "axios";
import { CarApiResponse } from "@/app/cars/types";

export const getCars = async (
  page = 1,
  sort?: "asc" | "desc"
): Promise<CarApiResponse> => {
  const params = new URLSearchParams({
    _limit: "12",
    _page: String(page),
  });

  if (sort) {
    params.set("_sort", "price");
    params.set("_order", sort);
  }

  const url = `/api/cars?${params.toString()}`;

  try {
    const response = await axios.get<CarApiResponse>(url, {
      timeout: 10000,
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.message);
      throw new Error("Не удалось загрузить автомобили с сервера");
    } else {
      console.error("API error (неизвестный тип):", error);
      throw new Error("Произошла неизвестная ошибка при загрузке");
    }
  }
};