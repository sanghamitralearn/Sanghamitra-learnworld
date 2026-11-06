import type { ScoreTone } from './types';

// Same bands as the Competitive Exams test cards.
export function scoreTone(percent: number): ScoreTone {
  if (percent >= 70) return 'good';
  if (percent >= 40) return 'mid';
  return 'low';
}

export function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.max(Math.round(totalSeconds / 60), 1);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}
