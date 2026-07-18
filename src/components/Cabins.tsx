import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cabins } from "../data";

function CabinCard({ cabin, index }: { cabin: any; index: number; key?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="group relative w-full mb-16 md:mb-32 last:mb-0 rounded-2xl overflow-hidden bg-[#121212] border border-white/5 flex flex-col">
      <div className="flex flex-col md:flex-row items-center relative z-20">
        {/* Text content */}
        <div className={`w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 md:mb-4 block">
              {cabin.category}
            </span>
            <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-4 md:mb-6 text-white uppercase">
              {cabin.name}
            </h3>
            <p className="text-sm leading-relaxed text-[#888] mb-8 md:mb-10 max-w-md font-light">
              {cabin.description}
            </p>
            
            <div className="flex gap-6 md:gap-10 border-t border-white/10 pt-6 md:pt-8">
              <div>
                <div className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1 md:mb-2">Capacity</div>
                <div className="font-mono text-xs md:text-sm text-[#e0e0e0]">{cabin.capacity}</div>
              </div>
              <div>
                <div className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1 md:mb-2">Size</div>
                <div className="font-mono text-xs md:text-sm text-[#e0e0e0]">{cabin.size}</div>
              </div>
            </div>
            
            <a 
              href="#booking" 
              onClick={() => window.dispatchEvent(new CustomEvent('selectCabin', { detail: cabin.id }))}
              className="inline-flex mt-8 md:mt-12 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all self-start"
            >
              Book Now
            </a>
          </motion.div>
        </div>

        {/* Image with parallax */}
        <div className={`w-full md:w-1/2 h-[50vh] md:h-[70vh] overflow-hidden relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-50"></div>
          <motion.img
            style={{ y }}
            src={cabin.image}
            alt={cabin.name}
            className="w-full h-[120%] object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-1000"
          />
        </div>
      </div>
    </div>
  );
}

export default function Cabins() {
  return (
    <section id="cabins" className="pt-8 pb-0 px-6 bg-[#050505] text-[#e0e0e0] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col items-start md:items-center md:text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase text-white">
            The <span className="text-[#666]">Houses</span>
          </h2>
          <p className="text-sm text-[#888] max-w-2xl font-light uppercase tracking-widest">
            Choose your space
          </p>
        </div>

        <div className="flex flex-col">
          {cabins.map((cabin, idx) => (
            <CabinCard key={cabin.id} cabin={cabin} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
