// =============================================================
// STOCKWISE — Settings Page
// File: src/app/dashboard/settings/page.tsx
// Route: /dashboard/settings
//
// Server Component that fetches current user data, then hands it
// to a client component form for editing.
// =============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/dashboard/SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      nin: true,
      ninSubmitted: true,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-600 mb-6">Manage your profile and account information.</p>

      <SettingsForm user={user} />
    </div>
  );
}
