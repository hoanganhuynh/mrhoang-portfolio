"use client";

/**
 * MobileMeshBackground
 * Dark gray mesh gradient animation for mobile only (hidden on lg+).
 * 3 blurred orbs drift slowly using CSS transform — GPU-accelerated, no JS frame loop.
 */
export default function MobileMeshBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden lg:hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Orb 1 — top-left, slow drift down-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "80vw",
          height: "80vw",
          top: "-15%",
          left: "-20%",
          background: "radial-gradient(circle, rgba(30,30,46,0.85) 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "mesh-orb-1 14s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — bottom-right, drifts up-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "70vw",
          height: "70vw",
          bottom: "-10%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(22,24,38,0.8) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "mesh-orb-2 17s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Orb 3 — center, gentle drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          top: "38%",
          left: "28%",
          background: "radial-gradient(circle, rgba(26,26,40,0.65) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "mesh-orb-3 11s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
    </div>
  );
}
