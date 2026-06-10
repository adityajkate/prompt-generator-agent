export const ASPECT_RATIOS = ['16:9', '4:3', '1:1', '9:16', '2:1', '3:2', '21:9'] as const;

export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export interface GenerateRequest {
  theme: string;
  aspectRatio: AspectRatio;
}

export interface GenerateResult {
  prompt: string;
}

export type ApiErrorCode = 'INVALID_INPUT' | 'API_ERROR' | 'RATE_LIMITED';

export interface ApiErrorResponse {
  error: string;
  code: ApiErrorCode;
}

export type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: GenerateResult }
  | { status: 'error'; error: string };
