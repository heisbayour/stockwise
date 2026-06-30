// =============================================================
// STOCKWISE — Markdown Renderer
// File: src/components/education/MarkdownRenderer.tsx
//
// Converts the Markdown stored in Article.content into styled HTML.
// Uses react-markdown + remark-gfm (for tables, etc.) — both already
// installed in earlier setup steps.
// =============================================================

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-emerald max-w-none prose-headings:font-semibold prose-a:text-emerald-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
