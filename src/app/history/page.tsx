import { EmptyState } from "@/components/shared/EmptyState";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function HistoryPage() {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">History</h1>
              <p className="text-gray-500 mt-2">
                Review your past communication analyses and chosen strategies.
              </p>
            </div>

            <EmptyState
              title="No history yet"
              description="You haven't generated any analyses yet. Head over to the New Analysis page to get started."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
