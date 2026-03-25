import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { BottomNav } from "../components/BottomNav";
import { Activity, ChefHat, TrendingUp, ArrowLeft, Check, TrendingDown, Minus, Sparkles, ShieldCheck, Activity as ActivityIcon, Calendar, Heart, Award, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router";

export function ShowcaseView() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">HeitorApp</h1>
          <p className="text-xl text-gray-600 mb-6">
            Controle de glicemia e alimentação segura com carinho
          </p>
          
          {/* Botão para showcase de mensagens */}
          <button
            onClick={() => navigate('/mensagens')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:shadow-xl transition-all active:scale-95"
          >
            <Lightbulb className="w-5 h-5" />
            Ver Sistema de Mensagens Inteligentes
          </button>
        </div>

        {/* Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Home Screen */}
          <div>
            <h3 className="text-center font-semibold text-gray-700 mb-4">Tela Inicial</h3>
            <PhoneMockup className="scale-[0.85] origin-top">
              <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24">
                <div className="p-6 pt-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                        Olá, Heitor 👋
                      </h1>
                      <p className="text-sm text-gray-500">
                        Terça-feira, 24 de Março
                      </p>
                    </div>
                    <HeitorAvatar mood="happy" size="md" />
                  </div>

                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Última medição</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-semibold text-green-600">105</span>
                          <span className="text-sm text-gray-500">mg/dL</span>
                        </div>
                      </div>
                      <div className="bg-green-100 p-2.5 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium text-green-600">Ótimo!</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Há 2 horas</p>
                  </div>

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

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-blue-600 mb-1">7</p>
                      <p className="text-xs text-gray-500">Dias ativos</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-green-600 mb-1">23</p>
                      <p className="text-xs text-gray-500">Registros</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-semibold text-yellow-600 mb-1">12</p>
                      <p className="text-xs text-gray-500">Receitas</p>
                    </div>
                  </div>
                </div>
              </div>
              <BottomNav />
            </PhoneMockup>
          </div>

          {/* Glycemia Screen */}
          <div>
            <h3 className="text-center font-semibold text-gray-700 mb-4">Registro de Glicemia</h3>
            <PhoneMockup className="scale-[0.85] origin-top">
              <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-24">
                <div className="p-6 pt-14">
                  <button className="mb-4 p-2 rounded-xl">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <HeitorAvatar mood="neutral" size="md" />
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800">
                        Registrar Glicemia
                      </h1>
                      <p className="text-sm text-gray-500">
                        Como está hoje?
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-3">
                      Valor da glicemia
                    </label>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-5xl font-semibold text-gray-300">98</span>
                      <span className="text-xl text-gray-400 mb-2">mg/dL</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-4 font-semibold shadow-lg shadow-blue-200">
                      Salvar registro
                    </button>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Histórico recente
                    </h2>
                    <div className="space-y-3">
                      {[
                        { value: 105, time: "14:30", Icon: TrendingUp },
                        { value: 98, time: "11:45", Icon: Minus },
                        { value: 112, time: "08:20", Icon: TrendingUp },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 p-2 rounded-xl">
                                <item.Icon className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {item.value} <span className="text-sm text-gray-400">mg/dL</span>
                                </p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                              </div>
                            </div>
                            <div className="bg-green-100 px-3 py-1.5 rounded-full">
                              <span className="text-xs font-medium text-green-700">Ótimo</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <BottomNav />
            </PhoneMockup>
          </div>

          {/* Recipes Screen */}
          <div>
            <h3 className="text-center font-semibold text-gray-700 mb-4">Receitas Seguras</h3>
            <PhoneMockup className="scale-[0.85] origin-top">
              <div className="flex flex-col h-full bg-gradient-to-b from-yellow-50 to-white pb-24 overflow-y-auto">
                <div className="p-6 pt-14">
                  <button className="mb-4 p-2 rounded-xl">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <HeitorAvatar mood="happy" size="md" />
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800">
                        Receitas Seguras
                      </h1>
                      <p className="text-sm text-gray-500">
                        Vamos cozinhar algo gostoso!
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-3">
                      Quais ingredientes você tem?
                    </label>
                    <textarea
                      placeholder="Ex: frango, brócolis, cenoura..."
                      className="w-full h-24 text-gray-800 bg-gray-50 rounded-xl p-4 outline-none resize-none border border-gray-200"
                    />

                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl py-4 font-semibold shadow-lg shadow-yellow-200 mt-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Gerar receita
                    </button>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Receitas salvas
                    </h2>
                    <div className="space-y-3">
                      {['Panqueca de Banana', 'Tapioca com Queijo', 'Cookies de Aveia'].map((recipe, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">{recipe}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                Sem glúten
                              </span>
                            </div>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded-xl">
                            <Sparkles className="w-4 h-4 text-yellow-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <BottomNav />
            </PhoneMockup>
          </div>

          {/* Profile Screen */}
          <div>
            <h3 className="text-center font-semibold text-gray-700 mb-4">Perfil</h3>
            <PhoneMockup className="scale-[0.85] origin-top">
              <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white pb-24 overflow-y-auto">
                <div className="p-6 pt-14">
                  <button className="mb-4 p-2 rounded-xl">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col items-center">
                      <HeitorAvatar mood="happy" size="lg" />
                      <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-1">
                        Heitor
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">5 anos</p>
                      
                      <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          Tipo 1
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          Celíaco
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2.5 rounded-xl">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Data de nascimento</p>
                          <p className="font-semibold text-gray-800">13 de Junho, 2019</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2.5 rounded-xl">
                          <Heart className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Meta de glicemia</p>
                          <p className="font-semibold text-gray-800">80 - 130 mg/dL</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2.5 rounded-xl">
                          <Award className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Sequência de registros</p>
                          <p className="font-semibold text-gray-800">7 dias 🔥</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Preferências alimentares
                    </h2>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Alergias</span>
                          <span className="text-sm font-medium text-gray-900">Glúten</span>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Alimentos favoritos</span>
                          <span className="text-sm font-medium text-gray-900">Frango, Arroz</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <BottomNav />
            </PhoneMockup>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Design por Figma Make • Feito com ❤️ para o Heitor</p>
        </div>
      </div>
    </div>
  );
}