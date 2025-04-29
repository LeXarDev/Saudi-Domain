"use client";

interface GridBackgroundProps {
  children: React.ReactNode;
}

export function GridBackground({ children }: GridBackgroundProps) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{ 
            maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)'
          }}
        />
      </div>
      {children}
    </div>
  );
}
