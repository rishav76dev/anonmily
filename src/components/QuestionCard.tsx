"use client";

import { useState } from "react";
import { Clock, Send, Share2, Trash2, MessageCircle } from "lucide-react";
import Link from "next/link";

interface QuestionCardProps {
  id: string;
  question: string;
  date: string;
  answer?: string| null;
  answeredAt?: string;
  isOwner?: boolean;
 className?: string;

}

export function QuestionCard({
  id,
  question,
  date,
  answer,
  isOwner,
}: QuestionCardProps) {
  const [visible, setVisible] = useState(true);

  // ✅ FIX: check if answer is truly non-empty
  const isAnswered = !!answer && answer.trim().length > 0;

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVisible(false);
      } else {
        console.error("Delete failed:", await res.text());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="rounded-2xl border border-gray-200 shadow-md p-5 bg-white space-y-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100">
          <MessageCircle className="w-6 h-6 text-purple-600" />
        </div>

        {/* Question Content */}
        <div className="flex-1">
          {/* Top row: Question + Actions */}
          <div className="flex justify-between items-start">
            <span className="block text-lg font-semibold text-gray-800">
              {question}
            </span>

            <div className="flex items-center gap-3">
              <Link href={`/share/${id}`}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </div>
              </Link>

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {date}
            </div>

            {isAnswered ? (
              <Link
                href={`/answer/${id}`}
                className="cursor-pointer font-medium text-green-600 hover:underline flex items-center gap-1"
              >
                Answered <Send className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/answer/${id}`}
                className="cursor-pointer font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                Reply now <Send className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Answer Section */}
          {isAnswered && (
            <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
              <div className="text-green-700 font-medium mb-1">Answer:</div>
              <div className="text-gray-800">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
