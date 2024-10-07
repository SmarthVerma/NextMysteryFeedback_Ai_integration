// Type for a successful API response
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: true;
}

// Type for an error API response
export interface ApiError {
  statusCode: number;
  success: false;
  message: string;
  errors: any[]; // You can further define this array based on your error structure
}

// Type for the merged ApiResult
export type ApiResult<T> = ApiResponse<T> | ApiError;
