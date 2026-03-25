// 🎨 HeitorApp Design System
// Sistema de design padronizado para consistência visual

export const spacing = {
  xs: '8px',    // 0.5rem - 8px
  sm: '12px',   // 0.75rem - 12px
  md: '16px',   // 1rem - 16px
  lg: '20px',   // 1.25rem - 20px
  xl: '24px',   // 1.5rem - 24px
  '2xl': '32px', // 2rem - 32px
  '3xl': '40px', // 2.5rem - 40px
} as const;

export const borderRadius = {
  sm: '12px',   // rounded-xl
  md: '16px',   // rounded-2xl
  lg: '24px',   // rounded-3xl
  full: '9999px', // rounded-full
} as const;

export const cardStyles = {
  base: 'bg-white rounded-2xl border border-gray-100 shadow-sm',
  padding: 'p-5',
  interactive: 'active:scale-[0.98] transition-all',
} as const;

export const buttonStyles = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl py-4 px-6 font-semibold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all',
  secondary: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl py-4 px-6 font-semibold shadow-lg shadow-yellow-200 active:scale-[0.98] transition-all',
  outline: 'border-2 border-gray-200 bg-white text-gray-700 rounded-2xl py-3 px-6 font-medium active:scale-[0.98] transition-all hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-600 rounded-xl py-2 px-4 font-medium active:scale-95 transition-all hover:bg-gray-100',
  minHeight: '44px', // Tamanho mínimo para toque mobile
} as const;

export const typography = {
  h1: 'text-2xl font-semibold text-gray-800',
  h2: 'text-xl font-semibold text-gray-800',
  h3: 'text-lg font-semibold text-gray-800',
  body: 'text-base text-gray-700',
  bodySmall: 'text-sm text-gray-600',
  caption: 'text-xs text-gray-500',
  captionSmall: 'text-[10px] text-gray-400',
} as const;

export const statusColors = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    textLight: 'text-green-700',
    badge: 'bg-green-100',
    badgeText: 'text-green-700',
    icon: 'text-green-600',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    textLight: 'text-yellow-700',
    badge: 'bg-yellow-100',
    badgeText: 'text-yellow-700',
    icon: 'text-yellow-600',
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    textLight: 'text-red-700',
    badge: 'bg-red-100',
    badgeText: 'text-red-700',
    icon: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    textLight: 'text-blue-700',
    badge: 'bg-blue-100',
    badgeText: 'text-blue-700',
    icon: 'text-blue-600',
  },
} as const;

export const avatarSizes = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
} as const;

export const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
} as const;
