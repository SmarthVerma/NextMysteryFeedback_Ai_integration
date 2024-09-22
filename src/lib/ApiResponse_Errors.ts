// apiResponse.ts

import { NextResponse } from "next/server";

// ApiResponse class to handle successful API responses
class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // success is true for status codes below 400
  }

  getResponse() {
    return NextResponse.json(
      {
        statusCode: this.statusCode,
        data: this.data,
        message: this.message,
        success: this.success,
      },
      { status: this.statusCode }
    );
  }
}

export { ApiResponse };

// ApiError class to handle API error responses
class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: any;
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  getResponse() {
    return NextResponse.json(
      {
        statusCode: this.statusCode,
        success: this.success,
        message: this.message,
        errors: this.errors,
      },
      { status: this.statusCode }
    );
  }
}

export { ApiError };
