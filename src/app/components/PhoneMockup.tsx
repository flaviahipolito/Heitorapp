import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-white to-transparent z-10 flex items-start justify-between px-8 pt-2">
            <span className="text-xs font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-3" viewBox="0 0 16 12" fill="none">
                <path d="M1 4h2v4H1V4zm4-2h2v8H5V2zm4 1h2v6H9V3zm4-1h2v8h-2V2z" fill="currentColor"/>
              </svg>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M4 4v8h8V4H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M13 6v4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}
