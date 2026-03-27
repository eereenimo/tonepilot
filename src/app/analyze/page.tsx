import { mockResponsePayload } from "@/lib/mock-data";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function AnalyzePage() {
  const options = mockResponsePayload.options;

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
              <p className="text-gray-500 mt-2">
                Paste your text or describe the situation to get AI-powered communication strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Placeholder */}
              <div className="lg:col-span-1 border rounded-lg p-6 bg-white shadow-sm space-y-4">
                <h2 className="font-semibold text-lg border-b pb-2">
                  Analysis Input (Placeholder)
                </h2>
                <div className="space-y-2">
                  <div className="h-24 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500">
                    [ Text Area Placeholder ]
                  </div>
                  <div className="h-10 bg-gray-100 rounded justify-center items-center flex text-sm text-gray-500 border border-dashed border-gray-300">
                    [ Generate Button Placeholder ]
                  </div>
                </div>
              </div>

              {/* Results Placeholder */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-semibold text-lg border-b pb-2">
                  Results (Mocked)
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-2 ${
                        option.recommended
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold capitalize">
                            {option.tone}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            Risk: {option.riskLevel}
                          </span>
                        </div>
                        {option.recommended && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-gray-800 text-sm italic">
                        "{option.responseText}"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {option.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
