export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  }[size];
  
  const strokeWidth = {
    small: 3,
    default: 4,
    large: 6,
  }[size];
  
  return (
    <span className={`font-display ${textSize} font-bold`}>
      <span className="relative">
        {/* White outline layer - rendered behind */}
        <span 
          className="absolute -inset-0.5 text-transparent"
          style={{ 
            WebkitTextStroke: `${strokeWidth}px white`, 
            textStroke: `${strokeWidth}px white`,
            zIndex: 0 
          }}
        >
          BrewEase
        </span>
        
        {/* Main text with brown color */}
        <span 
          className="relative z-10"
          style={{ color: "#7E3D1B" }}
        >
          BrewEase
        </span>
      </span>
    </span>
  );
}
