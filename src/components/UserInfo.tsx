"use client"
import { useState } from "react";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { User } from "@/lib/types"
import Link from "next/link";

type UserInfoProps = {
  user: User;
  isOwner: boolean;
};

export function UserInfo({ user, isOwner }: UserInfoProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 transition-colors">
        {currentUser.image && (
          <Image
            src={currentUser.image}
            alt={currentUser.username}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
          />
        )}

        <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100">
          Welcome Back Anon
        </h1>

        <h2 className="text-3xl font-semibold text-center mt-2 text-gray-800 dark:text-gray-200">
          I am{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {currentUser.username.charAt(0).toUpperCase() +
              currentUser.username.slice(1)}
          </span>
        </h2>

        {currentUser.bio && (
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md italic">
            {currentUser.bio}
          </p>
        )}

        {/* edit button for owner*/}
        {isOwner && (
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Edit Profile
            </button>

            <Link href="/message">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                See All Questions
              </button>
            </Link>
          </div>
        )}
      </div>

      {showModal && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedUser) => setCurrentUser(updatedUser)}
        />
      )}
    </>
  );
}
