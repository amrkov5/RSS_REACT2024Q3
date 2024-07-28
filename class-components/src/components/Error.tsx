import { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types';
import '../index.css';
import '../App.css';

function reload() {
  window.location.reload();
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
    this.retry = this.retry.bind(this);
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  retry() {
    const { fetchErrorFn } = this.props;
    this.setState({ error: false });
    fetchErrorFn();
  }

  render(): ReactNode {
    const { error } = this.state;
    const { msg, children, fetchError, appError, theme } = this.props;
    if (error) {
      return (
        <div className="error-wrapper" data-theme={theme}>
          <h2>{msg}</h2>
          {fetchError && (
            <button
              onClick={this.retry}
              className="try-again-btn"
              type="button"
            >
              Try Again
            </button>
          )}
          {appError && (
            <button onClick={reload} className="try-again-btn" type="button">
              Try Again
            </button>
          )}
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
