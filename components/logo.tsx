export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  }[size];
  
  const strokeWidth = {
    small: 2,
    default: 3,
    large: 4,
  }[size];
  
  return (
    <span className={`font-display ${textSize} font-bold`}>
      <span className="text-[#7E3D1B] relative">
        <span 
          className="absolute -inset-0.5 text-transparent"
          style={{ 
            WebkitTextStroke: `${strokeWidth}px #F8F3ED`, 
            textStroke: `${strokeWidth}px #F8F3ED`,
            zIndex: 0 
          }}
        >
          BrewEase
        </span>
        <span className="relative z-10">BrewEase</span>
      </span>
    </span>
  );
}
