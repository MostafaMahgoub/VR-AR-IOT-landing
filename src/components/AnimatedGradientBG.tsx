import { motion } from "motion/react";

const ORANGE = "#f3822c";
const DARK = "#2a2a2a";

// tiny deterministic "random" so SSR/CSR match
function prand(seed: number) {
  return (Math.sin(seed * 9973) + 1) / 2; // 0..1
}

export default function AnimatedGradientBG() {
  // create deterministic positions for nodes
  const nodes = Array.from({ length: 12 }).map((_, i) => ({
    top: `${Math.round(prand(i + 1) * 90 + 5)}%`,
    left: `${Math.round(prand(i + 11) * 90 + 5)}%`,
    size: 4 + Math.round(prand(i + 21) * 6), // 4..10px
    delay: prand(i + 31) * 2.5,
    dur: 3 + prand(i + 41) * 3,
  }));

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden h-full w-full"
    >
      {/* Base gradient wash (very subtle) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(30deg, ${DARK} 0%, #131313 60%, ${DARK} 100%)`,
          opacity: 0.8,
        }}
      />

      {/* Animated radial glow that slowly breathes */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: 1100,
          height: 1100,
          background: `radial-gradient(circle at center, ${ORANGE} 0%, transparent 70%)`,
          opacity: 0.35,
        }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.28, 0.4, 0.28] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Constellation lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const even = i % 2 === 0;
        const width = even ? "44%" : "34%";
        const top = `${18 + i * 12}%`;
        const left = even ? "8%" : "58%";

        return (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top,
              left,
              width,
              background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
              opacity: 0.45,
            }}
            animate={{ opacity: [0.12, 0.6, 0.12] }}
            transition={{
              repeat: Infinity,
              duration: 6 + i,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Floating nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: n.top,
            left: n.left,
            width: n.size,
            height: n.size,
            boxShadow: `0 0 10px ${ORANGE}66, 0 0 20px ${ORANGE}33`,
            background: ORANGE,
            opacity: 0.8,
          }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
          transition={{
            repeat: Infinity,
            duration: n.dur,
            delay: n.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
