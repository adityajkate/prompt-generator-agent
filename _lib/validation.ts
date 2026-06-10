import { ASPECT_RATIOS, type AspectRatio, type GenerateRequest } from './types';

interface ValidationSuccess {
  success: true;
  data: GenerateRequest;
}

interface ValidationFailure {
  success: false;
  error: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;

export function validateGenerateRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { success: false, error: 'Request body must be a JSON object' };
  }

  const data = body as Record<string, unknown>;

  // Validate theme
  if (typeof data.theme !== 'string') {
    return { success: false, error: 'Theme must be a text string' };
  }

  const sanitizedTheme = data.theme
    .replace(/<[^>]*>/g, '')
    .trim();

  if (sanitizedTheme.length === 0) {
    return { success: false, error: 'Theme cannot be empty' };
  }

  if (sanitizedTheme.length > 200) {
    return { success: false, error: 'Theme must be 200 characters or fewer' };
  }

  // Validate aspect ratio
  if (!ASPECT_RATIOS.includes(data.aspectRatio as AspectRatio)) {
    return {
      success: false,
      error: `Aspect ratio must be one of: ${ASPECT_RATIOS.join(', ')}`,
    };
  }

  return {
    success: true,
    data: {
      theme: sanitizedTheme,
      aspectRatio: data.aspectRatio as AspectRatio,
    },
  };
}
