// app/answer/[id]/page.tsx
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/utils";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { MessageCircle, Clock } from "lucide-react";
import AnswerForm from "@/components/AnswerForm";

export default async function AnswerPage(props: { params: { id: string } }) {
  const { id } = await Promise.resolve(props.params);
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
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-2xl shadow-lg">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-black border border-gray-300 rounded-xl p-3">
            <h4 className="text-white text-lg font-semibold flex items-center gap-2">
              <MessageCircle size={20} />
              Answer Message
            </h4>
          </div>

          <hr className="border-gray-300" />

          {/* Message */}
          <div className="bg-gray-50 border border-gray-300 p-4 rounded-xl">
            <div className="flex gap-4">
              <div className="relative text-black">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1 text-sm text-black">
                <p className="mb-2">{message.question}</p>
                <div className="flex justify-between text-gray-600 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    className="text-black hover:underline"
                    title="Unanswered"
                  >
                    {message.answer ? "Answered" : "Unanswered"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* answer sectio */}

          {message.answer ? (
            <div className="bg-green-50 border border-green-300 p-4 rounded-xl">
              <h5 className="font-semibold mb-2 text-green-800">
                Already Answered
              </h5>
              <p className="text-sm text-gray-800">{message.answer}</p>
            </div>
          ) : (
            <AnswerForm id={message.id.toString()} />
          )}
        </div>
      </div>
    </div>
  );
}
