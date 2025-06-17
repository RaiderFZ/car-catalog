
import { SortOrder } from "./types";
import { getCars } from "@/lib/api";
import { notFound } from "next/navigation";

export const prepareCarsData = async (
  searchParams: Promise<Record<string, string | string[] | undefined>>
) => {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams();

  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      params.set(key, value[0]);
    }
  });

  const sort = params.get("sort") as SortOrder | null;
  const page = Number(params.get("page")) || 1;
  const validSort: SortOrder | undefined =
    sort === "asc" || sort === "desc" ? sort : undefined;

  const response = await getCars(page, validSort);

  if (!response.data || response.data.length === 0) {
    notFound();
  }

  return {
    response,
    currentPage: page,
    sort: sort || "",
  };
};

export const updateSearchParams = (
  current: URLSearchParams,
  updates: Record<string, string | undefined>
): string => {
  const params = new URLSearchParams(current.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  return params.toString();
}