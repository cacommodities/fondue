import { Home, RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorViewProps {
  error: Error | null;
}

export default function ErrorView({ error }: ErrorViewProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.hash = "#/";
  };

  return (
    <div className="flex h-[calc(100vh-30px)] flex-col overflow-hidden px-4 py-8">
      <div className="max-w-8xl flex w-full flex-1 flex-col overflow-hidden">
        {/* Header Section - Fixed at Top */}
        <div className="mb-6 shrink-0 text-center">
          <AlertTriangle className="text-error mx-auto mb-4 h-16 w-16" />
          <h1 className="text-base-content mb-2 text-xl font-semibold">
            Something went wrong
          </h1>
          <p className="text-base-content/70 mb-4 text-sm">
            An unexpected error occurred. Please try refreshing the page or
            returning to the home page.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleReload}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </button>
            <button
              type="button"
              onClick={handleGoHome}
              className="btn btn-outline inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </button>
          </div>
        </div>

        {/* Error Details - Takes Up Remaining Space */}
        {error && (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden text-left">
            <div className="text-base-content/60 mb-2 shrink-0 text-sm font-medium">
              Error details
            </div>
            <pre className="bg-base-200 text-error h-full min-h-0 overflow-auto rounded p-3 font-mono text-xs">
              <span className="text-lg font-bold">{error.message}</span>
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
