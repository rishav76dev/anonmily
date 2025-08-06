"use client";

import { useState } from "react";
import { Clock, Send, Share2, Ban, Trash2, X } from "lucide-react";
import Link from "next/link";

interface QuestionCardProps {
  question: string;
  date: string;
  onClose?: () => void;
  id: string;
}

export function QuestionCard({ question, date, onClose, id}: QuestionCardProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="rounded-lg border shadow-sm p-4 bg-white dark:bg-muted space-y-3">
      <div className="flex items-start gap-4">
        {/* Icon bubble */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#FEF3CD" }}
        >
          <i className="fa fa-comment text-yellow-700 text-sm"></i>
        </div>

        {/* Content */}
        <div className="flex-1">
          <span className="block text-base font-medium text-gray-800 dark:text-white">
            {question}
          </span>

          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {date}
            </div>
            <Link
              href={`/Answer/${id}`}
              className="cursor-pointer hover:underline text-purple-600 dark:text-purple-400 flex items-center gap-1"
            >
              Answered <Send className="w-3 h-3" />
            </Link>
          </div>

          <hr className="my-2 border-gray-300 dark:border-gray-700" />

          {/* Actions */}
          <div className="flex justify-end items-center gap-2">
            <Link href="/Share/51696746">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E6D4E9", color: "#816B82" }}
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </div>
            </Link>

            <button
              onClick={() => alert("Blocked")}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FEF3CD", color: "#856417" }}
              title="Block Sender"
            >
              <Ban className="w-4 h-4" />
            </button>

            <button
              onClick={() => setVisible(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#F8D7DA", color: "#D95C5C" }}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Close button (optional X) */}
      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
