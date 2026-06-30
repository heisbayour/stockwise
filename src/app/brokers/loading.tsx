// =============================================================
// STOCKWISE — Broker List Loading Skeleton
// File: src/app/brokers/loading.tsx
//
// Next.js automatically shows this while the page.tsx Server
// Component is fetching data — no manual loading state needed.
// =============================================================

export default function BrokersLoading() {
  // Render 6 fake pulsing cards while the real data loads
  const placeholders = Array.from({ length: 6 });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded-lg animate-pulse mt-3" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
        </div>

        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {placeholders.map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-full bg-gray-100 rounded mb-2" />
              <div className="h-4 w-2/3 bg-gray-100 rounded mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-8 bg-gray-100 rounded" />
                <div className="h-8 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
