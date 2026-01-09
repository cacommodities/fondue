import { initializeTheme } from "./theme";
initializeTheme();

import { createRoot } from "react-dom/client";
import "./index.css";
import "./theme"; // Initialize theme on app startup
import { createHashRouter, Outlet, useLocation } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/NotFoundView";
import Navbar from "./components/Navbar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { initExtraRootContainers } from "@cac/react-utils";
import TestView from "./views/TestView";
initExtraRootContainers();

function ErrorBoundaryWrapper() {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname}>
      <Outlet />
    </ErrorBoundary>
  );
}

export function BaseView() {
  return (
    <>
      <Navbar />
      <ErrorBoundaryWrapper />
    </>
  );
}

// For full page view
// export function BaseView() {
//   return (
//     <div className="flex h-screen flex-col">
//       <div>
//         <Navbar />
//       </div>
//       <div className="flex-1 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

const router = createHashRouter([
  {
    Component: BaseView,
    children: [
      {
        path: "/",
        Component: HomeView,
      },
      {
        path: "test",
        Component: TestView,
      },
      {
        path: "*",
        Component: NotFoundView,
      },
    ],
  },
]);

const root = document.getElementById("root");
createRoot(root!).render(<RouterProvider router={router} />);
