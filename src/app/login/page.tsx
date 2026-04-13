import { loginAction } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#cc0000] rounded-xl mb-5">
            <span className="text-white font-black text-lg tracking-tight">EF</span>
          </div>
          <h1 className="text-white text-xl font-bold tracking-widest uppercase">Estudio Ferrer</h1>
          <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">Panel de Gestión</p>
        </div>

        {/* Card */}
        <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8">
          <h2 className="text-stone-200 font-semibold text-sm mb-6">Iniciar sesión</h2>

          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-lg px-4 py-3 mb-5">
              <p className="text-red-400 text-xs font-medium">Usuario o contraseña incorrectos.</p>
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
                Usuario
              </label>
              <input
                name="user"
                type="text"
                required
                autoComplete="username"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
                Contraseña
              </label>
              <input
                name="pass"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#cc0000] hover:bg-red-800 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mt-2"
            >
              Ingresar
            </button>
          </form>
        </div>

        <p className="text-center text-stone-700 text-xs mt-6">
          <a href="/" className="hover:text-stone-400 transition-colors">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}
