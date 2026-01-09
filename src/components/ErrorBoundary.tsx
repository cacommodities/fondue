import { Component, type ReactNode } from "react";
import ErrorView from "../views/ErrorView";

interface Props {
  children: ReactNode;
  resetKey?: string; // When this changes, reset the error boundary
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error boundary when resetKey changes (e.g., route change)
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console or error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children;
  }
}
