import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, Check, TrendingDown, TrendingUp, Minus, Edit2, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface GlycemiaRecord {
  id: string;
  value: number;
  insulin?: number;
  notes?: string;
  symptoms?: string[];
  time: string;
  status: string;
  trend: "up" | "down" | "stable";
  timestamp?: string;
}

export function GlycemiaScreen() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [insulin, setInsulin] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editInsulin, setEditInsulin] = useState("");
  const [editNotes, setEditNotes] = useState("");
  
  const [historyData, setHistoryData] = useState<GlycemiaRecord[]>([]);

  // Carregar registros do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem('heitor-glycemia-records');
    if (stored) {
      try {
        setHistoryData(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar registros:', e);
      }
    }
  }, []);

  // Salvar registros no localStorage sempre que mudar
  useEffect(() => {
    if (historyData.length > 0) {
      localStorage.setItem('heitor-glycemia-records', JSON.stringify(historyData));
    } else {
      localStorage.removeItem('heitor-glycemia-records');
    }
  }, [historyData]);

  const getMood = (value: number) => {
    if (!value) return "neutral";
    if (value >= 80 && value <= 130) return "happy";
    if (value >= 70 && value <= 150) return "neutral";
    return "tired";
  };

  const getRecommendation = (value: number) => {
    if (!value) return null;
    
    if (value < 70) {
      return {
        type: "danger",
        icon: "⚠️",
        title: "Glicemia Baixa - Atenção!",
        message: "O Heitor precisa de açúcar rápido agora!",
        actions: [
          "🥤 Dar suco de fruta ou refrigerante comum",
          "🍬 Ou 3-4 balas mastigáveis",
          "🍯 Ou 1 colher de sopa de mel",
          "⏱️ Aguardar 15 minutos e medir novamente"
        ],
        symptoms: ["Tremor", "Suor", "Tontura", "Fraqueza", "Fome", "Irritação"]
      };
    }
    
    if (value >= 70 && value < 80) {
      return {
        type: "warning",
        icon: "⚡",
        title: "Glicemia um pouco baixa",
        message: "Atenção, pode precisar de um lanche leve",
        actions: [
          "🍎 Oferecer uma fruta",
          " Ou um copo de leite",
          "👀 Observar sintomas nas próximas horas"
        ],
        symptoms: []
      };
    }
    
    if (value >= 80 && value <= 130) {
      return {
        type: "success",
        icon: "✨",
        title: "Perfeito! Continue assim!",
        message: "A glicemia do Heitor está na faixa ideal",
        actions: [
          "💧 Manter hidratação com água",
          "🎮 Aproveitar para brincar e se divertir",
          "📊 Manter rotina de medições"
        ],
        symptoms: []
      };
    }
    
    if (value > 130 && value <= 180) {
      return {
        type: "warning",
        icon: "📈",
        title: "Glicemia um pouco alta",
        message: "Vamos prestar atenção e agir",
        actions: [
          "💧 Oferecer bastante água",
          "🚶 Fazer atividade física leve",
          "⏰ Verificar se é hora da insulina",
          "📞 Seguir orientação médica para correção"
        ],
        symptoms: []
      };
    }
    
    return {
      type: "danger",
      icon: "🚨",
      title: "Glicemia Alta - Atenção!",
      message: "É importante agir para baixar a glicemia",
      actions: [
        "💧 Dar bastante água para hidratar",
        "💉 Verificar se precisa de insulina de correção",
        "🩺 Verificar se há cetona na urina",
        "📞 Considerar contato com médico se não melhorar"
      ],
      symptoms: ["Sede", "Urinar muito", "Cansaço", "Visão turva", "Dor de cabeça"]
    };
  };

  const handleSave = () => {
    if (value) {
      const now = new Date();
      const newRecord: GlycemiaRecord = {
        id: Date.now().toString(),
        value: parseInt(value),
        insulin: insulin ? parseFloat(insulin) : undefined,
        notes: notes || undefined,
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: "good",
        trend: "stable"
      };
      
      const updatedHistory = [newRecord, ...historyData];
      setHistoryData(updatedHistory);
      
      // Salvar no localStorage - última leitura
      localStorage.setItem('heitor_last_reading', JSON.stringify({
        value: parseInt(value),
        time: "agora",
        timestamp: now.toISOString()
      }));
      
      // Salvar todos os registros
      localStorage.setItem('heitor_glycemia_records', JSON.stringify(
        updatedHistory.map(r => ({
          ...r,
          timestamp: r.timestamp || now.toISOString()
        }))
      ));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setValue("");
        setInsulin("");
        setNotes("");
      }, 5000);
    }
  };

  const handleDelete = (id: string) => {
    setHistoryData(historyData.filter(record => record.id !== id));
  };

  const handleEdit = (id: string, currentValue: number, currentInsulin?: number, currentNotes?: string) => {
    setEditingId(id);
    setEditValue(currentValue.toString());
    setEditInsulin(currentInsulin?.toString() || "");
    setEditNotes(currentNotes || "");
  };

  const handleSaveEdit = (id: string) => {
    setHistoryData(historyData.map(record => 
      record.id === id 
        ? { 
            ...record, 
            value: parseInt(editValue),
            insulin: editInsulin ? parseFloat(editInsulin) : undefined,
            notes: editNotes || undefined
          }
        : record
    ));
    setEditingId(null);
    setEditValue("");
    setEditInsulin("");
    setEditNotes("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
    setEditInsulin("");
    setEditNotes("");
  };

  const currentMood = getMood(parseInt(value));
  const recommendation = getRecommendation(parseInt(value));
  
  // Preparar dados para o gráfico (ordem inversa para mostrar do mais antigo ao mais recente)
  const chartData = [...historyData].reverse().map((record, index) => ({
    name: record.time,
    valor: record.value,
    index: index, // Index único para evitar colisões
  }));
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PhoneMockup>
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24 overflow-y-auto">
          {/* Header */}
          <div className="px-6 pt-14 pb-6">
            <button
              onClick={() => navigate('/home')}
              className="mb-6 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <HeitorAvatar mood={showSuccess ? "happy" : currentMood} size="md" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Registrar Glicemia
                </h1>
                <p className="text-sm text-gray-500">
                  Como está hoje?
                </p>
              </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 animate-in slide-in-from-top shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2.5 rounded-xl shadow-sm shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-green-800 text-base">Boa! Missão cumprida 🎉</p>
                    <p className="text-sm text-green-600">Registro salvo com sucesso</p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Valor da glicemia
              </label>
              <div className="flex items-end gap-3 mb-6">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0"
                  className="text-5xl font-bold text-gray-800 bg-transparent outline-none w-full"
                />
                <span className="text-lg text-gray-400 mb-2 font-medium">mg/dL</span>
              </div>

              <div className="h-px bg-gray-200 mb-6"></div>

              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Insulina administrada (opcional)
              </label>
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="number"
                  step="0.5"
                  value={insulin}
                  onChange={(e) => setInsulin(e.target.value)}
                  placeholder="0"
                  className="text-2xl font-semibold text-gray-800 bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 flex-1 min-w-0 focus:border-blue-400 transition-colors"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap font-medium">unidades</span>
              </div>

              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Observações ou sintomas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Após lanche, sentiu tontura..."
                className="w-full h-24 text-sm text-gray-800 bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 resize-none mb-6 focus:border-blue-400 transition-colors"
              />

              <button
                onClick={handleSave}
                disabled={!value}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl py-4 font-semibold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar registro
              </button>
            </div>

            {/* Recommendation Card */}
            {recommendation && (
              <div className={`rounded-2xl p-6 shadow-sm border mb-6 ${
                recommendation.type === 'danger' ? 'bg-red-50 border-red-200' :
                recommendation.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-sm shrink-0">
                    <span className="text-2xl">{recommendation.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-1 ${
                      recommendation.type === 'danger' ? 'text-red-800' :
                      recommendation.type === 'warning' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                      {recommendation.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      recommendation.type === 'danger' ? 'text-red-700' :
                      recommendation.type === 'warning' ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      {recommendation.message}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className={`text-sm font-semibold ${
                    recommendation.type === 'danger' ? 'text-red-800' :
                    recommendation.type === 'warning' ? 'text-yellow-800' :
                    'text-green-800'
                  }`}>
                    O que fazer:
                  </p>
                  <ul className="space-y-1.5">
                    {recommendation.actions.map((action, idx) => (
                      <li key={idx} className={`text-sm ${
                        recommendation.type === 'danger' ? 'text-red-700' :
                        recommendation.type === 'warning' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {recommendation.symptoms.length > 0 && (
                  <div className={`mt-4 pt-4 border-t ${
                    recommendation.type === 'danger' ? 'border-red-200' :
                    recommendation.type === 'warning' ? 'border-yellow-200' :
                    'border-green-200'
                  }`}>
                    <p className={`text-sm font-semibold mb-2 ${
                      recommendation.type === 'danger' ? 'text-red-800' :
                      recommendation.type === 'warning' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                      Sintomas comuns:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.symptoms.map((symptom, idx) => (
                        <span key={idx} className={`text-xs px-2.5 py-1 rounded-full ${
                          recommendation.type === 'danger' ? 'bg-red-100 text-red-700' :
                          recommendation.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Histórico recente
                </h2>
                <button
                  onClick={() => navigate('/historico')}
                  className="text-sm text-blue-600 font-medium hover:text-blue-700 active:scale-95 transition-all"
                >
                  Ver tudo →
                </button>
              </div>
              <div className="space-y-3">
                {historyData.length === 0 ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center border border-blue-100">
                    <p className="text-sm text-gray-600 mb-1">📊 Nenhum registro ainda</p>
                    <p className="text-xs text-gray-500">Adicione sua primeira medição acima</p>
                  </div>
                ) : (
                  historyData.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                      {editingId === item.id ? (
                        // Modo de edição
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 text-2xl font-semibold text-gray-800 bg-gray-50 rounded-xl px-4 py-2 outline-none border border-gray-200"
                            />
                            <span className="text-sm text-gray-400">mg/dL</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editInsulin}
                              onChange={(e) => setEditInsulin(e.target.value)}
                              className="flex-1 text-2xl font-semibold text-gray-800 bg-gray-50 rounded-xl px-4 py-2 outline-none border border-gray-200"
                            />
                            <span className="text-sm text-gray-400">unidades</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Ex: Após lanche"
                              className="flex-1 text-2xl font-semibold text-gray-800 bg-gray-50 rounded-xl px-4 py-2 outline-none border border-gray-200"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm font-medium active:scale-[0.98] transition-transform"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium active:scale-[0.98] transition-transform"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Modo de visualização
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-xl">
                              {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                              {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-green-600" />}
                              {item.trend === 'stable' && <Minus className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {item.value} <span className="text-sm text-gray-400">mg/dL</span>
                              </p>
                              {item.insulin && (
                                <p className="text-xs text-blue-600">
                                  💉 {item.insulin} unidades
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-xs text-gray-500">
                                  {item.notes}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 px-3 py-1.5 rounded-full">
                              <span className="text-xs font-medium text-green-700">Ótimo</span>
                            </div>
                            <button
                              onClick={() => handleEdit(item.id, item.value, item.insulin, item.notes)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chart */}
            {historyData.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Gráfico de Glicemia
                </h2>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name"
                        tick={{ fontSize: 10, fill: '#6b7280' }}
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        domain={[50, 200]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '8px 12px'
                        }}
                        labelStyle={{ color: '#374151', fontWeight: 600 }}
                        itemStyle={{ color: '#3b82f6' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valor" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 5 }}
                        activeDot={{ r: 7, fill: '#2563eb' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Legenda */}
                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Faixa ideal (80-130)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-gray-600">Alerta (&lt;70 ou &gt;180)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </PhoneMockup>
    </div>
  );
}