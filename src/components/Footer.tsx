import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#e0e0e0] py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-bold text-2xl tracking-tighter uppercase text-white">
          Black<span className="text-[#666]">/Nest</span>
        </div>
        <div className="text-xs text-white/40 text-center md:text-left uppercase tracking-widest">
          © {new Date().getFullYear()} Black Nest. All rights reserved.
        </div>
        <div className="flex gap-8 text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
