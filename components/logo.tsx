export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  }[size]

  const strokeWidth = {
    small: "5px",
    default: "6px",
    large: "8px",
  }[size]

  return (
    <span className={`font-display ${textSize} font-bold`}>
      <span className="text-[#7E3D1B] relative">
        <span
          className="absolute -inset-0.5 text-[#F8F3ED]"
          style={{ WebkitTextStroke: strokeWidth + " #F8F3ED", zIndex: 0 }}
        >
          BrewEase
        </span>
        <span className="relative z-10">BrewEase</span>
      </span>
    </span>
  )
}
