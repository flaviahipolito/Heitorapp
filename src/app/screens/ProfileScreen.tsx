import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, Calendar, Heart, Award, Settings, Edit2, Save, X, Bell, Moon, Volume2, Database, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

interface ProfileData {
  name: string;
  birthDate: string; // formato ISO YYYY-MM-DD
  gender: 'male' | 'female';
  glucoseMin: number;
  glucoseMax: number;
  conditions: string[]; // array de condições de saúde
  allergies: string;
  favorites: string;
  restrictions: string;
}

export function ProfileScreen() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Valores padrão
  const defaultProfile: ProfileData = {
    name: "Heitor",
    birthDate: "2019-06-13",
    gender: "male",
    glucoseMin: 80,
    glucoseMax: 130,
    conditions: ["Diabetes Tipo 1", "Doença Celíaca"],
    allergies: "Glúten",
    favorites: "Frango, Arroz, Banana",
    restrictions: "Sem glúten"
  };

  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [editedData, setEditedData] = useState<ProfileData>(defaultProfile);

  // Configurações do app
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    darkMode: false,
    reminderInterval: 4, // horas
  });

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedProfile = localStorage.getItem('heitor_profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfileData(parsed);
      setEditedData(parsed);
    }

    const storedSettings = localStorage.getItem('heitor_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  // Calcular idade a partir da data de nascimento
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Formatar data para exibição
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleSave = () => {
    // Validar dados
    if (!editedData.name.trim()) {
      alert("Nome não pode estar vazio!");
      return;
    }
    
    if (editedData.glucoseMin >= editedData.glucoseMax) {
      alert("O valor mínimo deve ser menor que o máximo!");
      return;
    }

    // Salvar no estado e localStorage
    setProfileData(editedData);
    localStorage.setItem('heitor_profile', JSON.stringify(editedData));
    
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleSettingToggle = (setting: keyof typeof settings) => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting]
    };
    setSettings(newSettings);
    localStorage.setItem('heitor_settings', JSON.stringify(newSettings));
    
    if (setting === 'darkMode') {
      toggleDarkMode();
    }
  };

  const handleReminderChange = (hours: number) => {
    const newSettings = { ...settings, reminderInterval: hours };
    setSettings(newSettings);
    localStorage.setItem('heitor_settings', JSON.stringify(newSettings));
  };

  const handleClearAllData = () => {
    if (confirm('⚠️ Tem certeza que deseja limpar TODOS os dados do app?\n\nIsso vai apagar:\n• Histórico de glicemia\n• Receitas salvas\n• Últimas medições\n• Dias ativos\n• Configurações personalizadas\n\nEssa ação não pode ser desfeita!')) {
      // Limpar TODOS os dados do localStorage relacionados ao app
      // Lista completa de chaves usadas no app:
      const keysToRemove = [
        'heitor-glycemia-records',     // GlycemiaScreen - histórico
        'heitor-saved-recipes',        // RecipesScreen - receitas salvas
        'heitor_last_reading',         // HomeScreen/GlycemiaScreen - última medição
        'heitor_glycemia_records',     // HomeScreen - registros para análise
        'heitor_active_days',          // (se existir) dias ativos
        'heitor_profile',              // ProfileScreen - dados do perfil
        'heitor_settings',             // ProfileScreen - configurações
      ];
      
      // Remover cada chave individualmente
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Limpar TUDO do localStorage (garantia extra)
      // Vamos iterar por todas as chaves e remover as que começam com 'heitor'
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (key.toLowerCase().includes('heitor')) {
          localStorage.removeItem(key);
        }
      });
      
      alert('✅ Todos os dados foram limpos com sucesso!\n\nA página será recarregada agora.');
      
      // Recarregar a página para aplicar mudanças
      window.location.reload();
    }
  };

  const age = calculateAge(profileData.birthDate);
  
  // Calcular sequência real de dias ativos baseado nos registros
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    const storedRecords = localStorage.getItem('heitor-glycemia-records');
    if (storedRecords) {
      try {
        const records = JSON.parse(storedRecords);
        // Contar dias únicos com registros
        const uniqueDates = new Set(records.map((r: any) => {
          const date = new Date(r.timestamp || new Date());
          return date.toDateString();
        }));
        setStreak(uniqueDates.size);
      } catch (e) {
        console.error('Erro ao calcular sequência:', e);
        setStreak(0);
      }
    } else {
      setStreak(0);
    }
  }, []);

  // Se estiver em configurações, mostrar tela de configurações
  if (showSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <PhoneMockup>
          <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white pb-24 overflow-y-auto">
            <div className="px-6 pt-14 pb-6">
              <button
                onClick={() => setShowSettings(false)}
                className="mb-6 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>

              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Configurações
              </h1>

              {/* Notificações */}
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Notificações
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => handleSettingToggle('notifications')}
                    className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2.5 rounded-xl shrink-0">
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">Notificações push</p>
                        <p className="text-xs text-gray-500">Receber lembretes de medições</p>
                      </div>
                    </div>
                    <div className={`w-12 h-7 rounded-full transition-colors shrink-0 ${settings.notifications ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${settings.notifications ? 'ml-6' : 'ml-1'} shadow-sm`}></div>
                    </div>
                  </button>
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Intervalo de lembretes</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[2, 4, 6, 8].map((hours) => (
                        <button
                          key={hours}
                          onClick={() => handleReminderChange(hours)}
                          className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
                            settings.reminderInterval === hours
                              ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {hours}h
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Aparência e Som */}
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Aparência e Som
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => handleSettingToggle('soundEffects')}
                    className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
                        <Volume2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-medium text-gray-800 text-sm">Efeitos sonoros</p>
                        <p className="text-xs text-gray-500">Sons ao registrar medições</p>
                      </div>
                    </div>
                    <div className={`w-12 h-7 rounded-full transition-colors shrink-0 ${settings.soundEffects ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${settings.soundEffects ? 'ml-6' : 'ml-1'} shadow-sm`}></div>
                    </div>
                  </button>
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <button
                    onClick={() => {
                      handleSettingToggle('darkMode');
                    }}
                    className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2.5 rounded-xl shrink-0">
                        <Moon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-medium text-gray-800 text-sm">Modo escuro</p>
                        <p className="text-xs text-gray-500">Ative o tema escuro</p>
                      </div>
                    </div>
                    <div className={`w-12 h-7 rounded-full transition-colors shrink-0 ${isDarkMode ? 'bg-purple-500' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${isDarkMode ? 'ml-6' : 'ml-1'} shadow-sm`}></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dados */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Dados
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={handleClearAllData}
                    className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Database className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">Limpar todos os dados</p>
                        <p className="text-xs text-gray-500">Remove registros e configurações</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Sobre */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-2">HeitorApp v1.0</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Aplicativo para controle de glicemia e alimentação segura, desenvolvido com carinho para o cuidado diário do Heitor.
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  © 2025 • Feito com 💙
                </p>
              </div>
            </div>
          </div>
          <BottomNav />
        </PhoneMockup>
      </div>
    );
  }

  // Tela principal do perfil
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PhoneMockup>
        <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white pb-24 overflow-y-auto">
          <div className="p-6 pt-14 pb-6">
            <button
              onClick={() => navigate('/home')}
              className="mb-4 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 animate-in slide-in-from-top">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Perfil atualizado! 🎉</p>
                    <p className="text-sm text-green-600">Suas informações foram salvas</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col items-center">
                <HeitorAvatar mood="happy" size="lg" gender={isEditing ? editedData.gender : profileData.gender} />
                {isEditing ? (
                  <div className="w-full mt-4 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Nome</label>
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="w-full text-2xl font-semibold text-gray-800 text-center bg-gray-50 rounded-xl px-4 py-2 outline-none border border-gray-200"
                      />
                    </div>
                    
                    {/* Seleção de Gênero */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Gênero</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditedData({ ...editedData, gender: 'male' })}
                          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                            editedData.gender === 'male'
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          👦 Masculino
                        </button>
                        <button
                          onClick={() => setEditedData({ ...editedData, gender: 'female' })}
                          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                            editedData.gender === 'female'
                              ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          👧 Feminino
                        </button>
                      </div>
                    </div>
                    
                    {/* Seleção de Condições de Saúde */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Condições de saúde</label>
                      <div className="space-y-2">
                        {['Diabetes Tipo 1', 'Diabetes Tipo 2', 'Doença Celíaca', 'Intolerância à Lactose', 'Alergia Alimentar'].map((condition) => (
                          <button
                            key={condition}
                            onClick={() => {
                              const newConditions = editedData.conditions.includes(condition)
                                ? editedData.conditions.filter(c => c !== condition)
                                : [...editedData.conditions, condition];
                              setEditedData({ ...editedData, conditions: newConditions });
                            }}
                            className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between ${
                              editedData.conditions.includes(condition)
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span>{condition}</span>
                            {editedData.conditions.includes(condition) && (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-1">
                      {profileData.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{age} anos</p>
                  </>
                )}
                
                {!isEditing && (
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {profileData.conditions.map((condition, idx) => (
                      <span key={idx} className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                        profileData.gender === 'female' 
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {condition}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 mb-6">
              {/* Data de Nascimento */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2.5 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Data de nascimento</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedData.birthDate}
                        onChange={(e) => setEditedData({ ...editedData, birthDate: e.target.value })}
                        className="w-full font-semibold text-gray-800 bg-gray-50 rounded-lg px-3 py-1.5 outline-none border border-gray-200"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{formatDate(profileData.birthDate)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta de Glicemia */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Meta de glicemia</p>
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <input
                          type="number"
                          value={editedData.glucoseMin}
                          onChange={(e) => setEditedData({ ...editedData, glucoseMin: parseInt(e.target.value) })}
                          className="w-16 font-semibold text-gray-800 bg-gray-50 rounded-lg px-2 py-1.5 outline-none border border-gray-200 text-sm"
                        />
                        <span className="text-gray-500 text-sm">-</span>
                        <input
                          type="number"
                          value={editedData.glucoseMax}
                          onChange={(e) => setEditedData({ ...editedData, glucoseMax: parseInt(e.target.value) })}
                          className="w-16 font-semibold text-gray-800 bg-gray-50 rounded-lg px-2 py-1.5 outline-none border border-gray-200 text-sm"
                        />
                        <span className="text-xs text-gray-500 whitespace-nowrap">mg/dL</span>
                      </div>
                    ) : (
                      <p className="font-semibold text-gray-800 text-sm">
                        {profileData.glucoseMin} - {profileData.glucoseMax} mg/dL
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sequência */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2.5 rounded-xl">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Sequência de registros</p>
                    <p className="font-semibold text-gray-800">{streak} dias 🔥</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Preferências alimentares
              </h2>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Alergias e intolerâncias</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.allergies}
                        onChange={(e) => setEditedData({ ...editedData, allergies: e.target.value })}
                        placeholder="Ex: Glúten, Lactose"
                        className="w-full text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 outline-none border border-gray-200"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profileData.allergies.split(',').map((item, idx) => (
                          <span key={idx} className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full border border-red-200">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Alimentos favoritos</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.favorites}
                        onChange={(e) => setEditedData({ ...editedData, favorites: e.target.value })}
                        placeholder="Ex: Frango, Arroz, Banana"
                        className="w-full text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 outline-none border border-gray-200"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profileData.favorites.split(',').map((item, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Restrições adicionais</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.restrictions}
                        onChange={(e) => setEditedData({ ...editedData, restrictions: e.target.value })}
                        placeholder="Ex: Sem glúten, Baixo açúcar"
                        className="w-full text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 outline-none border border-gray-200"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profileData.restrictions.split(',').map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing ? (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl py-4 font-semibold shadow-lg shadow-green-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-4 font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-gray-300"
                >
                  <X className="w-5 h-5" />
                  <span>Cancelar</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleEdit}
                  className="w-full bg-blue-500 text-white rounded-2xl py-4 font-semibold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Editar perfil
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full bg-gray-100 text-gray-700 rounded-2xl py-4 font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  Configurações
                </button>
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </PhoneMockup>
    </div>
  );
}