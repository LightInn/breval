import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(<div
    style={{
      fontSize: 48,
      background: "linear-gradient(to bottom, #0f172a, #1e293b)",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: 32,
    }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 24,
      }}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="2"
          stroke="#FF69B4"
          strokeWidth="2" />
        <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#FF69B4" />
      </svg>
      <div style={{ marginLeft: 16, fontWeight: "bold" }}>Bréval Le Floch</div>
    </div>
    <div style={{ fontSize: 24, opacity: 0.8, marginBottom: 32 }}>Creative Developer & Digital Craftsman</div>
    <div
      style={{
        display: "flex",
        gap: 16,
        marginTop: 16,
      }}>
      <div
        style={{
          background: "rgba(255, 105, 180, 0.2)",
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid rgba(255, 105, 180, 0.3)",
        }}>
        Projects
      </div>
      <div
        style={{
          background: "rgba(255, 105, 180, 0.2)",
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid rgba(255, 105, 180, 0.3)",
        }}>
        Journey
      </div>
      <div
        style={{
          background: "rgba(255, 105, 180, 0.2)",
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid rgba(255, 105, 180, 0.3)",
        }}>
        About
      </div>
    </div>
  </div>, { ...size });
}
