export interface IApplicationDetailErrorResponse {
  message: string;
  fieldErrors?: Record<string, string[]>;
}