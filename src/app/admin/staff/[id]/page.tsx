import { prisma } from "@/lib/prisma";
import { updateStaffMember } from "@/app/actions";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.staffMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-4">
        <a
          href="/admin/staff"
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al listado
        </a>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Editar perfil</h1>
        <p className="text-stone-500 text-sm">Modificá los datos del perfil de {member.name}.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
          <h2 className="font-semibold text-stone-800 text-sm">Datos del perfil</h2>
        </div>
        <form action={updateStaffMember} className="p-6 space-y-5">
          <input type="hidden" name="id" value={member.id} />
          <input type="hidden" name="existingPhoto" value={member.photo ?? ""} />

          {/* Foto actual + nueva */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Foto de perfil
            </label>
            {member.photo && (
              <div className="flex items-center gap-3 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt="Foto actual"
                  className="w-14 h-14 rounded-full object-cover border border-stone-200"
                />
                <p className="text-xs text-stone-400">Foto actual. Subí una nueva para reemplazarla.</p>
              </div>
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer border border-stone-200 rounded-lg p-1"
            />
          </div>

          {/* Nombre + Cargo */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
                Nombre completo
              </label>
              <input
                name="name"
                required
                defaultValue={member.name}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
                Cargo / Rol
              </label>
              <input
                name="role"
                required
                defaultValue={member.role}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
              />
            </div>
          </div>

          {/* CV */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Currículum / Trayectoria
            </label>
            <p className="text-xs text-stone-400">Usá Enter para separar párrafos.</p>
            <textarea
              name="cv"
              required
              rows={8}
              defaultValue={member.cv.join("\n")}
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
              href="/admin/staff"
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
