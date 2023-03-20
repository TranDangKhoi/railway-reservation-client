import axios from "axios";
import { CountryData } from "src/types/country.types";
import { SuccessApiResponseType } from "src/types/response.types";

const countryApi = {
  getCountries: () => axios.get<CountryData[]>("https://provinces.open-api.vn/api/?depth=1"),
};

export default countryApi;
