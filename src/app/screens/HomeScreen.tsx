import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { BottomNav } from "../components/BottomNav";
import { SmartMessageCard } from "../components/SmartMessageCard";
import { Activity, ChefHat, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { generateSmartMessage, calculateUserActivity } from "../utils/smartMessages";

export function HomeScreen() {
  const navigate = useNavigate();
  const [lastReading, setLastReading] = useState({ value: 0, time: "", timestamp: new Date() });
  const [stats, setStats] = useState({
    activeDays: 0,
    records: 0,
    recipes: 0
  });
  const [allRecords, setAllRecords] = useState<any[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('heitor_last_reading');
    if (stored) {
      setLastReading(JSON.parse(stored));
    }
    
    // Carregar todos os registros para análise
    const storedRecords = localStorage.getItem('heitor_glycemia_records');
    if (storedRecords) {
      const records = JSON.parse(storedRecords);
      setAllRecords(records);
      setStats(prev => ({
        ...prev,
        records: records.length
      }));
    }
    
    // Carregar receitas salvas para contar
    const storedRecipes = localStorage.getItem('heitor-saved-recipes');
    if (storedRecipes) {
      try {
        const recipes = JSON.parse(storedRecipes);
        setStats(prev => ({
          ...prev,
          recipes: recipes.length
        }));
      } catch (e) {
        console.error('Erro ao carregar receitas:', e);
      }
    }
  }, []);

  const getReadingStatus = (value: number) => {
    if (value >= 80 && value <= 130) return { text: "Ótimo!", color: "green", bg: "bg-green-100", textColor: "text-green-600" };
    if (value >= 70 && value <= 150) return { text: "Bom", color: "yellow", bg: "bg-yellow-100", textColor: "text-yellow-600" };
    return { text: "Atenção", color: "red", bg: "bg-red-100", textColor: "text-red-600" };
  };

  const getMood = (value: number) => {
    if (value >= 80 && value <= 130) return "happy";
    if (value >= 70 && value <= 150) return "neutral";
    return "tired";
  };

  const status = getReadingStatus(lastReading.value);
  const currentMood = getMood(lastReading.value);
  
  // Gerar mensagem inteligente
  const userActivity = calculateUserActivity(allRecords.length > 0 ? allRecords : [
    { value: lastReading.value, timestamp: lastReading.timestamp || new Date(), time: lastReading.time }
  ]);
  const smartMessage = generateSmartMessage(userActivity);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PhoneMockup>
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24 overflow-y-auto">
          {/* Header */}
          <div className="px-6 pt-16 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                  Olá, Heitor 👋
                </h1>
                <p className="text-sm text-gray-500">
                  Quarta-feira, 25 de Março
                </p>
              </div>
              <HeitorAvatar mood={smartMessage.mood} size="md" />
            </div>

            {/* Smart Message Card */}
            <div className="mb-6">
              <SmartMessageCard message={smartMessage} />
            </div>

            {/* Last Reading Card */}
            {lastReading.value > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Última medição</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-semibold ${status.textColor}`}>{lastReading.value}</span>
                      <span className="text-sm text-gray-400">mg/dL</span>
                    </div>
                  </div>
                  <div className={`${status.bg} p-3 rounded-xl`}>
                    <TrendingUp className={`w-5 h-5 ${status.textColor}`} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${status.bg} rounded-full transition-all duration-500`} 
                      style={{ width: status.color === 'green' ? '75%' : status.color === 'yellow' ? '50%' : '30%' }}
                    ></div>
                  </div>
                  <span className={`text-xs font-semibold ${status.textColor}`}>{status.text}</span>
                </div>
                <p className="text-xs text-gray-400">Há {lastReading.time}</p>
              </div>
            )}
            
            {lastReading.value === 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-blue-100 mb-6">
                <p className="text-sm text-gray-600 mb-2">👋 Bem-vindo ao HeitorApp!</p>
                <p className="text-xs text-gray-500">Registre sua primeira medição de glicemia para começar</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              <button
                onClick={() => navigate('/glicemia')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
              >
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

              <button
                onClick={() => navigate('/receitas')}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl p-5 shadow-lg shadow-yellow-200 active:scale-[0.98] transition-all"
              >
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
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <p className="text-2xl font-bold text-blue-600 mb-1">{stats.activeDays}</p>
                <p className="text-xs text-gray-500 font-medium">Dias ativos</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <p className="text-2xl font-bold text-green-600 mb-1">{stats.records}</p>
                <p className="text-xs text-gray-500 font-medium">Registros</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <p className="text-2xl font-bold text-yellow-600 mb-1">{stats.recipes}</p>
                <p className="text-xs text-gray-500 font-medium">Receitas</p>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </PhoneMockup>
    </div>
  );
}