'use client';

import {
  MessageCircle,
  MessagesSquare,
  Reply,
  Clock,
  Info,
  Send,
} from 'lucide-react';
import React, { useState } from 'react';

export default function AnswerPage() {
  const [charCount, setCharCount] = useState(0);

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-2xl shadow-lg">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-black border border-gray-300 rounded-xl p-3">
            <h4 className="text-white text-lg font-semibold flex items-center gap-2 text-cen">
              <MessageCircle size={20} />
              Answer Message
            </h4>
          </div>

          {/* Info Row */}
          {/* <div className="flex justify-between items-center text-sm font-medium text-gray-600">
            <span className="flex items-center gap-2 text-black">
              <MessagesSquare size={16} />
              Answer Message
            </span>
            <div className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 border border-gray-300">
              <Reply size={12} />
              Reply
            </div>
          </div> */}

          <hr className="border-gray-300" />

          {/* Message */}
          <div className="bg-gray-50 border border-gray-300 p-4 rounded-xl">
            <div className="flex gap-4">
              <div className="relative text-black">
                <MessageCircle size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex-1 text-sm text-black">
                <p className="mb-2">fghrthnfrfgju</p>
                <div className="flex justify-between text-gray-600 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    7 days ago
                  </div>
                  <button className="text-black hover:underline" title="Unanswered">
                    Unanswered
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="text-black text-sm font-semibold">
              Send your response to the anonymous sender
            </div>
            <div className="relative">
              <textarea
                name="answer"
                placeholder="Reply with your thoughts..."
                maxLength={500}
                rows={4}
                onChange={(e) => setCharCount(e.target.value.length)}
                className="w-full bg-white text-black border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-600 select-none">
                {charCount}/500
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Info size={14} />
                Visible publicly once answered.
              </div>
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                Send Reply
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
