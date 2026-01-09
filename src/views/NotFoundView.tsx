import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="flex min-h-[calc(100vh-30px)] flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-base-content/20 text-9xl font-bold">404</h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-base-content mb-4 text-2xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-base-content/70">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline inline-flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
