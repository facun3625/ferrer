import { prisma } from "@/lib/prisma";
import { createPost, deletePost } from "@/app/actions";
import { Trash2, Newspaper, ImageIcon, Pencil } from "lucide-react";

export default async function BlogAdmin() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Noticias y Blog</h1>
        <p className="text-stone-500 text-sm">Publicá información jurídica de interés en el Home.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
          <h2 className="font-semibold text-stone-800 text-sm">Publicar nueva noticia</h2>
        </div>
        <form action={createPost} className="p-6 space-y-5">
          {/* Imagen */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Imagen de portada
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer border border-stone-200 rounded-lg p-1"
            />
          </div>

          {/* Título */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Titular del artículo
            </label>
            <input
              name="title"
              required
              placeholder="Ej: Nuevas Reformas del Código Civil"
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
            />
          </div>

          {/* Bajada */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Bajada / Resumen breve
            </label>
            <textarea
              name="excerpt"
              required
              rows={3}
              placeholder="Un breve adelanto del artículo..."
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors resize-none"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="bg-[#cc0000] hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Publicar noticia
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800 text-sm">Noticias publicadas</h2>
          <span className="bg-stone-200 text-stone-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {posts.length}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-stone-400">
            <Newspaper size={40} className="mb-3 text-stone-300" />
            <p className="text-sm font-medium">Ninguna noticia publicada todavía</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {posts.map((post: (typeof posts)[number]) => (
              <li
                key={post.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  {post.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.photo}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={20} className="text-stone-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate">{post.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                  <p className="text-[11px] text-stone-300 uppercase tracking-wide mt-1">
                    {post.createdAt.toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <a
                    href={`/admin/blog/${post.id}`}
                    title="Editar noticia"
                    className="p-2 text-stone-300 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-all"
                  >
                    <Pencil size={16} />
                  </a>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      title="Eliminar noticia"
                      className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
