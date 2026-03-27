"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "New Analysis", href: "/analyze" },
    { name: "History", href: "/history" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-white hidden md:block h-full">
      <div className="flex h-16 items-center border-b px-6">
        <span className="font-semibold text-lg text-gray-900">TonePilot</span>
      </div>
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block p-2 rounded text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
