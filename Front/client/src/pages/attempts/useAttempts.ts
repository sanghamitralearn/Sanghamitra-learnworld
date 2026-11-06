import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAttemptReview, fetchAttempts, isAbort, isSessionExpired } from './attemptsApi';
import type { AsyncState, AttemptReview, AttemptSummary } from './types';

const PAGE_SIZE = 5;

const errorState = (error: unknown, message: string) => ({
  status: 'error' as const,
  message,
  sessionExpired: isSessionExpired(error)
});

export interface AttemptHistoryData {
  attempts: AttemptSummary[];
  total: number;
}

export interface AttemptHistory {
  state: AsyncState<AttemptHistoryData>;
  loadingMore: boolean;
  loadMoreFailed: boolean;
  loadMore: () => void;
  reload: () => void;
}

// The student's attempts, newest first, a page at a time. Changing `course` starts over and
// cancels anything still in flight, so a slow response can't overwrite a newer filter.
export function useAttemptHistory(course: string | null): AttemptHistory {
  const [state, setState] = useState<AsyncState<AttemptHistoryData>>({ status: 'loading' });
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreFailed, setLoadMoreFailed] = useState(false);
  const [generation, setGeneration] = useState(0);
  const moreController = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    setLoadMoreFailed(false);
    setLoadingMore(false);

    fetchAttempts({ course, limit: PAGE_SIZE, offset: 0 }, controller.signal)
      .then((page) => setState({ status: 'ready', data: page }))
      .catch((error: unknown) => {
        if (isAbort(error)) return;
        console.error('Failed to load attempts:', error);
        setState(errorState(error, 'We couldn’t load your past attempts.'));
      });

    return () => {
      controller.abort();
      moreController.current?.abort();
    };
  }, [course, generation]);

  const loadedCount = state.status === 'ready' ? state.data.attempts.length : 0;

  const loadMore = useCallback(() => {
    moreController.current?.abort();
    const controller = new AbortController();
    moreController.current = controller;
    setLoadingMore(true);
    setLoadMoreFailed(false);

    fetchAttempts({ course, limit: PAGE_SIZE, offset: loadedCount }, controller.signal)
      .then((page) => {
        setState((current) => (current.status === 'ready'
          ? { status: 'ready', data: { attempts: [...current.data.attempts, ...page.attempts], total: page.total } }
          : current));
        setLoadingMore(false);
      })
      .catch((error: unknown) => {
        if (isAbort(error)) return;
        console.error('Failed to load more attempts:', error);
        setLoadMoreFailed(true);
        setLoadingMore(false);
      });
  }, [course, loadedCount]);

  const reload = useCallback(() => setGeneration((g) => g + 1), []);

  return { state, loadingMore, loadMoreFailed, loadMore, reload };
}

export interface AttemptReviewResult {
  state: AsyncState<AttemptReview>;
  reload: () => void;
}

// One attempt's marks and mistakes.
export function useAttemptReview(course: string, id: string): AttemptReviewResult {
  const [state, setState] = useState<AsyncState<AttemptReview>>({ status: 'loading' });
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    fetchAttemptReview(course, id, controller.signal)
      .then((data) => setState({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbort(error)) return;
        console.error('Failed to load attempt review:', error);
        setState(errorState(error, 'We couldn’t load this attempt’s details.'));
      });

    return () => controller.abort();
  }, [course, id, generation]);

  const reload = useCallback(() => setGeneration((g) => g + 1), []);

  return { state, reload };
}
