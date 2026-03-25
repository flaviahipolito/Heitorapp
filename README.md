# 💙 HeitorApp

<div align="center">

**Aplicativo mobile para controle de glicemia e alimentação segura**

*Desenvolvido com carinho para auxiliar no cuidado diário de crianças com Diabetes e Doença Celíaca*

</div>

---

## 📱 Sobre o Projeto

O **HeitorApp** é um aplicativo web mobile que auxilia no controle de glicemia e alimentação segura para crianças com Diabetes Tipo 1 e Doença Celíaca. Desenvolvido com foco em proporcionar uma experiência leve, acolhedora e funcional tanto para responsáveis quanto para as crianças.

O app combina funcionalidade para adultos com elementos lúdicos para engajar a criança no autocuidado, utilizando gamificação leve, feedback positivo e um design infantil moderno.

---

## ✨ Funcionalidades Principais

### 🏠 **Home**
- Saudação personalizada com avatar do Heitor
- Última medição de glicemia com status visual
- Mensagens inteligentes contextuais baseadas nos registros
- Estatísticas rápidas (dias ativos, total de registros, receitas salvas)
- Cards de atalhos para funcionalidades principais

### 📊 **Registro de Glicemia**
- Registro rápido de medições com valor, insulina e observações
- Sistema de recomendações inteligentes baseado nos valores
- Histórico visual com gráficos de tendência
- Edição e exclusão de registros
- Indicadores de status (Ótimo, Bom, Atenção)
- Visualização completa do histórico com estatísticas detalhadas

### 🍽️ **Gerador de Receitas**
- Geração de receitas baseadas em ingredientes disponíveis
- Filtros automáticos para receitas sem glúten e apropriadas para diabéticos
- Sistema de favoritos para receitas
- Informações nutricionais detalhadas (carboidratos, proteínas, gorduras, calorias)
- Exportação de receitas em PDF
- Tempo de preparo e dificuldade
- Modo de preparo detalhado passo a passo

### 👤 **Perfil**
- Informações pessoais (nome, data de nascimento, idade)
- Metas personalizadas de glicemia
- Preferências alimentares (favoritos, alergias, restrições)
- Sequência de dias com registros
- Edição completa do perfil
- Configurações do app (notificações, sons, modo escuro)
- Opção para limpar todos os dados

---

## 🎨 Design

O app possui um design moderno e acolhedor com:

- **Paleta de cores suaves**: Azul claro, verde e amarelo
- **Elementos arredondados** para uma aparência amigável
- **Tipografia Poppins** para legibilidade
- **Interface limpa** e intuitiva
- **Avatar do Heitor** com diferentes expressões (feliz, neutro, cansado)
- **Feedback visual** para ações do usuário
- **Animações suaves** para melhor experiência

---

## 🛠️ Tecnologias Utilizadas

- **React** 18+ - Biblioteca JavaScript para construção da interface
- **TypeScript** - Superset tipado do JavaScript
- **React Router** - Navegação entre páginas
- **Tailwind CSS v4** - Framework CSS utilitário
- **Recharts** - Biblioteca para gráficos e visualizações
- **jsPDF** - Geração de PDFs
- **Lucide React** - Ícones modernos
- **LocalStorage** - Persistência de dados no navegador

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/heitorapp.git
cd heitorapp
```

2. Instale as dependências
```bash
npm install
# ou
pnpm install
```

3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

4. Abra o navegador em `http://localhost:5173`

### Build para Produção

```bash
npm run build
# ou
pnpm build
```

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── BottomNav.tsx
│   │   ├── HeitorAvatar.tsx
│   │   ├── PhoneMockup.tsx
│   │   ├── SmartMessageCard.tsx
│   │   └── figma/
│   ├── screens/           # Telas principais do app
│   │   ├── HomeScreen.tsx
│   │   ├── GlycemiaScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   ├── RecipesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── context/           # Context API (Theme)
│   ├── utils/             # Funções utilitárias
│   ├── App.tsx            # Componente principal
│   └── routes.tsx         # Configuração de rotas
├── styles/                # Estilos globais
│   ├── theme.css
│   └── fonts.css
└── main.tsx              # Ponto de entrada
```

---

## 📊 Persistência de Dados

O app utiliza **LocalStorage** para armazenar:

- ✅ Histórico de medições de glicemia
- ✅ Receitas salvas como favoritas
- ✅ Última medição registrada
- ✅ Dados do perfil do usuário
- ✅ Configurações do aplicativo
- ✅ Dias ativos com registros

Todos os dados são armazenados localmente no navegador e podem ser limpos através das configurações do app.

---

## 🎯 Funcionalidades Futuras

- [ ] Integração com backend/banco de dados
- [ ] Sincronização entre dispositivos
- [ ] Notificações push reais
- [ ] Exportação de relatórios completos
- [ ] Gráficos avançados de análise
- [ ] Lembretes inteligentes de medição
- [ ] Integração com glicosímetros via Bluetooth
- [ ] Modo offline completo (PWA)
- [ ] Compartilhamento de dados com médicos

---

## 👨‍👩‍👦 Público-Alvo

- **Primário**: Responsáveis (pais/mães) que cuidam de crianças com diabetes e doença celíaca
- **Secundário**: Crianças que estão aprendendo sobre autocuidado

---

## 🔒 Privacidade e Segurança

⚠️ **Importante**: Este aplicativo foi desenvolvido para uso pessoal e educacional. 

- Os dados são armazenados **localmente** no navegador
- Não há coleta ou envio de dados para servidores externos
- Não é recomendado para armazenar informações médicas sensíveis sem backup adequado
- Consulte sempre um profissional de saúde para decisões médicas

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 💬 Contato

Desenvolvido com 💙 para o cuidado e bem-estar do Heitor.

Para dúvidas, sugestões ou contribuições, entre em contato através das issues do GitHub.

---

<div align="center">

**HeitorApp v1.0** | © 2025

*Cuidando com tecnologia e amor* 💙

</div>
