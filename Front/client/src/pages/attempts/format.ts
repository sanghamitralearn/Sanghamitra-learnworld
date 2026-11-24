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
    : date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });
}

// Indian format and time zone, e.g. "24 Nov 2026, 3:45 pm".
export function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.max(Math.round(totalSeconds / 60), 1);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}
