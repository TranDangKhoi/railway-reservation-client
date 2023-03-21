import axios from "axios";
import { CountryData } from "src/types/country.types";

const countryApi = {
  getCountries: () => axios.get<CountryData[]>("https://provinces.open-api.vn/api/?depth=1"),
  searchCountries: (countryName: string) =>
    axios.get<CountryData[]>(`https://provinces.open-api.vn/api/p/search/?q=${countryName}&depth=1`),
};

export default countryApi;
