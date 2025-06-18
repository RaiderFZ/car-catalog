
import CarsLayout from "./components/CarsLayout";

import {prepareCarsData} from './utils';
interface Props {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const CarsPage = async ({ searchParams = Promise.resolve({}) }: Props) => {
  const { response, currentPage, sort } = await prepareCarsData(searchParams);

  return (
    <CarsLayout
      cars={response.data}
      totalPages={response.meta.last_page}
      currentPage={currentPage}
      sort={sort || ""}
    />
  );
};

export default CarsPage;