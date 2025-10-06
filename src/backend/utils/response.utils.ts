/**
 * API Response Utilities
 * Standardized response formats for API endpoints
 */

import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    [key: string]: any;
  };
}

/**
 * Success response
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, any>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status }
  );
}

/**
 * Error response
 */
export function errorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: any
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

/**
 * Validation error response
 */
export function validationErrorResponse(
  errors: any
): NextResponse<ApiResponse> {
  return errorResponse('Validation failed', 400, 'VALIDATION_ERROR', errors);
}

/**
 * Not found response
 */
export function notFoundResponse(
  resource: string = 'Resource'
): NextResponse<ApiResponse> {
  return errorResponse(`${resource} not found`, 404, 'NOT_FOUND');
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * Forbidden response
 */
export function forbiddenResponse(
  message: string = 'Forbidden'
): NextResponse<ApiResponse> {
  return errorResponse(message, 403, 'FORBIDDEN');
}

/**
 * Created response
 */
export function createdResponse<T>(
  data: T,
  meta?: Record<string, any>
): NextResponse<ApiResponse<T>> {
  return successResponse(data, 201, meta);
}

/**
 * No content response
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Paginated response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  }
): NextResponse<ApiResponse<T[]>> {
  return successResponse(data, 200, { pagination });
}

/**
 * Rate limit error response
 */
export function rateLimitResponse(
  retryAfter?: number
): NextResponse<ApiResponse> {
  const response = errorResponse(
    'Too many requests',
    429,
    'RATE_LIMIT_EXCEEDED'
  );

  if (retryAfter) {
    response.headers.set('Retry-After', retryAfter.toString());
  }

  return response;
}

/**
 * Server error response
 */
export function serverErrorResponse(
  error?: any
): NextResponse<ApiResponse> {
  const message =
    process.env.NODE_ENV === 'development'
      ? error?.message || 'Internal server error'
      : 'Internal server error';

  const details =
    process.env.NODE_ENV === 'development' ? error?.stack : undefined;

  return errorResponse(message, 500, 'INTERNAL_SERVER_ERROR', details);
}
