import { isUndefined, omitBy } from "lodash";
import { QueryConfigType } from "src/types/query.types";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfigType = omitBy(
    {
      departureStation: queryParams.departureStation,
      arrivalStation: queryParams.arrivalStation,
      departureTime: queryParams.departureTime,
    },
    isUndefined,
  );

  return queryConfig;
}
