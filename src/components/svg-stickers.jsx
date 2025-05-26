"use client";
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function SvgSticker({
  type,
  className = "",
  size = "md"
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20", // Reduced from w-24 h-24
  }

  const stickers = {
    sakura: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}>
        <g className="animate-sticker-bounce">
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            fill={isDark ? "rgba(255, 105, 180, 0.2)" : "rgba(255, 182, 193, 0.3)"}
            stroke={isDark ? "#ff69b4" : "#ffb6c1"}
            strokeWidth="2" />
          <path
            d="M32 12C32 12 38 20 32 28C26 36 32 44 32 44C32 44 26 36 32 28C38 20 32 12 32 12Z"
            fill={isDark ? "#ff69b4" : "#ff1493"} />
          <path
            d="M32 12C32 12 26 20 32 28C38 36 32 44 32 44C32 44 38 36 32 28C26 20 32 12 32 12Z"
            fill={isDark ? "#ff69b4" : "#ff1493"} />
          <circle cx="32" cy="28" r="4" fill="white" />
        </g>
      </svg>
    ),
    mountain: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}>
        <g className="animate-sticker-bounce">
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            fill={isDark ? "rgba(147, 197, 253, 0.2)" : "rgba(147, 197, 253, 0.3)"}
            stroke={isDark ? "#93c5fd" : "#60a5fa"}
            strokeWidth="2" />
          <path
            d="M12 48L24 24L36 32L48 16L52 48H12Z"
            fill={isDark ? "#93c5fd" : "#3b82f6"} />
          <path
            d="M16 48L28 28L40 36L52 20L52 48H16Z"
            fill={isDark ? "#60a5fa" : "#2563eb"} />
          <circle cx="20" cy="20" r="3" fill={isDark ? "#fbbf24" : "#f59e0b"} />
        </g>
      </svg>
    ),
    star: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}>
        <g className="animate-sticker-bounce">
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            fill={isDark ? "rgba(251, 191, 36, 0.2)" : "rgba(251, 191, 36, 0.3)"}
            stroke={isDark ? "#fbbf24" : "#f59e0b"}
            strokeWidth="2" />
          <path
            d="M32 16L36 28H48L38 36L42 48L32 40L22 48L26 36L16 28H28L32 16Z"
            fill={isDark ? "#fbbf24" : "#f59e0b"} />
        </g>
      </svg>
    ),
    cloud: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}>
        <g className="animate-sticker-bounce">
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            fill={isDark ? "rgba(156, 163, 175, 0.2)" : "rgba(229, 231, 235, 0.8)"}
            stroke={isDark ? "#9ca3af" : "#d1d5db"}
            strokeWidth="2" />
          <path
            d="M20 36C16 36 12 32 12 28C12 24 16 20 20 20C22 16 26 14 30 16C34 14 38 16 40 20C44 20 48 24 48 28C48 32 44 36 40 36H20Z"
            fill={isDark ? "#9ca3af" : "#e5e7eb"} />
        </g>
      </svg>
    ),
    diamond: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}>
        <g className="animate-sticker-bounce">
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            fill={isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(196, 181, 253, 0.3)"}
            stroke={isDark ? "#8b5cf6" : "#a855f7"}
            strokeWidth="2" />
          <path d="M32 16L44 28L32 48L20 28L32 16Z" fill={isDark ? "#8b5cf6" : "#a855f7"} />
          <path d="M32 16L38 22L32 32L26 22L32 16Z" fill="white" opacity="0.5" />
        </g>
      </svg>
    ),
  }

  return (
    <motion.div
      className={`absolute ${className} overflow-visible`}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      viewport={{ once: true }}
      // Ensure stickers are above other content
      style={{ zIndex: 10 }}>
      {stickers[type]}
    </motion.div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative py-20 overflow-visible">
      {/* Ensure container has enough padding to show stickers */}
      <div className="absolute inset-0 -mx-8 -my-8 overflow-visible">
        <SvgSticker type="sakura" className="top-4 left-8" size="md" />
        <SvgSticker type="mountain" className="top-8 right-16" size="lg" />
        <SvgSticker type="star" className="bottom-4 left-1/4" size="sm" />
        <SvgSticker
          type="cloud"
          className="top-12 left-1/2 transform -translate-x-1/2"
          size="md" />
        <SvgSticker type="diamond" className="bottom-8 right-8" size="sm" />
      </div>
    </div>
  );
}
