import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client"; // ⬅️ Import types here
import { NextRequest, NextResponse } from "next/server";

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

    const updateData: Prisma.UserUpdateInput = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
    };

    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      updateData.image = `/uploads/${imageFile.name}`;
    }

    const updatedUser = await prisma.user.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
