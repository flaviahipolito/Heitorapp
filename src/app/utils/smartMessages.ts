// Sistema de mensagens inteligentes baseado em regras

export interface SmartMessage {
  type: 'positive' | 'neutral' | 'attention' | 'missing' | 'reengage';
  title: string;
  message: string;
  icon: string;
  mood: 'happy' | 'neutral' | 'tired';
  color: string;
  bgColor: string;
}

interface UserActivity {
  lastReadingTime?: Date;
  lastReadingValue?: number;
  recentReadings?: number[];
  totalRecords: number;
  daysActive: number;
  consecutiveDays: number;
}

export function generateSmartMessage(activity: UserActivity): SmartMessage {
  const now = new Date();
  
  // 1. Estado de reengajamento (não usa há 3+ dias)
  if (activity.lastReadingTime) {
    const hoursSinceLastReading = (now.getTime() - activity.lastReadingTime.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastReading > 72) { // 3 dias
      return {
        type: 'reengage',
        title: 'Sentimos sua falta!',
        message: 'Vamos retomar o cuidado com o Heitor? Estamos aqui para ajudar 💙',
        icon: '💙',
        mood: 'neutral',
        color: 'text-blue-600',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
      };
    }
    
    // 2. Estado sem registro (6+ horas desde última medição)
    if (hoursSinceLastReading > 6) {
      return {
        type: 'missing',
        title: 'Já faz um tempinho...',
        message: 'Já faz um tempinho desde a última medição… vamos registrar agora?',
        icon: '⏰',
        mood: 'tired',
        color: 'text-purple-600',
        bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
      };
    }
  }
  
  // 3. Estado de atenção (últimas medições altas)
  if (activity.recentReadings && activity.recentReadings.length >= 2) {
    const recentHigh = activity.recentReadings.slice(0, 3).filter(v => v > 140);
    if (recentHigh.length >= 2) {
      return {
        type: 'attention',
        title: 'Vamos acompanhar de perto',
        message: 'As últimas medições estão um pouco altas. Vamos acompanhar mais de perto hoje?',
        icon: '🩺',
        mood: 'tired',
        color: 'text-orange-600',
        bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100'
      };
    }
  }
  
  // 4. Estado positivo (uso consistente + valores bons)
  if (activity.consecutiveDays >= 3 && activity.lastReadingValue && 
      activity.lastReadingValue >= 80 && activity.lastReadingValue <= 130) {
    return {
      type: 'positive',
      title: 'Muito bem!',
      message: 'Você está cuidando super bem do Heitor hoje! Continue assim 👏',
      icon: '⭐',
      mood: 'happy',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
    };
  }
  
  // 5. Estado neutro (default)
  return {
    type: 'neutral',
    title: 'Tudo certo por aqui!',
    message: 'Continue acompanhando ao longo do dia. O Heitor conta com você 😊',
    icon: '💚',
    mood: 'neutral',
    color: 'text-teal-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100'
  };
}

// Função para calcular atividade do usuário
export function calculateUserActivity(records: any[]): UserActivity {
  if (!records || records.length === 0) {
    return {
      totalRecords: 0,
      daysActive: 0,
      consecutiveDays: 0
    };
  }
  
  // Ordena registros por data (mais recente primeiro)
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.timestamp || b.time).getTime() - new Date(a.timestamp || a.time).getTime()
  );
  
  const lastReading = sortedRecords[0];
  const lastReadingTime = new Date(lastReading.timestamp || lastReading.time);
  const lastReadingValue = lastReading.value;
  
  // Pega os últimos 5 valores
  const recentReadings = sortedRecords.slice(0, 5).map(r => r.value);
  
  // Calcula dias únicos com registros
  const uniqueDays = new Set(
    sortedRecords.map(r => {
      const date = new Date(r.timestamp || r.time);
      return date.toDateString();
    })
  );
  
  // Calcula dias consecutivos
  let consecutiveDays = 1;
  const today = new Date().toDateString();
  let currentDate = new Date();
  
  for (let i = 0; i < 30; i++) {
    const dateStr = currentDate.toDateString();
    if (uniqueDays.has(dateStr)) {
      if (dateStr !== today) {
        consecutiveDays++;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return {
    lastReadingTime,
    lastReadingValue,
    recentReadings,
    totalRecords: records.length,
    daysActive: uniqueDays.size,
    consecutiveDays
  };
}
