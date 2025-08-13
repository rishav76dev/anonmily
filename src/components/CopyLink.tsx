"use client";

export default function CopyLink({ slug }: { slug: string }) {
  const link = `https://anonmily.vercel.app/${slug}`;

  return (
    <div className="bg-card p-4 rounded-xl shadow-md border border-border mb-6 flex items-center justify-between gap-2">
      <span className="truncate text-sm">{link}</span>
      <button
        className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:opacity-90"
        onClick={() => {
          navigator.clipboard.writeText(link);
          alert("Profile link copied!");
        }}
      >
        Copy
      </button>
    </div>
  );
}
