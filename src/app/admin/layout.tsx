import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-stone-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-10 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
