interface HeitorAvatarProps {
  mood?: 'happy' | 'neutral' | 'tired';
  size?: 'sm' | 'md' | 'lg';
  gender?: 'male' | 'female';
}

export function HeitorAvatar({ mood = 'happy', size = 'md', gender = 'male' }: HeitorAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  // Cores baseadas no gênero
  const colors = gender === 'female' 
    ? { hair: '#4A2C2A', shirt: '#F48FB1' } // cabelo castanho escuro, camisa rosa
    : { hair: '#8B5A3C', shirt: '#7EC8E3' }; // cabelo castanho claro, camisa azul

  return (
    <div className={`${sizeClasses[size]} relative transition-transform hover:scale-110`}>
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="50" cy="40" r="25" fill="#FFDAB3" />
        
        {/* Hair - different styles based on gender */}
        {gender === 'male' ? (
          <>
            {/* Hair - 3 little bumps/tufts (masculino) */}
            <circle cx="38" cy="20" r="8" fill={colors.hair} />
            <circle cx="50" cy="17" r="9" fill={colors.hair} />
            <circle cx="62" cy="20" r="8" fill={colors.hair} />
          </>
        ) : (
          <>
            {/* Hair feminino - estilo Maria Chiquinha */}
            
            {/* Cabelo principal cobrindo o topo */}
            <ellipse cx="50" cy="20" rx="26" ry="14" fill={colors.hair} />
            
            {/* Chiquinhas (maria chiquinha) - duas nos lados */}
            {/* Chiquinha esquerda */}
            <circle cx="25" cy="30" r="10" fill={colors.hair} />
            <circle cx="23" cy="38" r="8" fill={colors.hair} />
            
            {/* Chiquinha direita */}
            <circle cx="75" cy="30" r="10" fill={colors.hair} />
            <circle cx="77" cy="38" r="8" fill={colors.hair} />
            
            {/* Laços nas chiquinhas */}
            {/* Laço esquerdo */}
            <ellipse cx="20" cy="27" rx="4" ry="3" fill="#FF69B4" />
            <ellipse cx="27" cy="27" rx="4" ry="3" fill="#FF69B4" />
            <circle cx="23.5" cy="27" r="1.5" fill="#FF1493" />
            
            {/* Laço direito */}
            <ellipse cx="73" cy="27" rx="4" ry="3" fill="#FF69B4" />
            <ellipse cx="80" cy="27" rx="4" ry="3" fill="#FF69B4" />
            <circle cx="76.5" cy="27" r="1.5" fill="#FF1493" />
            
            {/* Franjinha */}
            <circle cx="42" cy="19" r="4.5" fill={colors.hair} />
            <circle cx="50" cy="17" r="5" fill={colors.hair} />
            <circle cx="58" cy="19" r="4.5" fill={colors.hair} />
          </>
        )}
        
        {/* Body/Shirt - simple rounded rectangle */}
        <rect x="30" y="62" width="40" height="38" rx="15" fill={colors.shirt} />
        
        {/* Eyes - simple dots */}
        {mood === 'happy' && (
          <>
            <circle cx="42" cy="38" r="2.5" fill="#2C3E50" />
            <circle cx="58" cy="38" r="2.5" fill="#2C3E50" />
            {/* Rosy Cheeks */}
            <circle cx="33" cy="45" r="4.5" fill="#FFB6C1" opacity="0.6" />
            <circle cx="67" cy="45" r="4.5" fill="#FFB6C1" opacity="0.6" />
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
            <circle cx="33" cy="47" r="4" fill="#FFB6C1" opacity="0.5" />
            <circle cx="67" cy="47" r="4" fill="#FFB6C1" opacity="0.5" />
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
            <circle cx="33" cy="47" r="4" fill="#FFB6C1" opacity="0.3" />
            <circle cx="67" cy="47" r="4" fill="#FFB6C1" opacity="0.3" />
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