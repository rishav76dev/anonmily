import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { slug },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: Prisma.UserUpdateInput = {};

    // Get form data
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (bio !== null) updateData.bio = bio;

    // Handle image upload if provided
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise<cloudinary.UploadApiResponse>(
          (resolve, reject) => {
            cloudinary.v2.uploader
              .upload_stream({ resource_type: "image" }, (error, result) => {
                if (error) reject(error);
                else if (result) resolve(result);
                else reject(new Error("Upload failed"));
              })
              .end(buffer);
          }
        );

        // If user had a previous Cloudinary image, delete it
        if (user.image && user.image.includes("cloudinary.com")) {
          try {
            // Extract public_id from the Cloudinary URL
            const urlParts = user.image.split("/");
            const publicIdWithExtension = urlParts[urlParts.length - 1];
            const publicId = publicIdWithExtension.split(".")[0];
            await cloudinary.v2.uploader.destroy(publicId);
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Don't fail the update if old image deletion fails
          }
        }

        updateData.image = result.secure_url;
      } catch (fileError) {
        console.error("Error uploading file:", fileError);
        return NextResponse.json(
          { error: "Failed to upload image file" },
          { status: 500 }
        );
      }
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Username or email already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
