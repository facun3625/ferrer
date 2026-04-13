import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function Page() {
  const dbStaff = await prisma.staffMember.findMany({ orderBy: { createdAt: 'asc' } });
  const dbPosts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 3 });
  
  return <HomeClient dbStaff={dbStaff} dbPosts={dbPosts} />;
}
