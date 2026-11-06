// Response shapes of GET /api/me/attempts and GET /api/me/attempts/:course/:id (Server/router/me.js).

export interface AttemptSummary {
  id: string;
  course: string;
  courseLabel: string;
  title: string;
  detail: string;
  date: string;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  percent: number;
  points: number | null;
  mode: 'practice' | 'timed' | null;
  timeSpent: number | null;
  retakeUrl: string;
  analyticsUrl: string | null;
}

export interface AttemptsPage {
  attempts: AttemptSummary[];
  total: number;
}

export interface TopicResult {
  name: string;
  correct: number;
  total: number;
  percent: number;
}

export interface Mistake {
  id: string;
  status: 'wrong' | 'skipped';
  questionNumber: number | null;
  section: string | null;
  topic: string | null;
  /** Null when the question has since been removed from the question bank. */
  question: string | null;
  yourAnswer: string | null;
  correctAnswer: string | null;
  explanation: string | null;
  tag: string | null;
  why: string | null;
  fix: string | null;
}

export interface AttemptReview {
  attempt: AttemptSummary;
  topics: TopicResult[];
  mistakes: Mistake[];
}

export interface CourseOption {
  key: string;
  label: string;
}

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string; sessionExpired: boolean }
  | { status: 'ready'; data: T };

export type ScoreTone = 'good' | 'mid' | 'low';
