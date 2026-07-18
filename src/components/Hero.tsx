import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { siteData } from "../data";
import { heroMedia } from "../heroMedia";

/**
 * Scroll-driven hero:
 * The section is 250vh tall; the visual stays pinned (sticky) for the first
 * ~1.5 screens while scrolling "approaches" the chalet — camera zooms in and
 * the lights come on (video scrub, image crossfade, or simulated demo).
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Progress of the pinned reveal: 0 at top, 1 when the sticky phase ends
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Camera "approach": slow zoom + slight upward drift
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  // Lights: dark at top, fully lit by ~70% of the scroll
  const litOpacity = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);
  // Demo mode: brightness ramp + warm window glow
  const demoBrightness = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["brightness(0.3) saturate(0.8)", "brightness(1) saturate(1)"]
  );
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.7], [0, 0.5]);

  // Title/pill fade out as we get close
  const uiOpacity = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.75], [0, -60]);

  // Video scrubbing — map scroll progress to video timeline
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !heroMedia.videoSrc || !v.duration || isNaN(v.duration)) return;
    const target = Math.min(p / 0.85, 1) * v.duration; // finish lights by 85%
    // Avoid micro-seeks that cause jitter
    if (Math.abs(v.currentTime - target) > 0.02) {
      v.currentTime = target;
    }
  });

  const mode = heroMedia.videoSrc
    ? "video"
    : heroMedia.imageDark && heroMedia.imageLit
      ? "crossfade"
      : "demo";

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-[#050505]">
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24">
        {/* ---- Background media ---- */}
        <motion.div
          style={{ scale, y: bgY }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {mode === "video" && (
            <video
              ref={videoRef}
              src={heroMedia.videoSrc!}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          )}

          {mode === "crossfade" && (
            <>
              <img
                src={heroMedia.imageDark!}
                alt="Chalet at dusk"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.img
                src={heroMedia.imageLit!}
                alt="Chalet with lights on"
                style={{ opacity: litOpacity }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </>
          )}

          {mode === "demo" && (
            <>
              <motion.img
                src={siteData.heroImage}
                alt="Slavsko Modular Cabin"
                style={{ filter: demoBrightness }}
                className="w-full h-full object-cover"
              />
              {/* Simulated warm light spill from the cabin */}
              <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute inset-0 pointer-events-none
                  bg-[radial-gradient(ellipse_45%_35%_at_50%_58%,rgba(255,180,90,0.35),transparent_70%)]"
              />
            </>
          )}

          {/* Framing gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505]" />
        </motion.div>

        {/* ---- Content ---- */}
        <motion.div
          style={{ opacity: uiOpacity, y: titleY }}
          className="relative z-10 text-center text-white px-6 mt-16 max-w-7xl mx-auto flex flex-col items-center w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#888] mb-6 font-medium text-center w-full max-w-xs md:max-w-none"
          >
            Anzère, Valais, Switzerland
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[12vw] leading-none font-bold tracking-tighter uppercase text-white/90 text-center w-full break-words"
          >
            Anzère
          </motion.h1>
        </motion.div>

        {/* ---- Liquid glass pill ---- */}
        <motion.div
          style={{ opacity: uiOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 w-[95%] md:w-[90%] max-w-[600px]"
        >
          <div className="w-full rounded-3xl md:rounded-[40px] bg-white/[0.03] backdrop-blur-[24px] border border-white/10 flex items-center justify-between md:justify-center px-6 md:px-10 py-4 md:py-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] gap-2 md:gap-10">
            <div className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 text-center">Elevation</span>
              <span className="text-sm md:text-lg font-light text-[#e0e0e0] text-center">1,500m</span>
            </div>
            <div className="w-[1px] h-8 md:h-12 bg-white/10" />
            <div className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 text-center">Climate</span>
              <span className="text-sm md:text-lg font-light text-[#e0e0e0] text-center">Alpine</span>
            </div>
            <div className="w-[1px] h-8 md:h-12 bg-white/10 hidden md:block" />
            <div className="flex-col items-center gap-1 text-center hidden md:flex flex-1">
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/30">Experience</span>
              <span className="text-sm md:text-lg font-light text-[#e0e0e0]">Nature x Comfort</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: uiOpacity }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-white/25 text-[9px] uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
