import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { SmartMessageCard } from "../components/SmartMessageCard";
import { SmartMessage } from "../utils/smartMessages";
import { Activity, ChefHat, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

// Todas as variações de mensagens
const messageStates: SmartMessage[] = [
  {
    type: 'positive',
    title: 'Muito bem!',
    message: 'Você está cuidando super bem do Heitor hoje! Continue assim 👏',
    icon: '⭐',
    mood: 'happy',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
  },
  {
    type: 'neutral',
    title: 'Tudo certo por aqui!',
    message: 'Continue acompanhando ao longo do dia. O Heitor conta com você 😊',
    icon: '💚',
    mood: 'neutral',
    color: 'text-teal-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100'
  },
  {
    type: 'missing',
    title: 'Já faz um tempinho...',
    message: 'Já faz um tempinho desde a última medição… vamos registrar agora?',
    icon: '⏰',
    mood: 'tired',
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
  },
  {
    type: 'attention',
    title: 'Vamos acompanhar de perto',
    message: 'As últimas medições estão um pouco altas. Vamos acompanhar mais de perto hoje?',
    icon: '🩺',
    mood: 'tired',
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100'
  },
  {
    type: 'reengage',
    title: 'Sentimos sua falta!',
    message: 'Vamos retomar o cuidado com o Heitor? Estamos aqui para ajudar 💙',
    icon: '💙',
    mood: 'neutral',
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
  }
];

const stateInfo = [
  { name: "Estado Positivo", desc: "Uso correto e valores ideais" },
  { name: "Estado Neutro", desc: "Acompanhamento regular" },
  { name: "Sem Registro", desc: "6+ horas desde última medição" },
  { name: "Estado de Atenção", desc: "Valores recentes altos" },
  { name: "Reengajamento", desc: "3+ dias sem usar o app" }
];

export function MessageStatesShowcase() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Sistema de Mensagens Inteligentes
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          HeitorApp • Semi-IA baseada em regras
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          O app responde dinamicamente ao comportamento do usuário com mensagens amigáveis e acolhedoras,
          ajudando no cuidado diário da criança de forma leve e personalizada.
        </p>
      </div>

      {/* Grid de Estados */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {messageStates.map((message, index) => (
          <div key={index} className="flex flex-col">
            {/* Info do Estado */}
            <div className="mb-4 text-center">
              <h3 className="font-semibold text-gray-700 mb-1">
                {stateInfo[index].name}
              </h3>
              <p className="text-xs text-gray-500">
                {stateInfo[index].desc}
              </p>
            </div>

            {/* Mockup */}
            <PhoneMockup className="scale-[0.75] origin-top">
              <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24 overflow-y-auto">
                <div className="p-6 pt-16 pb-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                        Olá, Heitor 👋
                      </h1>
                      <p className="text-sm text-gray-500">
                        Quarta-feira, 25 de Março
                      </p>
                    </div>
                    <HeitorAvatar mood={message.mood} size="md" />
                  </div>

                  {/* Smart Message Card */}
                  <SmartMessageCard message={message} />

                  {/* Last Reading Card */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Última medição</p>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-3xl font-semibold ${getValueColor(message.type)}`}>
                            {getValue(message.type)}
                          </span>
                          <span className="text-sm text-gray-500">mg/dL</span>
                        </div>
                      </div>
                      <div className={`${getValueBg(message.type)} p-2.5 rounded-xl`}>
                        <TrendingUp className={`w-5 h-5 ${getValueColor(message.type)}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getValueGradient(message.type)} rounded-full transition-all duration-500`} 
                          style={{ width: getValueWidth(message.type) }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${getValueColor(message.type)}`}>
                        {getValueStatus(message.type)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Há {getTimeAgo(message.type)}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-lg shadow-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="font-semibold text-lg mb-1">Registrar glicemia</h3>
                          <p className="text-sm text-blue-100">Adicionar nova medição</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                          <Activity className="w-6 h-6" />
                        </div>
                      </div>
                    </button>

                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl p-5 shadow-lg shadow-yellow-200">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="font-semibold text-lg mb-1">Gerar receita</h3>
                          <p className="text-sm text-yellow-100">Receitas seguras para você</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                          <ChefHat className="w-6 h-6" />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-blue-600 mb-1">{getActiveDays(message.type)}</p>
                      <p className="text-xs text-gray-500">Dias ativos</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-green-600 mb-1">{getRecords(message.type)}</p>
                      <p className="text-xs text-gray-500">Registros</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-yellow-600 mb-1">12</p>
                      <p className="text-xs text-gray-500">Receitas</p>
                    </div>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto mt-16 bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          🧠 Como Funciona a Semi-IA
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">📊 Análise em Tempo Real</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tempo desde última medição</li>
              <li>• Valores recentes de glicemia</li>
              <li>• Consistência de uso diário</li>
              <li>• Dias consecutivos ativos</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">💡 Regras Inteligentes</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 3+ dias sem uso → Reengajamento</li>
              <li>• 6+ horas sem medição → Lembrete</li>
              <li>• Valores altos consecutivos → Atenção</li>
              <li>• Uso consistente + valores bons → Positivo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 inline-block mr-2" />
          Voltar
        </button>
      </div>
    </div>
  );
}

// Helper functions para variar os dados baseado no estado
function getValue(type: SmartMessage['type']): number {
  switch (type) {
    case 'positive': return 105;
    case 'neutral': return 118;
    case 'missing': return 102;
    case 'attention': return 165;
    case 'reengage': return 95;
    default: return 105;
  }
}

function getValueColor(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive': return 'text-green-600';
    case 'neutral': return 'text-green-600';
    case 'missing': return 'text-green-600';
    case 'attention': return 'text-red-600';
    case 'reengage': return 'text-green-600';
    default: return 'text-green-600';
  }
}

function getValueBg(type: SmartMessage['type']): string {
  switch (type) {
    case 'attention': return 'bg-red-100';
    default: return 'bg-green-100';
  }
}

function getValueGradient(type: SmartMessage['type']): string {
  switch (type) {
    case 'attention': return 'bg-gradient-to-r from-red-400 to-red-500';
    default: return 'bg-gradient-to-r from-green-400 to-green-500';
  }
}

function getValueWidth(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive': return '70%';
    case 'neutral': return '65%';
    case 'missing': return '60%';
    case 'attention': return '30%';
    case 'reengage': return '55%';
    default: return '60%';
  }
}

function getValueStatus(type: SmartMessage['type']): string {
  switch (type) {
    case 'attention': return 'Atenção';
    default: return 'Ótimo!';
  }
}

function getTimeAgo(type: SmartMessage['type']): string {
  switch (type) {
    case 'positive': return '1 hora';
    case 'neutral': return '3 horas';
    case 'missing': return '8 horas';
    case 'attention': return '2 horas';
    case 'reengage': return '4 dias';
    default: return '2 horas';
  }
}

function getActiveDays(type: SmartMessage['type']): number {
  switch (type) {
    case 'positive': return 12;
    case 'neutral': return 7;
    case 'missing': return 5;
    case 'attention': return 8;
    case 'reengage': return 2;
    default: return 7;
  }
}

function getRecords(type: SmartMessage['type']): number {
  switch (type) {
    case 'positive': return 45;
    case 'neutral': return 23;
    case 'missing': return 18;
    case 'attention': return 31;
    case 'reengage': return 8;
    default: return 23;
  }
}