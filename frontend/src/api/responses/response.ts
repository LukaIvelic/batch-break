export type NestResponse<T> = {
  status: number;
  message: string;
  response?: T;
};
