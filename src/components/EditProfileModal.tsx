"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/types";
import axios from "axios";

type Props = {
  user: User;
  onClose: () => void;
  onUpdate: (data: User) => void;
};

export default function EditProfileModal({ user, onClose, onUpdate }: Props) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    if (!email) {
      return;
    }
    formData.append("email", email);
    formData.append("bio", bio);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await axios.put("/api/profile", formData);

      onUpdate(res.data.user);
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.error || error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            {imageFile && (
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
