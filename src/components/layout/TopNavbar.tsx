export function TopNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 sticky top-0 z-10 w-full">
      <div className="md:hidden font-semibold text-lg text-gray-900">
        TonePilot
      </div>
      <div className="hidden md:block" />{" "}
      {/* Spacer for centered/right aligned content */}
      <div className="flex items-center gap-4">
        <div
          className="h-8 w-8 rounded-full bg-gray-200"
          title="User Profile"
        ></div>
      </div>
    </header>
  );
}
