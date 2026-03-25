import { PhoneMockup } from "../components/PhoneMockup";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar } from "recharts";

interface GlycemiaRecord {
  id: string;
  value: number;
  insulin?: number;
  notes?: string;
  symptoms?: string[];
  time: string;
  date: string;
  status: string;
  trend: "up" | "down" | "stable";
}

export function HistoryScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "low" | "good" | "high">("all");

  // Carregar dados do localStorage
  const [historyData, setHistoryData] = useState<GlycemiaRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('heitor-glycemia-records');
    if (stored) {
      try {
        const records = JSON.parse(stored);
        // Adicionar propriedade 'date' se não existir
        const recordsWithDate = records.map((record: any) => ({
          ...record,
          date: record.date || 'Hoje'
        }));
        setHistoryData(recordsWithDate);
      } catch (e) {
        console.error('Erro ao carregar registros:', e);
      }
    }
  }, []);

  // Filtrar dados
  const filteredData = historyData.filter(item => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    return true;
  });

  // Calcular estatísticas
  const stats = {
    average: Math.round(filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length),
    min: Math.min(...filteredData.map(item => item.value)),
    max: Math.max(...filteredData.map(item => item.value)),
    inRange: filteredData.filter(item => item.value >= 80 && item.value <= 130).length,
    total: filteredData.length,
  };

  const percentInRange = Math.round((stats.inRange / stats.total) * 100);

  // Dados para gráfico de tendência
  const chartData = [...filteredData].reverse().slice(-10).map((record) => ({
    name: `${record.date} ${record.time}`,
    valor: record.value,
  }));

  // Dados para gráfico de distribuição
  const distributionData = [
    { name: 'Baixa (<70)', count: filteredData.filter(i => i.value < 70).length, fill: '#ef4444' },
    { name: 'Normal (70-80)', count: filteredData.filter(i => i.value >= 70 && i.value < 80).length, fill: '#f59e0b' },
    { name: 'Ideal (80-130)', count: filteredData.filter(i => i.value >= 80 && i.value <= 130).length, fill: '#10b981' },
    { name: 'Alta (130-180)', count: filteredData.filter(i => i.value > 130 && i.value <= 180).length, fill: '#f59e0b' },
    { name: 'Muito alta (>180)', count: filteredData.filter(i => i.value > 180).length, fill: '#ef4444' },
  ];

  // Agrupar por data
  const groupedByDate = filteredData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, GlycemiaRecord[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-red-100 border-red-200 text-red-700";
      case "high":
        return "bg-orange-100 border-orange-200 text-orange-700";
      default:
        return "bg-green-100 border-green-200 text-green-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "low":
        return "Baixa";
      case "high":
        return "Alta";
      default:
        return "Ótimo";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PhoneMockup>
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24 overflow-y-auto">
          {/* Header */}
          <div className="p-6 pt-14 pb-6">
            <button
              onClick={() => navigate('/glicemia')}
              className="mb-4 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                📊 Histórico Completo
              </h1>
              <p className="text-sm text-gray-500">
                Acompanhe a evolução da glicemia
              </p>
            </div>

            {historyData.length === 0 ? (
              // Estado vazio
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-blue-100 mb-6">
                  <p className="text-4xl mb-4">📊</p>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Nenhum registro ainda</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Comece registrando sua primeira medição de glicemia
                  </p>
                  <button
                    onClick={() => navigate('/glicemia')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
                  >
                    Registrar primeira medição
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Média</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.average}</p>
                    <p className="text-xs text-gray-400">mg/dL</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Na faixa ideal</p>
                    <p className="text-2xl font-bold text-green-600">{percentInRange}%</p>
                    <p className="text-xs text-gray-400">{stats.inRange} de {stats.total}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Mínima</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.min}</p>
                    <p className="text-xs text-gray-400">mg/dL</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Máxima</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.max}</p>
                    <p className="text-xs text-gray-400">mg/dL</p>
                  </div>
                </div>

                {/* Gráfico de Tendência */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Tendência (últimos 10 registros)</h3>
                  <ResponsiveContainer width="100%" height={180}>
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
                      <ReferenceLine y={130} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                      <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 8, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        hide
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        domain={[50, 200]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valor" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6, fill: '#2563eb' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de Distribuição */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Distribuição de valores</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={distributionData}
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
                        tick={{ fontSize: 9, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        stroke="#9ca3af"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Filtros */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                      statusFilter === "all"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setStatusFilter("good")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                      statusFilter === "good"
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    ✓ Ideais
                  </button>
                  <button
                    onClick={() => setStatusFilter("low")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                      statusFilter === "low"
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    ↓ Baixas
                  </button>
                  <button
                    onClick={() => setStatusFilter("high")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                      statusFilter === "high"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    ↑ Altas
                  </button>
                </div>

                {/* Lista de registros agrupados por data */}
                <div className="space-y-6">
                  {Object.entries(groupedByDate).map(([date, records]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <h3 className="text-sm font-semibold text-gray-700">{date}</h3>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                      <div className="space-y-3">
                        {records.map((item) => (
                          <div
                            key={item.id}
                            className={`rounded-2xl p-4 shadow-sm border ${getStatusColor(item.status)}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${
                                  item.status === 'low' ? 'bg-red-200' :
                                  item.status === 'high' ? 'bg-orange-200' :
                                  'bg-green-200'
                                }`}>
                                  {item.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                                  {item.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                                  {item.trend === 'stable' && <Minus className="w-4 h-4" />}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">
                                    {item.value} <span className="text-sm font-normal">mg/dL</span>
                                  </p>
                                  <p className="text-xs opacity-75">{item.time}</p>
                                </div>
                              </div>
                              <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                item.status === 'low' ? 'bg-red-200' :
                                item.status === 'high' ? 'bg-orange-200' :
                                'bg-green-200'
                              }`}>
                                {getStatusLabel(item.status)}
                              </div>
                            </div>
                            
                            {item.insulin && (
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-xs">💉</span>
                                <span className="text-xs font-medium">{item.insulin} unidades de insulina</span>
                              </div>
                            )}
                            
                            {item.notes && (
                              <div className="flex items-start gap-1.5 mb-1">
                                <span className="text-xs">📝</span>
                                <span className="text-xs">{item.notes}</span>
                              </div>
                            )}
                            
                            {item.symptoms && item.symptoms.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.symptoms.map((symptom, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      item.status === 'low' ? 'bg-red-200' :
                                      item.status === 'high' ? 'bg-orange-200' :
                                      'bg-green-200'
                                    }`}
                                  >
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão de exportar */}
                <button className="w-full mt-6 bg-white border-2 border-blue-500 text-blue-600 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                  <Download className="w-5 h-5" />
                  Exportar histórico (PDF)
                </button>
              </>
            )}
          </div>
        </div>
        <BottomNav />
      </PhoneMockup>
    </div>
  );
}