// =============================================================
// STOCKWISE — Settings Form
// File: src/components/dashboard/SettingsForm.tsx
//
// Handles profile field updates. Password change is a separate
// concern (security-sensitive) so it's a second form below.
// =============================================================

"use client";

import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface SettingsFormProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
    nin: string | null;
    ninSubmitted: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
}

export default function SettingsForm({ user }: SettingsFormProps) {
  // Profile fields
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [nin, setNin] = useState(user.nin ?? "");

  // Password fields — kept separate from profile state intentionally
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setProfileMessage("");
    setIsSavingProfile(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, nin }),
      });

      const data = await response.json();
      setProfileMessage(response.ok ? "Profile updated successfully" : data.error || "Update failed");
    } catch {
      setProfileMessage("Network error. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordMessage("");
    setIsSavingPassword(true);

    try {
      const response = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setPasswordMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setPasswordMessage(data.error || "Password update failed");
      }
    } catch {
      setPasswordMessage("Network error. Please try again.");
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <div className="space-y-8 max-w-xl">
      {/* Profile section */}
      <form onSubmit={handleProfileSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Profile Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
          <Input label="Email address" value={user.email} disabled className="bg-gray-50 text-gray-500" />
          <div className="mt-1.5">
            {user.emailVerified ? <Badge color="green">Verified</Badge> : <Badge color="amber">Unverified</Badge>}
          </div>
        </div>

        <Input
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08012345678"
        />

        <Input
          label="NIN (National Identification Number)"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          placeholder="Enter your NIN"
          hint={
            user.ninSubmitted
              ? "Submitted — verification typically completes within 24 hours"
              : "Stored securely. Not yet verified."
          }
        />

        {profileMessage && (
          <p className={`text-sm ${profileMessage.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
            {profileMessage}
          </p>
        )}

        <Button type="submit" disabled={isSavingProfile}>
          {isSavingProfile ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      {/* Password section */}
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Change Password</h2>

        <Input
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          hint="At least 8 characters, 1 uppercase letter, 1 number"
        />

        {passwordMessage && (
          <p className={`text-sm ${passwordMessage.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
            {passwordMessage}
          </p>
        )}

        <Button type="submit" variant="outline" disabled={isSavingPassword}>
          {isSavingPassword ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
