import { Home, Activity, UtensilsCrossed, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/home' },
    { icon: Activity, label: 'Glicemia', path: '/glicemia' },
    { icon: UtensilsCrossed, label: 'Receitas', path: '/receitas' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 rounded-b-[2.5rem] z-20 shadow-lg">
      <div className="flex justify-around items-center h-20 px-4 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 min-w-[64px] active:scale-95 transition-all"
            >
              <div className={`p-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
