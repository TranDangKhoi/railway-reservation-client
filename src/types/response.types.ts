export type ErrorApiResponseType<Data> = {
  message: string;
  data?: Data;
  errorMessages: string;
  isSuccess: boolean;
  statusCode: number;
};

export type SuccessApiResponseType<Data> = Required<Omit<ErrorApiResponseType<Data>, "errorMessages">>;
