// =============================================================
// STOCKWISE — Dashboard Layout
// File: src/app/dashboard/layout.tsx
//
// Wraps every page inside /dashboard/* with the sidebar.
// The actual login-required protection happens in src/middleware.ts —
// this layout just handles the visual structure.
// =============================================================

import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </main>
  );
}
