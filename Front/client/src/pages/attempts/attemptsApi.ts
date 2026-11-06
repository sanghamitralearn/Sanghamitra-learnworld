import { apiFetch } from '../../api/client';
import type { AttemptReview, AttemptsPage } from './types';

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isAttemptsPage(value: unknown): value is AttemptsPage {
  return isRecord(value) && Array.isArray(value.attempts) && typeof value.total === 'number';
}

function isAttemptReview(value: unknown): value is AttemptReview {
  return isRecord(value) && isRecord(value.attempt) && Array.isArray(value.topics) && Array.isArray(value.mistakes);
}

async function getJson<T>(path: string, isValid: (value: unknown) => value is T, signal: AbortSignal): Promise<T> {
  const response: Response = await apiFetch(path, { signal });
  if (!response.ok) throw new ApiError(`Request failed with status ${response.status}`, response.status);
  const body: unknown = await response.json();
  if (!isValid(body)) throw new ApiError('Unexpected response from the server', response.status);
  return body;
}

export interface AttemptsQuery {
  course: string | null;
  limit: number;
  offset: number;
}

export function fetchAttempts({ course, limit, offset }: AttemptsQuery, signal: AbortSignal): Promise<AttemptsPage> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  if (course) params.set('course', course);
  return getJson(`/me/attempts?${params}`, isAttemptsPage, signal);
}

export function fetchAttemptReview(course: string, id: string, signal: AbortSignal): Promise<AttemptReview> {
  return getJson(`/me/attempts/${encodeURIComponent(course)}/${encodeURIComponent(id)}`, isAttemptReview, signal);
}

export const isAbort = (error: unknown): boolean => error instanceof DOMException && error.name === 'AbortError';

export const isSessionExpired = (error: unknown): boolean => error instanceof ApiError && error.status === 401;
