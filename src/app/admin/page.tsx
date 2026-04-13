import { prisma } from "@/lib/prisma";
import { Users, FileText, ChevronRight } from "lucide-react";

export default async function AdminDashboard() {
  const [staffCount, postCount] = await Promise.all([
    prisma.staffMember.count(),
    prisma.post.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Panel de Gestión</h1>
        <p className="text-stone-500 text-sm">
          Administrá el contenido público del sitio de Estudio Ferrer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Staff activo</p>
              <p className="text-4xl font-bold text-stone-900">{staffCount}</p>
            </div>
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-stone-500" />
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-3">Perfiles publicados en el sitio</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Noticias</p>
              <p className="text-4xl font-bold text-stone-900">{postCount}</p>
            </div>
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-stone-500" />
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-3">Artículos en el blog</p>
        </div>
      </div>

      {/* Quick access */}
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Acceso rápido</p>
      <div className="grid md:grid-cols-2 gap-3">
        <a
          href="/admin/staff"
          className="group flex items-center justify-between p-5 bg-white rounded-xl border border-stone-200 hover:border-[#cc0000] hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-red-50 group-hover:bg-[#cc0000] rounded-lg flex items-center justify-center transition-colors">
              <Users size={17} className="text-[#cc0000] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-stone-800 text-sm group-hover:text-[#cc0000] transition-colors">
                Directorio / Staff
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Perfiles, fotos y CV de abogados</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-stone-300 group-hover:text-[#cc0000] transition-colors" />
        </a>

        <a
          href="/admin/blog"
          className="group flex items-center justify-between p-5 bg-white rounded-xl border border-stone-200 hover:border-[#cc0000] hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-red-50 group-hover:bg-[#cc0000] rounded-lg flex items-center justify-center transition-colors">
              <FileText size={17} className="text-[#cc0000] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-stone-800 text-sm group-hover:text-[#cc0000] transition-colors">
                Noticias / Blog
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Publicá artículos e imágenes</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-stone-300 group-hover:text-[#cc0000] transition-colors" />
        </a>
      </div>
    </div>
  );
}
