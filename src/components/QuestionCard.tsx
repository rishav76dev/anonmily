"use client";

import { useState } from "react";
import { Clock, Send, Share2, Trash2, MessageCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface QuestionCardProps {
  id: string;
  question: string;
  date: string;
  answer?: string | null;
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
  className,
}: QuestionCardProps) {
  const [visible, setVisible] = useState(true);
  const isAnswered = !!answer && answer.trim().length > 0;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/messages/delete/${id}`);
      setVisible(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Delete failed:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", (err as Error).message);
      }
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-5 bg-white dark:bg-gray-800 space-y-4 ${className}`}
    >
      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900">
          <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>


        <div className="flex-1">

          <div className="flex justify-between items-start">
            <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
              {question}
            </span>

            <div className="flex items-center gap-3">
              <Link href={`/share/${id}`}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800 transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </div>
              </Link>

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {date}
            </div>

            {isAnswered ? (
              <Link
                href={`/message/${id}`}
                className="cursor-pointer font-medium text-green-600 hover:underline dark:text-green-400 flex items-center gap-1"
              >
                Answered <Send className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/message/${id}`}
                className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
              >
                Reply now <Send className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* answer section */}
          {isAnswered && (
            <div className="mt-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 p-4 rounded-xl shadow-sm">
              <div className="text-green-700 dark:text-green-300 font-medium mb-1">
                Answer:
              </div>
              <div className="text-gray-800 dark:text-gray-100">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
