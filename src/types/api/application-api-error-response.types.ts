export interface ICreateApplicationErrorResponse {
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export interface IFavoriteErrorResponse {
  message: string;
}