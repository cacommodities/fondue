import { Link, useLocation } from "react-router";
import { getEnvVarOrDefault } from "../envVariablesAccess";
import { Popper } from "@cac/react-utils";
import { clsx } from "clsx";
import { ChevronDown, ExternalLink } from "lucide-react";
import { type ReactNode } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Flag } from "./Flag";

const navItems: NavItem[] = [
  {
    path: "/",
    label: "Home",
    icon: <Flag countryCode="DK" className="h-4 w-4" />,
  },
  {
    path: "test",
    label: "Test Page",
  },
  {
    path: "https://google.com",
    label: "External link",
    external: true,
  },
  { type: "separator" },
  {
    label: "Other",
    items: [
      { path: "help", label: "Help" },
      { type: "separator", label: "Separator with text" },
      { path: "help2", label: "Help 2" },
    ],
  },
];

interface NavLink {
  path: string;
  label: string;
  external?: boolean; // when true, render as external link with icon
  icon?: ReactNode; // optional icon/element displayed on the left
}

interface NavSeparator {
  type: "separator";
  label?: string; // optional text for dropdown separators
}

interface NavDropdown {
  label: string;
  icon?: ReactNode; // optional icon/element displayed on the left
  items: (NavLink | NavSeparator)[];
}

type NavItem = NavLink | NavDropdown | NavSeparator;

function isDropdown(item: NavItem): item is NavDropdown {
  return "items" in item;
}

function isSeparator(item: NavItem | NavSeparator): item is NavSeparator {
  return "type" in item && item.type === "separator";
}

function LinkRenderer({
  item,
  className,
  onClick,
}: {
  item: NavLink;
  className: string;
  onClick?: () => void;
}) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {item.label}
      {item.external ? <ExternalLink className="h-3 w-3" /> : null}
    </span>
  );

  if (item.external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.path} className={className} onClick={onClick}>
      {content}
    </Link>
  );
}

function NavLinkItem({ item }: { item: NavLink }) {
  const location = useLocation();
  const isActive =
    !item.external &&
    (item.path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.path));

  const className = clsx(
    "btn btn-ghost btn-xs h-6 min-h-6 rounded-md px-2 text-xs font-medium transition-all",
    isActive
      ? "btn-active bg-base-100 text-base-content shadow-sm"
      : "text-base-content/70 hover:bg-base-100/50 hover:text-base-content",
  );

  return <LinkRenderer item={item} className={className} />;
}

function NavDropdownItem({ item }: { item: NavDropdown }) {
  const location = useLocation();
  const hasActiveChild = item.items.some(
    (child) =>
      !isSeparator(child) &&
      !child.external &&
      location.pathname.startsWith(child.path),
  );

  return (
    <Popper
      placement={"bottom-start"}
      offset={[5, 0]}
      triggerEl={() => (
        <button
          type="button"
          className={clsx(
            "btn btn-ghost btn-xs h-6 min-h-6 rounded-md px-2 text-xs font-medium transition-all",
            hasActiveChild
              ? "btn-active bg-base-200 text-base-content shadow-sm"
              : "text-base-content/70 hover:bg-base-200/50 hover:text-base-content",
          )}
          aria-haspopup="menu"
          aria-expanded={hasActiveChild}
        >
          <span className="inline-flex items-center gap-1.5">
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.label}
          </span>
          <ChevronDown className="h-3 w-3" />
        </button>
      )}
      content={(close) => (
        <ul
          tabIndex={-1}
          className="menu menu-sm rounded-box bg-base-200 border-base-300 z-50 w-48 border-2 p-2 shadow-lg"
          role="menu"
        >
          {item.items.map((child, idx) => {
            if (isSeparator(child)) {
              return (
                <li
                  key={`separator-${idx}`}
                  className="disabled pointer-events-none"
                >
                  {child.label ? (
                    <div className="flex items-center gap-1.5 py-0.5">
                      <hr className="border-base-content/20 flex-1" />
                      <span className="text-base-content/50 text-[10px] uppercase">
                        {child.label}
                      </span>
                      <hr className="border-base-content/20 flex-1" />
                    </div>
                  ) : (
                    <hr className="border-base-content/20 my-0.5" />
                  )}
                </li>
              );
            }

            const isActive =
              !child.external && location.pathname.startsWith(child.path);
            const className = clsx(
              "text-xs",
              isActive
                ? "bg-base-300 text-base-content"
                : "text-base-content/70 hover:bg-base-300/50",
            );
            return (
              <li key={child.path}>
                <LinkRenderer
                  item={child}
                  className={className}
                  onClick={() => close()}
                />
              </li>
            );
          })}
        </ul>
      )}
    />
  );
}

export default function Navbar() {
  const version = getEnvVarOrDefault("APP_BUILD_VERSION", "DEV");

  return (
    <div className="bg-base-300 mx-auto flex h-[30px] w-full items-center justify-between gap-2 px-2 shadow-sm">
      <nav className="flex flex-1 items-center gap-1 overflow-x-auto overflow-y-visible">
        {navItems.map((item, index) => {
          if (isSeparator(item)) {
            return (
              <div
                key={`separator-${index}`}
                className="bg-base-content/20 h-4 w-px"
                aria-hidden="true"
              />
            );
          }

          return (
            <div key={isDropdown(item) ? `dropdown-${index}` : item.path}>
              {isDropdown(item) ? (
                <NavDropdownItem item={item} />
              ) : (
                <NavLinkItem item={item} />
              )}
            </div>
          );
        })}
      </nav>
      <div className="flex shrink-0 items-center justify-end gap-2">
        <span className="text-base-content/60 font-mono text-xs">
          {version}
        </span>
        <ThemeSwitch />
      </div>
    </div>
  );
}
