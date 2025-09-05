import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const bio = formData.get("bio") as string | null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

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

      imageUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let slug: string = "";
    let isUnique = false;
    while (!isUnique) {
      slug =
        username.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        Math.random().toString(36).substring(2, 6);
      const existing = await prisma.user.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        bio,
        image: imageUrl,
        slug,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
