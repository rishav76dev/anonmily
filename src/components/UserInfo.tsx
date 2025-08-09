type User = {
  username: string;
  image?: string | null;
  bio?: string | null;
};

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-4 mb-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
      {user.image && (
        <img
          src={user.image}
          alt={user.username}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
        />
      )}
      <h1 className="text-5xl font-extrabold text-center">
        Welcome Back{" "}
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </span>
      </h1>
      {user.bio && (
        <p className="text-gray-300 text-center max-w-md italic">{user.bio}</p>
      )}
    </div>
  );
}
