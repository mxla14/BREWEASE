
import React from 'react';

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  }[size];
  
  const strokeWidth = {
    small: "2",
    default: "3",
    large: "4",
  }[size];

  return (
    <span className={`font-display ${textSize} font-bold`}>
      <span className="relative text-[#7E3D1B]" style={{ 
        WebkitTextStroke: `${strokeWidth}px #F8F3ED`,
        textShadow: `0 0 ${strokeWidth}px #F8F3ED`
      }}>
        BrewEase
      </span>
    </span>
  );
}
