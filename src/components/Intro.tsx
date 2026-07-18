import { motion } from "motion/react";

export default function Intro() {
  return (
    <section id="about" className="pt-32 pb-8 px-6 bg-[#050505] text-[#e0e0e0] relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-6xl font-light leading-[1.2] tracking-tight text-white">
            Stunning architecture for spaces where people{" "}
            <span className="font-serif italic font-normal tracking-normal text-[#888]">
              live, work,
            </span>{" "}
            and{" "}
            <span className="font-serif italic font-normal tracking-normal text-[#888]">
              chill.
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <div className="text-2xl sm:text-5xl font-light tracking-tight mb-2 sm:mb-4 text-white">120+</div>
            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/40">Guests Monthly</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <div className="text-2xl sm:text-5xl font-light tracking-tight mb-2 sm:mb-4 text-white">3</div>
            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/40">Modular Formats</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <div className="text-2xl sm:text-5xl font-light tracking-tight mb-2 sm:mb-4 text-white">100%</div>
            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/40">Nature Connection</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
