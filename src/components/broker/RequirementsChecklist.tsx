// =============================================================
// STOCKWISE — Requirements Checklist
// File: src/components/broker/RequirementsChecklist.tsx
//
// Shows the documents/info needed to open an account with a broker.
// Purely presentational — receives data as a prop.
// =============================================================

import { BrokerRequirement } from "@prisma/client";

interface RequirementsChecklistProps {
  requirements: BrokerRequirement[];
}

export default function RequirementsChecklist({ requirements }: RequirementsChecklistProps) {
  if (requirements.length === 0) {
    return <p className="text-sm text-gray-500">No requirements listed yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {requirements.map((req) => (
        <li key={req.id} className="flex items-start gap-3">
          {/* Checkbox-style icon — required items are filled, optional are outlined */}
          <span
            className={`mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center ${
              req.isRequired ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <div>
            <p className="text-sm text-gray-900">
              {req.item}
              {!req.isRequired && <span className="text-xs text-gray-400 ml-1.5">(Optional)</span>}
            </p>
            {req.note && <p className="text-xs text-gray-500 mt-0.5">{req.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
