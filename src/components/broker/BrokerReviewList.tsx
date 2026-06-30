// =============================================================
// STOCKWISE — Broker Review List
// File: src/components/broker/BrokerReviewList.tsx
//
// Displays existing reviews for a broker. Purely presentational.
// =============================================================

import { Review, User } from "@prisma/client";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatters";

type ReviewWithUser = Review & { user: Pick<User, "firstName" | "lastName"> };

interface BrokerReviewListProps {
  reviews: ReviewWithUser[];
}

export default function BrokerReviewList({ reviews }: BrokerReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-6 text-center">
        No reviews yet. Be the first to share your experience.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {review.user.firstName} {review.user.lastName?.[0]}.
              </p>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                {review.isVerified && <Badge color="green">Verified Customer</Badge>}
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
          </div>

          {review.title && <p className="mt-3 font-medium text-sm text-gray-900">{review.title}</p>}
          {review.body && <p className="mt-1 text-sm text-gray-600">{review.body}</p>}
        </div>
      ))}
    </div>
  );
}
