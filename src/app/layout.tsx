import type { Metadata } from 'next';
import './globals.css';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';

export const metadata: Metadata = {
  title: 'TonePilot | AI Messaging Copilot',
  description: 'Elevate your messaging with AI-driven tone intelligence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full overflow-hidden bg-[var(--surface)] text-[var(--text-primary)]">
        <div className="flex h-screen w-full relative">
          {/* ── Ambient Background Decoration ── */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-purple-400/8 blur-[140px]" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-400/8 blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          {/* ── Global Navigation ── */}
          <AppSidebar />

          {/* ── Main Workspace ── */}
          <div className="relative z-10 flex flex-1 flex-col min-w-0 overflow-hidden">
            <TopNavbar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
              <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10 min-h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
