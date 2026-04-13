"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { writeFileSync } from "fs";
import { join } from "path";

export async function loginAction(formData: FormData) {
  const user = formData.get("user") as string;
  const pass = formData.get("pass") as string;

  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", process.env.SESSION_SECRET!, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
    redirect("/admin");
  }

  redirect("/login?error=1");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}

async function saveFile(file: File | null) {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
  const filepath = join(process.cwd(), "public/uploads", filename);
  writeFileSync(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function createStaffMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const cvText = formData.get("cv") as string;
  const cv = cvText.split("\n").filter(line => line.trim() !== "");
  
  const photo = await saveFile(formData.get("photo") as File | null);
  
  await prisma.staffMember.create({
    data: { name, role, cv, photo }
  });
  
  revalidatePath("/");
  revalidatePath("/admin/staff");
}

export async function deleteStaffMember(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.staffMember.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/staff");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  
  const photo = await saveFile(formData.get("photo") as File | null);
  
  await prisma.post.create({
    data: { title, excerpt, photo }
  });
  
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function updateStaffMember(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const cvText = formData.get("cv") as string;
  const cv = cvText.split("\n").filter(line => line.trim() !== "");

  const newPhoto = await saveFile(formData.get("photo") as File | null);
  const existingPhoto = formData.get("existingPhoto") as string | null;
  const photo = newPhoto ?? (existingPhoto || null);

  await prisma.staffMember.update({
    where: { id },
    data: { name, role, cv, photo },
  });

  revalidatePath("/");
  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;

  const newPhoto = await saveFile(formData.get("photo") as File | null);
  const existingPhoto = formData.get("existingPhoto") as string | null;
  const photo = newPhoto ?? (existingPhoto || null);

  await prisma.post.update({
    where: { id },
    data: { title, excerpt, photo },
  });

  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
