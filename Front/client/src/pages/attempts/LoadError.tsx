import { Link } from 'react-router-dom';

interface LoadErrorProps {
  state: { message: string; sessionExpired: boolean };
  onRetry: () => void;
}

export function LoadError({ state, onRetry }: LoadErrorProps) {
  return (
    <div className="at-error" role="alert">
      <i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
      {state.sessionExpired ? (
        <>
          <span>Your session has expired.</span>
          <Link to="/login?redirectPath=%2Fdashboard" className="at-btn">Log in again</Link>
        </>
      ) : (
        <>
          <span>{state.message}</span>
          <button type="button" className="at-btn" onClick={onRetry}>Try again</button>
        </>
      )}
    </div>
  );
}
