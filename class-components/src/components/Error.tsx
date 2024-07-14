import { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types';

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
    const { tryAgain } = this.props;
    if (tryAgain) {
      tryAgain(false);
    }
    this.setState({ error: false });
  }

  render(): ReactNode {
    const { error } = this.state;
    const { msg, children, tryAgain } = this.props;
    if (error) {
      return (
        <div className="error-wrapper">
          <h2>{msg}</h2>
          {tryAgain && (
            <button
              onClick={this.retry}
              className="try-again-btn"
              type="button"
            >
              Try Again
            </button>
          )}
          {!tryAgain && (
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
