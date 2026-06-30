// =============================================================
// STOCKWISE — Broker Review Form
// File: src/components/broker/BrokerReviewForm.tsx
//
// Lets a logged-in user submit a review. Calls the reviews API route.
// =============================================================

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import StarRating from "@/components/ui/StarRating";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface BrokerReviewFormProps {
  brokerId: string;
  isLoggedIn: boolean;
}

export default function BrokerReviewForm({ brokerId, isLoggedIn }: BrokerReviewFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // If not logged in, prompt them to log in instead of showing the form
  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <a href="/auth/login" className="text-emerald-600 font-medium hover:underline">
          Log in
        </a>{" "}
        to leave a review for this broker.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-lg p-4 text-sm text-emerald-700">
        Thanks for your review! It will appear once approved.
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/brokers/${brokerId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, title, body }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit review");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      router.refresh(); // re-fetch the page data to show the new review
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
        <StarRating rating={rating} onChange={setRating} size="lg" />
      </div>

      <Input
        label="Title (optional)"
        placeholder="Summarize your experience"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Review (optional)</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Share details about opening your account, fees, customer service..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
