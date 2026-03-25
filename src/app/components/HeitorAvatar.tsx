interface HeitorAvatarProps {
  mood?: 'happy' | 'neutral' | 'tired';
  size?: 'sm' | 'md' | 'lg';
}

export function HeitorAvatar({ mood = 'happy', size = 'md' }: HeitorAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  return (
    <div className={`${sizeClasses[size]} relative transition-transform hover:scale-110`}>
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="50" cy="40" r="25" fill="#FFDAB3" />
        
        {/* Hair - 3 little bumps/tufts */}
        <circle cx="38" cy="20" r="8" fill="#8B5A3C" />
        <circle cx="50" cy="17" r="9" fill="#8B5A3C" />
        <circle cx="62" cy="20" r="8" fill="#8B5A3C" />
        
        {/* Body/Shirt - simple rounded rectangle */}
        <rect x="30" y="62" width="40" height="38" rx="15" fill="#7EC8E3" />
        
        {/* Eyes - simple dots */}
        {mood === 'happy' && (
          <>
            <circle cx="42" cy="38" r="2.5" fill="#2C3E50" />
            <circle cx="58" cy="38" r="2.5" fill="#2C3E50" />
            {/* Rosy Cheeks */}
            <circle cx="32" cy="45" r="5" fill="#FFB6C1" opacity="0.6" />
            <circle cx="68" cy="45" r="5" fill="#FFB6C1" opacity="0.6" />
            {/* Happy smile */}
            <path 
              d="M 40 48 Q 50 54 60 48" 
              stroke="#2C3E50" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
          </>
        )}
        
        {mood === 'neutral' && (
          <>
            <circle cx="42" cy="40" r="2.5" fill="#2C3E50" />
            <circle cx="58" cy="40" r="2.5" fill="#2C3E50" />
            {/* Rosy Cheeks */}
            <circle cx="32" cy="47" r="4" fill="#FFB6C1" opacity="0.5" />
            <circle cx="68" cy="47" r="4" fill="#FFB6C1" opacity="0.5" />
            {/* Neutral smile */}
            <path 
              d="M 40 50 Q 50 52 60 50" 
              stroke="#2C3E50" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
          </>
        )}
        
        {mood === 'tired' && (
          <>
            <line x1="40" y1="40" x2="44" y2="40" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="40" x2="60" y2="40" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            {/* Rosy Cheeks - lighter */}
            <circle cx="32" cy="47" r="4" fill="#FFB6C1" opacity="0.3" />
            <circle cx="68" cy="47" r="4" fill="#FFB6C1" opacity="0.3" />
            {/* Tired mouth */}
            <path 
              d="M 40 52 Q 50 48 60 52" 
              stroke="#2C3E50" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
          </>
        )}
      </svg>
    </div>
  );
}