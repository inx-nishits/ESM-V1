export interface ApiErrorBody {
  code: string;
  message: string;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiErrorBody };

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function apiSuccess<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function apiError(code: string, message: string): ApiResponse<never> {
  return { success: false, error: { code, message } };
}
