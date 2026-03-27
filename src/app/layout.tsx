import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full bg-gray-50">
          {/* Sidebar Placeholder */}
          <aside className="w-64 flex-shrink-0 border-r bg-white hidden md:block">
            <div className="flex h-16 items-center border-b px-6">
              <span className="font-semibold text-lg">TonePilot</span>
            </div>
            <nav className="p-4 space-y-2">
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm font-medium">
                New Analysis
              </div>
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-600">
                History
              </div>
            </nav>
          </aside>

          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Top Navbar Placeholder */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-6">
              <div className="md:hidden font-semibold text-lg">TonePilot</div>
              <div className="hidden md:block" /> {/* Spacer */}
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
