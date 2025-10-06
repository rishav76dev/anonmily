import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

interface UpdateProfileData {
  username: string;
  email: string;
  bio: string;
  slug: string;
  image?: File;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const formData = new FormData();
      formData.append("username", data.username.trim());
      formData.append("email", data.email.trim());
      formData.append("bio", data.bio.trim());
      formData.append("slug", data.slug);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      // Invalidate and refetch auth data
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      // Invalidate any cached user profile data
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      return data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        toast.error(`Update failed: ${errorMessage}`);
        console.error("Profile update error:", errorMessage);
      } else if (error instanceof Error) {
        toast.error(`Update failed: ${error.message}`);
        console.error("Profile update error:", error.message);
      } else {
        toast.error("An unknown error occurred");
        console.error("Unknown error:", error);
      }
      throw error;
    },
  });
}
