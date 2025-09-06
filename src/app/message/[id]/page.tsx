import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/utils";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { MessageCircle, Clock } from "lucide-react";
import AnswerForm from "@/components/AnswerForm";

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const messageId = parseInt(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = getUserFromToken(token);

  if (!user) return notFound();

  if (isNaN(messageId)) {
    return notFound();
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message || message.userId !== user.userId) {
    return notFound();
  }

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-6">
          {/* Header */}
          <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <MessageCircle size={24} className="text-indigo-600 dark:text-indigo-400" />
            Answer Message
          </h4>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-5 rounded-xl shadow-sm">
            <p className="text-lg text-gray-800 dark:text-gray-100 mb-3">{message.question}</p>
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(message.createdAt).toLocaleDateString()}
              </div>
              <span
                className={`font-medium ${
                  message.answer
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {message.answer ? "Answered" : "Unanswered"}
              </span>
            </div>
          </div>

          {/* Answer Section */}
          {message.answer ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-5 rounded-xl shadow-sm">
              <h5 className="text-green-700 dark:text-green-400 font-semibold mb-2 flex items-center gap-2">
                ✅ Already Answered
              </h5>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">{message.answer}</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm">
              <AnswerForm id={message.id.toString()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
