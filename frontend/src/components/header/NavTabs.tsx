"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Meus veículos" },
  { href: "/profile", label: "Perfil" },
];

function isTabActive(href: string, pathname: string) {
  return href === "/"
    ? pathname === "/" || pathname.startsWith("/vehicles")
    : pathname.startsWith(href);
}

export function NavTabs() {
  return (
    <Suspense fallback={<TabList />}>
      <ActiveTabList />
    </Suspense>
  );
}

function ActiveTabList() {
  return <TabList pathname={usePathname()} />;
}

function TabList({ pathname }: { pathname?: string }) {
  return (
    <nav className="flex w-full items-center gap-1 rounded-xl bg-surface p-1 md:w-auto">
      {tabs.map((tab) => {
        const isActive =
          pathname !== undefined && isTabActive(tab.href, pathname);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 rounded-lg px-4 py-1.5 text-center text-callout whitespace-nowrap transition md:flex-none ${
              isActive
                ? "bg-surface-3 text-label"
                : "text-label-secondary hover:text-label"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
