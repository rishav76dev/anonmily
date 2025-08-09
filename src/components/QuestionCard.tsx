"use client";

import { useState } from "react";
import { Clock, Send, Share2, Trash2, MessageCircle } from "lucide-react";
import Link from "next/link";

interface QuestionCardProps {
  id: string;
  question: string;
  date: string;
  answer?: string;
  answeredAt?: string;
  isOwner?: boolean;
}

export function QuestionCard({
  id,
  question,
  date,
  answer,
  answeredAt,
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
    <div className="rounded-lg border shadow-sm p-4 bg-white dark:bg-muted space-y-3 relative">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#FEF3CD" }}
        >
          <MessageCircle className="w-8 h-8" />
        </div>

        <div className="flex-1">
          <span className="block text-base font-medium text-gray-800 dark:text-white">
            {question}
          </span>

          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {date}
            </div>

            {isAnswered ? (
              <Link
                href={`/answer/${id}`}
                className="cursor-pointer hover:underline text-purple-600 dark:text-purple-400 flex items-center gap-1"
              >
                Answered <Send className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href={`/answer/${id}`}
                className="cursor-pointer hover:underline text-blue-600 dark:text-blue-400 flex items-center gap-1"
              >
                Reply now <Send className="w-3 h-3" />
              </Link>
            )}
          </div>

          {isAnswered && (
            <>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <div className="right-0 text-base text-gray-800 dark:text-gray-200 text-right">
                <div className="font-normal mb-1">Answer:</div>
                <div>{answer}</div>
              </div>
            </>
          )}

          <div className="flex justify-end items-center gap-2 mt-4">
            <Link href={`/Share/${id}`}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </div>
            </Link>

            {isOwner && (
              <button
                onClick={handleDelete}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
