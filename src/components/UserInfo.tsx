import Image from "next/image";

type User = {
  username: string;
  image?: string | null;
  bio?: string | null;
};

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-4 mb-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 transition-colors">
      {user.image && (
        <Image
          src={user.image}
          alt={user.username}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
        />
      )}

      {/* Greeting */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100">
        Welcome Back Anon
      </h1>

      {/* Username line */}
      <h2 className="text-3xl font-semibold text-center mt-2 text-gray-800 dark:text-gray-200">
        I am{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </span>
      </h2>

      {/* Bio */}
      {user.bio && (
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md italic">
          {user.bio}
        </p>
      )}
    </div>
  );
}
