import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "linear-gradient(135deg, #3E2723 0%, #5D4037 55%, #3E2723 100%)",
          color: "#FFF8E7",
          position: "relative",
        }}
      >
        {/* Gold frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            display: "flex",
            border: "3px solid #D4AF37",
            borderRadius: 24,
            opacity: 0.85,
          }}
        />

        {/* Monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            height: 110,
            borderRadius: 55,
            background: "#D4AF37",
            color: "#3E2723",
            fontSize: 46,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          SL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#D4AF37",
            letterSpacing: 6,
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255, 248, 231, 0.75)",
            marginTop: 12,
          }}
        >
          Shastri Chowk Chauraha, Bilandpur, Gorakhpur
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
