export interface Car {
    unique_id: number;
    price: number;
    mark_id: string;
    folder_id: string;
    images: {
        image: string[];
    };
}

export interface CarApiResponse {
    data: Car[];
    meta: {
        page: number;
        last_page: number;
    }
}

export type SortOrder = "asc" | "desc";