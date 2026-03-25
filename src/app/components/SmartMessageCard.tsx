import { SmartMessage } from "../utils/smartMessages";
import { Sparkles } from "lucide-react";

interface SmartMessageCardProps {
  message: SmartMessage;
}

export function SmartMessageCard({ message }: SmartMessageCardProps) {
  return (
    <div className={`${message.bgColor} rounded-2xl p-6 shadow-sm border ${message.type === 'positive' ? 'border-green-200' : message.type === 'attention' ? 'border-orange-200' : 'border-blue-200'} relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-sm shrink-0">
            <span className="text-2xl">{message.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-base ${message.color}`}>
                {message.title}
              </h3>
              {message.type === 'positive' && (
                <Sparkles className="w-4 h-4 text-yellow-500 shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>
        
        {/* Visual indicator bar */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-white/40 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getBarGradient(message.type)} rounded-full transition-all duration-500`}
              style={{ width: getBarWidth(message.type) }}
            ></div>
          </div>
          <span className="text-xs font-semibold text-gray-700 shrink-0">
            {getStatusText(message.type)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getBarGradient(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive':
      return 'from-green-400 to-green-500';
    case 'neutral':
      return 'from-teal-400 to-teal-500';
    case 'attention':
      return 'from-orange-400 to-orange-500';
    case 'missing':
      return 'from-purple-400 to-purple-500';
    case 'reengage':
      return 'from-blue-400 to-blue-500';
    default:
      return 'from-gray-400 to-gray-500';
  }
}

function getBarWidth(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive':
      return '85%';
    case 'neutral':
      return '60%';
    case 'attention':
      return '45%';
    case 'missing':
      return '30%';
    case 'reengage':
      return '20%';
    default:
      return '50%';
  }
}

function getStatusText(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive':
      return 'Ótimo!';
    case 'neutral':
      return 'Bom';
    case 'attention':
      return 'Atenção';
    case 'missing':
      return 'Pendente';
    case 'reengage':
      return 'Volte!';
    default:
      return 'Ok';
  }
}