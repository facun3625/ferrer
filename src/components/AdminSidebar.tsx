"use client";

import { usePathname } from "next/navigation";
import { Users, FileText, ArrowLeft, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/staff", icon: Users, label: "Administrar Staff", exact: false },
  { href: "/admin/blog", icon: FileText, label: "Noticias del Blog", exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-stone-950 text-white min-h-screen flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-stone-800">
        <div className="flex items-center gap-3 mb-0.5">
          <div className="w-8 h-8 bg-[#cc0000] rounded-md flex items-center justify-center shrink-0">
            <span className="text-white text-[11px] font-black tracking-tight">EF</span>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">Estudio Ferrer</span>
        </div>
        <p className="text-[10px] text-stone-600 uppercase tracking-widest mt-1 ml-11">Panel de Gestión</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-600 px-3 pt-2 pb-1">Menú</p>
        {navItems.map(({ href, icon: Icon, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#cc0000] text-white shadow-sm"
                  : "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
              }`}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-stone-500"} />
              {label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-stone-800 space-y-1">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:bg-stone-800 hover:text-stone-200 transition-all duration-150"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:bg-stone-800 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
