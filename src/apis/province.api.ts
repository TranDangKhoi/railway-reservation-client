import axios from "axios";
import { ProvinceDataType } from "src/types/province.types";

const provinceApi = {
  getCountries: () => axios.get<ProvinceDataType[]>("https://provinces.open-api.vn/api/?depth=1"),
  searchCountries: (countryName: string) =>
    axios.get<ProvinceDataType[]>(`https://provinces.open-api.vn/api/p/search/?q=${countryName}&depth=1`),
};

export default provinceApi;
