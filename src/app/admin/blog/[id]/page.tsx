import { prisma } from "@/lib/prisma";
import { updatePost } from "@/app/actions";
import { notFound } from "next/navigation";
import { ArrowLeft, ImageIcon } from "lucide-react";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-4">
        <a
          href="/admin/blog"
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al listado
        </a>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Editar noticia</h1>
        <p className="text-stone-500 text-sm">Modificá los datos de la noticia.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
          <h2 className="font-semibold text-stone-800 text-sm">Contenido de la noticia</h2>
        </div>
        <form action={updatePost} className="p-6 space-y-5">
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="existingPhoto" value={post.photo ?? ""} />

          {/* Imagen */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Imagen de portada
            </label>
            {post.photo ? (
              <div className="flex items-center gap-3 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.photo}
                  alt="Imagen actual"
                  className="w-20 h-14 rounded-lg object-cover border border-stone-200"
                />
                <p className="text-xs text-stone-400">Imagen actual. Subí una nueva para reemplazarla.</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-2">
                <div className="w-20 h-14 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center">
                  <ImageIcon size={18} className="text-stone-300" />
                </div>
                <p className="text-xs text-stone-400">Sin imagen. Podés subir una ahora.</p>
              </div>
            )}
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
              defaultValue={post.title}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
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
              rows={4}
              defaultValue={post.excerpt}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="bg-[#cc0000] hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Guardar cambios
            </button>
            <a
              href="/admin/blog"
              className="text-sm text-stone-500 hover:text-stone-800 transition-colors px-4 py-2.5"
            >
              Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
