"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Phone, Mail, Scale, Users, Briefcase, Globe, Leaf, Gavel, X } from "lucide-react";

export default function HomeClient({ dbStaff, dbPosts }: { dbStaff: any[], dbPosts: any[] }) {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedStaff(null);
      setIsClosing(false);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Top Header */}
      <div className="absolute top-0 w-full bg-[#cc0000] z-50 text-white/90 py-2 hidden md:block border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center text-[10px] font-sans tracking-[0.15em] font-medium uppercase">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Phone size={12} /> (+54 342) 459 7619</span>
            <span className="flex items-center gap-2"><Mail size={12} /> contacto@estudiojuridicoferrer.com.ar</span>
          </div>
          <a href="/admin" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1">
            Acceder
          </a>
        </div>
      </div>

      {/* Navbar Overlay */}
      <nav className="absolute top-10 w-full z-50 pt-8 px-8 flex flex-col md:flex-row justify-center items-center text-stone-100 max-w-[1600px] left-1/2 -translate-x-1/2">
        <div className="hidden md:flex items-center gap-6 text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex-1 justify-end pr-16 tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Inicio</a>
          <span className="text-white/40 font-light">|</span>
          <a href="#staff" className="hover:text-white transition-colors">Staff</a>
          <span className="text-white/40 font-light">|</span>
          <a href="#areas" className="hover:text-white transition-colors">Áreas del Derecho</a>
        </div>

        <div className="flex-shrink-0 z-50 pb-4 md:pb-0 px-8">
          <Image 
            src="/logo.png" 
            alt="Estudio Jurídico Ferrer" 
            width={180} 
            height={130} 
            className="drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex-1 justify-start pl-16 tracking-wide">
          <a href="#blog" className="hover:text-white transition-colors">Blog</a>
          <span className="text-white/40 font-light">|</span>
          <a href="#contacto" className="hover:text-white transition-colors">Contactanos</a>
        </div>
      </nav>

      {/* Hero Section - 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/60 z-10" />
        <Image
          src="/img.png"
          alt="Estudio Jurídico Ferrer"
          fill
          className="object-cover object-center"
          priority
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-[0.15em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
            Estudio Jurídico Ferrer
          </h1>
          <a 
            href="#staff"
            className="bg-[#cc0000] text-white px-8 py-3 text-sm tracking-[0.15em] font-medium hover:bg-[#aa0000] transition-colors uppercase drop-shadow-md rounded-sm"
          >
            Conocenos
          </a>
        </div>

        <div className="absolute bottom-10 z-20 text-white animate-bounce">
          <a href="#staff">
            <ChevronDown size={32} className="opacity-80 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="text-center mb-20 max-w-7xl mx-auto group">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-700 font-light mb-6 transition-all duration-700 group-hover:tracking-wider">Nuestro Staff</h2>
          <div className="w-12 h-[1px] bg-red-700/50 mx-auto transition-all duration-700 group-hover:w-24 group-hover:bg-[#cc0000]" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dbStaff.map((member, i) => (
            <div 
              key={i} 
              className="group bg-[#5c5c5c] relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#cc0000]/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer p-8 flex flex-col items-center justify-between min-h-[300px]" 
              onClick={() => setSelectedStaff(member)}
            >
              {/* Overlay sutil al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col items-center flex-1 relative z-10">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border border-stone-400/50 mb-6 group-hover:border-white/80 group-hover:scale-110 transition-all duration-700 shadow-inner">
                  <Image src={member.photo || "/img.png"} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                </div>
                <h3 className="text-xs md:text-sm font-serif text-stone-100 tracking-[0.1em] text-center uppercase leading-snug group-hover:text-white transition-colors duration-300">{member.name}</h3>
                <p className="text-[10px] text-stone-300 tracking-[0.2em] font-light mt-2 uppercase">{member.role}</p>
                <div className="mt-4 w-8 h-8 rounded-full border border-stone-400 flex items-center justify-center text-stone-300 group-hover:text-white group-hover:border-white group-hover:bg-[#cc0000] rotate-0 group-hover:-rotate-12 transition-all duration-500">
                  <Mail size={12} />
                </div>
              </div>
              
              <div className="w-full pt-6 mt-6 border-t border-stone-400/30 flex justify-center relative z-10">
                 <span className="text-xs text-stone-200 font-serif font-light tracking-wide group-hover:text-white group-hover:tracking-widest transition-all duration-500">Ver Cv completo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Areas of Practice */}
      <section id="areas" className="relative py-32 text-white">
        <div className="absolute inset-0 z-0">
          <Image src="/img.png" alt="Áreas Background" fill className="object-cover object-bottom opacity-50" />
          <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-stone-200 mb-6 font-light">Áreas del derecho</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-24 gap-x-12">
            {areas.map((area, i) => (
              <div 
                key={i}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <area.icon className="text-stone-300 group-hover:text-white transition-colors duration-300" strokeWidth={1} size={56} />
                </div>
                <h3 className="font-serif tracking-[0.1em] text-sm text-stone-300 group-hover:text-white transition-colors uppercase">{area.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-700 font-light">Nuestros Últimos Artículos</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-2">
          {dbPosts.map((post, i) => {
            const dateStr = post.createdAt.toLocaleDateString("es-AR", { day: '2-digit', month: 'short' }).split(' ');
            const day = dateStr[0] || '03';
            const shortMonth = (dateStr[1] || 'Ago').substring(0, 3).toUpperCase();
            return (
            <article key={i} className="group cursor-pointer flex flex-col">
              <div className="h-40 relative overflow-hidden bg-stone-200">
                 <Image src={post.photo || "/img.png"} alt={post.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              
              <div className="bg-[#cc0000] relative flex flex-col items-center text-center p-8 pt-10 flex-1">
                {/* Date Badge flotante a la izquierda */}
                <div className="absolute -top-7 left-0 bg-white border border-[#cc0000] w-12 h-14 flex flex-col justify-center items-center text-[#cc0000]">
                  <span className="font-sans font-bold leading-none text-lg">{day}</span>
                  <span className="font-sans text-[11px] leading-tight capitalize">{shortMonth}</span>
                </div>

                <h3 className="text-white font-serif text-lg leading-snug mb-6 flex-1 px-4">
                  {post.title}
                </h3>
                
                <div className="w-8 h-[1px] bg-white/30 mb-6" />

                <button className="border border-white text-white px-6 py-1.5 text-xs font-sans tracking-wide hover:bg-white hover:text-[#cc0000] transition-colors">
                  LEER MAS
                </button>
              </div>
            </article>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <a href="#" className="bg-[#cc0000] text-white px-8 py-3 text-xs tracking-wider hover:bg-[#aa0000] transition-colors drop-shadow-md">
            VER TODOS LOS ARTÍCULOS
          </a>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contacto" className="bg-[#cc0000] text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-12 font-light">
            DATOS DE CONTACTO
          </h2>
          
          <div className="flex flex-col gap-6 text-lg md:text-xl font-light">
            <div className="flex items-center justify-center gap-4">
              <Phone size={24} className="opacity-90" />
              <a href="tel:+543424597619" className="hover:opacity-80 transition-opacity tracking-wide">(+54 342) 459 7619</a>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <Phone size={24} className="opacity-90" />
              <a href="tel:+543424593427" className="hover:opacity-80 transition-opacity tracking-wide">(+54 342) 459 3427</a>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <Mail size={24} className="opacity-90" />
              <a href="mailto:contacto@estudiojuridicoferrer.com.ar" className="hover:opacity-80 transition-opacity tracking-wide">contacto@estudiojuridicoferrer.com.ar</a>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <MapPin size={24} className="opacity-90" />
              <a href="#" className="hover:opacity-80 transition-opacity tracking-wide">1º de Mayo 1506 - Santa Fe</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/20 mt-20 pt-8 flex flex-col items-center text-sm font-light text-white/70 relative z-10">
          <p>© {new Date().getFullYear()} Estudio Jurídico Ferrer. Todos los derechos reservados.</p>
        </div>
      </footer>
      {selectedStaff && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${isClosing ? 'animate-[fadeOut_0.4s_ease-out_forwards]' : 'animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className={`bg-stone-50 w-full max-w-3xl relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[94vh] overflow-hidden ${isClosing ? 'animate-[slideDownOut_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]' : 'animate-[slideUpIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]'}`}>

            <button onClick={closeModal} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 z-20">
              <X size={24} />
            </button>

            {/* Columna gris: foto + info alineada arriba */}
            <div className="w-full md:w-1/3 bg-[#5c5c5c] p-10 flex flex-col items-center shrink-0 pt-12">
              <div className="w-32 h-32 relative rounded-full overflow-hidden border border-stone-300 mb-6">
                <Image src={selectedStaff.photo || "/img.png"} alt={selectedStaff.name} fill className="object-cover" />
              </div>
              <h3 className="text-sm font-serif text-white tracking-[0.1em] text-center uppercase leading-snug">{selectedStaff.name}</h3>
              <p className="text-[10px] text-stone-300 tracking-[0.2em] font-light mt-3 uppercase">{selectedStaff.role}</p>
            </div>

            {/* CV scrollable */}
            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
              <h4 className="font-bold text-stone-800 font-serif mb-6 uppercase tracking-wider">{selectedStaff.name}</h4>
              <div className="text-stone-600 text-sm leading-relaxed space-y-4 font-light">
                {selectedStaff.cv.map((pg: string, idx: number) => (
                  <p key={idx}>{pg}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const areas = [
  { title: "Derecho Sucesorio", icon: Scale },
  { title: "Derecho de Familia", icon: Users },
  { title: "Derecho Civil y Comercial", icon: Briefcase },
  { title: "Derecho Informático", icon: Globe },
  { title: "Derecho Ambiental", icon: Leaf },
  { title: "Derecho Notarial", icon: Gavel },
];
