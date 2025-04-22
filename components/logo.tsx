import React from 'react';

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  }[size];
  
  // Scale text shadow based on size
  const shadowSize = {
    small: "1px",
    default: "1px",
    large: "2px",
  }[size];
  
  return (
    <span className={`${textSize} font-bold`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <span 
        className="text-[#7E3D1B]" 
        style={{ 
          fontFamily: 'Poppins, sans-serif',
          textShadow: `
            -${shadowSize} -${shadowSize} 0 #F8F3ED,
            ${shadowSize} -${shadowSize} 0 #F8F3ED,
            -${shadowSize} ${shadowSize} 0 #F8F3ED,
            ${shadowSize} ${shadowSize} 0 #F8F3ED
          `
        }}
      >
        BrewEase
      </span>
    </span>
  );
}
