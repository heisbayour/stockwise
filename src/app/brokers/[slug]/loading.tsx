// =============================================================
// STOCKWISE — Broker Detail Loading Skeleton
// File: src/app/brokers/[slug]/loading.tsx
// =============================================================

export default function BrokerDetailLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="pb-8 border-b border-gray-100">
        <div className="h-9 w-72 bg-gray-200 rounded-lg" />
        <div className="h-5 w-40 bg-gray-100 rounded-lg mt-3" />
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 rounded" />
          <div className="h-4 w-4/6 bg-gray-100 rounded" />
        </div>
        <div className="h-64 bg-gray-50 rounded-xl" />
      </div>
    </main>
  );
}
