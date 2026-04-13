import { prisma } from "@/lib/prisma";
import { createStaffMember, deleteStaffMember } from "@/app/actions";
import { Trash2, UserCircle2, Pencil } from "lucide-react";

export default async function StaffAdmin() {
  const staff = await prisma.staffMember.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Directorio y Staff</h1>
        <p className="text-stone-500 text-sm">Añadí o eliminá abogados del bloque público.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
          <h2 className="font-semibold text-stone-800 text-sm">Añadir nuevo perfil</h2>
        </div>
        <form action={createStaffMember} className="p-6 space-y-5">
          {/* Foto */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Foto de perfil
            </label>
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
                placeholder="Dr. Juan Pérez"
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
                Cargo / Rol
              </label>
              <input
                name="role"
                required
                placeholder="ABOGADO"
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
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
              rows={5}
              placeholder={"Egresado de la Facultad de Derecho (UBA)...\nDocente en la materia..."}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors resize-none"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="bg-[#cc0000] hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Guardar perfil
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800 text-sm">Perfiles activos</h2>
          <span className="bg-stone-200 text-stone-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {staff.length}
          </span>
        </div>

        {staff.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-stone-400">
            <UserCircle2 size={40} className="mb-3 text-stone-300" />
            <p className="text-sm font-medium">Ningún miembro registrado todavía</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {staff.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle2 size={22} className="text-stone-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate">{member.name}</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mt-0.5">{member.role}</p>
                  {member.cv.length > 0 && (
                    <p className="text-xs text-stone-400 mt-1 truncate">{member.cv[0]}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <a
                    href={`/admin/staff/${member.id}`}
                    title="Editar perfil"
                    className="p-2 text-stone-300 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-all"
                  >
                    <Pencil size={16} />
                  </a>
                  <form action={deleteStaffMember}>
                    <input type="hidden" name="id" value={member.id} />
                    <button
                      title="Eliminar perfil"
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
