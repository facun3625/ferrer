import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Header */}
      <header className="bg-stone-900 py-16 px-6 text-center">
        <p className="text-[#cc0000] text-xs tracking-[0.3em] uppercase font-semibold mb-4">Estudio Jurídico Ferrer</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide">Blog y Noticias</h1>
        <p className="text-stone-400 text-sm mt-4 max-w-md mx-auto font-light">
          Artículos e información jurídica de interés para nuestros clientes.
        </p>
        <div className="mt-8">
          <Link
            href="/#blog"
            className="text-stone-400 hover:text-white text-xs tracking-widest uppercase transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Posts grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 text-lg font-light">No hay artículos publicados todavía.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const dateStr = post.createdAt.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
              }).split(" ");
              const day = dateStr[0] || "01";
              const shortMonth = (dateStr[1] || "Ene").substring(0, 3).toUpperCase();

              return (
                <article key={post.id} className="group flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden bg-stone-200">
                    <Image
                      src={post.photo || "/img.png"}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="bg-[#cc0000] relative flex flex-col p-8 pt-10 flex-1">
                    {/* Date badge */}
                    <div className="absolute -top-7 left-0 bg-white border border-[#cc0000] w-12 h-14 flex flex-col justify-center items-center text-[#cc0000]">
                      <span className="font-bold leading-none text-lg">{day}</span>
                      <span className="text-[11px] leading-tight capitalize">{shortMonth}</span>
                    </div>

                    <h2 className="text-white font-serif text-lg leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-white/70 text-sm font-light leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
