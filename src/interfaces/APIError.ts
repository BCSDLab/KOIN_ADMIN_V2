export interface ApiFieldError {
  field: string;
  message: string;
  constraint: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  errorTraceId?: string;
  fieldErrors?: ApiFieldError[];
}
