import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-all duration-300"
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 py-4 md:px-10 md:py-6 rounded-full transition-all duration-500 w-full max-w-7xl",
          scrolled
            ? "backdrop-blur-[24px] bg-black/40 border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]"
            : "bg-transparent border border-transparent"
        )}
      >
        <a href="/" className="flex flex-col">
          <div className="font-bold text-xl md:text-2xl tracking-tighter uppercase text-white">
            Black<span className="text-[#666]">/Nest</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#888] mt-1 hidden md:block">Anzère, Valais, Switzerland</p>
        </a>
        
        <ul className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.2em] font-medium opacity-80">
          <li>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </li>
          <li>
            <a href="#cabins" className="hover:text-white transition-colors">Houses</a>
          </li>
          <li>
            <a href="#booking" className="hover:text-white transition-colors">Booking</a>
          </li>
        </ul>
        <a
          href="#booking"
          className="bg-white text-black px-6 py-3 md:px-8 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all text-center"
        >
          Book Now
        </a>
      </div>
    </motion.nav>
  );
}
