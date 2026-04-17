export interface Success<T> {
  success: true;
  status: number;
  data: T;
}

export interface Failure {
  success: false;
  status: number;
  error: {
    message: string;
    action?: string;
  };
}

export type Response<T> = Success<T> | Failure;

export function success<T>(data: T, status = 200): Success<T> {
  return { success: true, status, data };
}

export function failure(message: string, action?: string, status = 400): Failure {
  return { success: false, status, error: { message, action } };
}
