import { PhoneMockup } from "../components/PhoneMockup";
import { HeitorAvatar } from "../components/HeitorAvatar";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, Sparkles, ShieldCheck, Activity, Heart, Trash2, ChefHat, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  saved: boolean;
  glycemicIndex: 'baixo' | 'médio';
  prepTime: string;
  mainIngredients: string[]; // Para fazer o matching
  favorited?: boolean; // Nova propriedade para favoritos
}

// Base de receitas sem glúten e adequadas para diabéticos
const RECIPE_DATABASE: Omit<Recipe, 'id' | 'saved'>[] = [
  {
    name: "Frango Grelhado com Brócolis",
    mainIngredients: ["frango", "brócolis", "legumes"],
    ingredients: [
      "200g de peito de frango",
      "1 xícara de brócolis",
      "Azeite e temperos naturais"
    ],
    steps: [
      "Tempere o frango com sal, alho e limão",
      "Grelhe em fogo médio por 8-10 minutos de cada lado",
      "Cozinhe o brócolis no vapor por 5-7 minutos",
      "Sirva quente com um fio de azeite"
    ],
    glycemicIndex: 'baixo',
    prepTime: "25 min"
  },
  {
    name: "Omelete de Legumes",
    mainIngredients: ["ovo", "ovos", "legumes", "tomate", "cebola"],
    ingredients: [
      "3 ovos",
      "1/2 tomate picado",
      "1/4 cebola picada",
      "Salsinha a gosto"
    ],
    steps: [
      "Bata os ovos em uma tigela",
      "Adicione os legumes picados",
      "Despeje em uma frigideira antiaderente",
      "Cozinhe em fogo baixo até firmar"
    ],
    glycemicIndex: 'baixo',
    prepTime: "15 min"
  },
  {
    name: "Peixe Assado com Cenoura",
    mainIngredients: ["peixe", "cenoura", "legumes"],
    ingredients: [
      "1 filé de peixe branco",
      "2 cenouras em rodelas",
      "Limão e temperos"
    ],
    steps: [
      "Tempere o peixe com limão e sal",
      "Disponha as cenouras ao redor",
      "Asse a 180°C por 20 minutos",
      "Sirva com ervas frescas"
    ],
    glycemicIndex: 'baixo',
    prepTime: "30 min"
  },
  {
    name: "Tapioca com Queijo Minas",
    mainIngredients: ["tapioca", "queijo"],
    ingredients: [
      "3 colheres de goma de tapioca",
      "50g de queijo minas",
      "Orégano (opcional)"
    ],
    steps: [
      "Aqueça uma frigideira antiaderente",
      "Espalhe a goma formando um círculo",
      "Adicione o queijo quando formar uma película",
      "Dobre e sirva quente"
    ],
    glycemicIndex: 'médio',
    prepTime: "10 min"
  },
  {
    name: "Panqueca de Banana e Aveia",
    mainIngredients: ["banana", "aveia", "ovo", "ovos"],
    ingredients: [
      "1 banana madura",
      "2 ovos",
      "2 colheres de aveia sem glúten",
      "Canela a gosto"
    ],
    steps: [
      "Amasse a banana com um garfo",
      "Misture os ovos e a aveia",
      "Adicione canela",
      "Frite em fogo baixo por 2-3 min de cada lado"
    ],
    glycemicIndex: 'médio',
    prepTime: "15 min"
  },
  {
    name: "Arroz Integral com Frango Desfiado",
    mainIngredients: ["arroz", "frango"],
    ingredients: [
      "1 xícara de arroz integral",
      "150g de frango cozido e desfiado",
      "Cebolinha e temperos"
    ],
    steps: [
      "Cozinhe o arroz integral (45 minutos)",
      "Refogue o frango com temperos naturais",
      "Misture o arroz com o frango",
      "Finalize com cebolinha picada"
    ],
    glycemicIndex: 'médio',
    prepTime: "50 min"
  },
  {
    name: "Salada de Atum com Grão-de-Bico",
    mainIngredients: ["atum", "grão", "grão-de-bico"],
    ingredients: [
      "1 lata de atum em água",
      "1 xícara de grão-de-bico cozido",
      "Tomate cereja e folhas verdes",
      "Azeite e limão"
    ],
    steps: [
      "Escorra o atum e o grão-de-bico",
      "Corte os tomates ao meio",
      "Misture todos os ingredientes",
      "Tempere com azeite, limão e sal"
    ],
    glycemicIndex: 'baixo',
    prepTime: "10 min"
  },
  {
    name: "Carne Moída com Abobrinha",
    mainIngredients: ["carne", "abobrinha", "legumes"],
    ingredients: [
      "200g de carne moída magra",
      "1 abobrinha cortada em cubos",
      "1 tomate picado",
      "Temperos naturais"
    ],
    steps: [
      "Refogue a carne com alho e cebola",
      "Adicione a abobrinha e o tomate",
      "Cozinhe por 10-15 minutos",
      "Sirva com arroz integral ou quinoa"
    ],
    glycemicIndex: 'baixo',
    prepTime: "25 min"
  },
  {
    name: "Batata Doce Assada com Frango",
    mainIngredients: ["batata", "batata-doce", "frango"],
    ingredients: [
      "1 batata doce média",
      "150g de frango desfiado",
      "Queijo cottage",
      "Cheiro verde"
    ],
    steps: [
      "Asse a batata doce por 40 minutos a 200°C",
      "Corte ao meio e amasse levemente",
      "Adicione o frango desfiado",
      "Finalize com queijo cottage e cheiro verde"
    ],
    glycemicIndex: 'baixo',
    prepTime: "45 min"
  },
  {
    name: "Espaguete de Abobrinha ao Molho",
    mainIngredients: ["abobrinha", "tomate", "legumes"],
    ingredients: [
      "2 abobrinhas em formato de espaguete",
      "Molho de tomate caseiro",
      "Manjericão fresco",
      "Queijo parmesão (opcional)"
    ],
    steps: [
      "Use um espiralizador para fazer o espaguete de abobrinha",
      "Aqueça o molho de tomate em uma panela",
      "Refogue rapidamente a abobrinha (2 min)",
      "Sirva com molho e manjericão"
    ],
    glycemicIndex: 'baixo',
    prepTime: "20 min"
  },
  {
    name: "Bowl de Quinoa com Vegetais",
    mainIngredients: ["quinoa", "legumes", "vegetais"],
    ingredients: [
      "1/2 xícara de quinoa",
      "Brócolis, cenoura e pimentão",
      "Azeite e limão",
      "Gergelim"
    ],
    steps: [
      "Cozinhe a quinoa conforme embalagem",
      "Cozinhe os vegetais no vapor",
      "Monte o bowl com quinoa e vegetais",
      "Tempere com azeite, limão e gergelim"
    ],
    glycemicIndex: 'baixo',
    prepTime: "30 min"
  },
  {
    name: "Hambúrguer de Grão-de-Bico",
    mainIngredients: ["grão", "grão-de-bico", "vegetais"],
    ingredients: [
      "1 xícara de grão-de-bico cozido",
      "1/4 cebola picada",
      "Farinha de arroz integral",
      "Temperos a gosto"
    ],
    steps: [
      "Amasse o grão-de-bico com um garfo",
      "Misture cebola, farinha e temperos",
      "Forme os hambúrgueres",
      "Grelhe por 4 minutos de cada lado"
    ],
    glycemicIndex: 'baixo',
    prepTime: "25 min"
  },
  {
    name: "Sopa de Abóbora com Gengibre",
    mainIngredients: ["abóbora", "gengibre"],
    ingredients: [
      "2 xícaras de abóbora picada",
      "1 colher (chá) de gengibre ralado",
      "1 cebola pequena",
      "Caldo de legumes"
    ],
    steps: [
      "Refogue a cebola até dourar",
      "Adicione abóbora, gengibre e caldo",
      "Cozinhe por 20 minutos",
      "Bata no liquidificador e sirva"
    ],
    glycemicIndex: 'médio',
    prepTime: "35 min"
  },
  {
    name: "Crepioca Recheada",
    mainIngredients: ["tapioca", "ovo", "queijo"],
    ingredients: [
      "2 colheres de goma de tapioca",
      "1 ovo",
      "Queijo branco",
      "Tomate"
    ],
    steps: [
      "Misture a tapioca com o ovo batido",
      "Despeje em frigideira quente",
      "Adicione queijo e tomate",
      "Dobre e sirva quente"
    ],
    glycemicIndex: 'médio',
    prepTime: "12 min"
  },
  {
    name: "Frango ao Curry com Legumes",
    mainIngredients: ["frango", "curry", "legumes"],
    ingredients: [
      "200g de frango em cubos",
      "1 colher (sopa) de curry",
      "Brócolis e cenoura",
      "Leite de coco light"
    ],
    steps: [
      "Refogue o frango com curry",
      "Adicione os legumes",
      "Acrescente leite de coco",
      "Cozinhe por 15 minutos"
    ],
    glycemicIndex: 'baixo',
    prepTime: "30 min"
  }
];

// Função para buscar receitas baseadas nos ingredientes
function searchRecipes(ingredientsInput: string): Omit<Recipe, 'id' | 'saved'> | null {
  // Normaliza o input do usuário
  const userIngredients = ingredientsInput
    .toLowerCase()
    .split(/[,;\n]/)
    .map(i => i.trim())
    .filter(i => i.length > 0);

  // Busca receitas que fazem match com os ingredientes
  const matches = RECIPE_DATABASE.map(recipe => {
    const matchCount = recipe.mainIngredients.filter(mainIng => 
      userIngredients.some(userIng => 
        mainIng.includes(userIng) || userIng.includes(mainIng)
      )
    ).length;

    return { recipe, matchCount };
  });

  // Ordena por número de matches e retorna a melhor
  const bestMatch = matches
    .filter(m => m.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)[0];

  return bestMatch ? bestMatch.recipe : null;
}

export function RecipesScreen() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState("");
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [profileGender, setProfileGender] = useState<'male' | 'female'>('male');

  // Carregar receitas salvas do localStorage ao montar o componente
  useEffect(() => {
    // Carregar gênero do perfil
    const storedProfile = localStorage.getItem('heitor_profile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setProfileGender(profile.gender || 'male');
      } catch (e) {
        console.error('Erro ao carregar perfil:', e);
      }
    }
    
    const stored = localStorage.getItem('heitor-saved-recipes');
    if (stored) {
      try {
        setSavedRecipes(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar receitas:', e);
      }
    }
  }, []);

  // Salvar receitas no localStorage sempre que mudar
  useEffect(() => {
    if (savedRecipes.length > 0) {
      localStorage.setItem('heitor-saved-recipes', JSON.stringify(savedRecipes));
    } else {
      localStorage.removeItem('heitor-saved-recipes');
    }
  }, [savedRecipes]);

  const handleGenerate = async () => {
    if (ingredients) {
      setIsSearching(true);
      setShowRecipe(false);
      
      // Simula busca na web com mensagens de progresso
      setSearchProgress("🔍 Buscando receitas sem glúten...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchProgress("✨ Filtrando receitas para diabéticos...");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSearchProgress("🍳 Analisando ingredientes disponíveis...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRecipe = searchRecipes(ingredients);
      
      if (newRecipe) {
        setSearchProgress(" Receita perfeita encontrada!");
        await new Promise(resolve => setTimeout(resolve, 500));
        setGeneratedRecipe({ ...newRecipe, id: Date.now().toString(), saved: false });
      } else {
        setGeneratedRecipe(null);
      }
      
      setShowRecipe(true);
      setIsSearching(false);
      setSearchProgress("");
    }
  };

  const handleSaveRecipe = () => {
    if (generatedRecipe) {
      setSavedRecipes([{ ...generatedRecipe, saved: true }, ...savedRecipes]);
      setShowRecipe(false);
      setIngredients("");
      setGeneratedRecipe(null);
    }
  };

  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setSavedRecipes(savedRecipes.map(recipe => 
      recipe.id === id 
        ? { ...recipe, favorited: !recipe.favorited } 
        : recipe
    ));
  };

  const handleDownloadFavorites = () => {
    const favoritedRecipes = savedRecipes.filter(recipe => recipe.favorited);
    
    if (favoritedRecipes.length === 0) {
      alert("Você ainda não tem receitas favoritadas! ⭐");
      return;
    }

    const doc = new jsPDF();
    let yPosition = 35;

    // === CABEÇALHO ===
    // Fundo do cabeçalho (gradiente simulado)
    doc.setFillColor(255, 243, 224); // Amarelo muito claro
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setFillColor(254, 240, 138); // Amarelo claro
    doc.rect(0, 0, 210, 25, 'F');

    // Título principal
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(234, 88, 12); // Laranja
    doc.text("❤️ Receitas Favoritas", 105, 15, { align: "center" });
    
    // Subtítulo
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 113, 108); // Cinza
    doc.text("HeitorApp - Receitas sem glúten e adequadas para diabéticos", 105, 23, { align: "center" });
    
    // Informação adicional
    doc.setFontSize(9);
    doc.setTextColor(161, 161, 170);
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    doc.text(`Gerado em ${dataAtual} • ${favoritedRecipes.length} receita${favoritedRecipes.length > 1 ? 's' : ''}`, 105, 30, { align: "center" });
    
    // Linha decorativa
    doc.setDrawColor(251, 191, 36); // Amarelo
    doc.setLineWidth(1);
    doc.line(20, 38, 190, 38);

    favoritedRecipes.forEach((recipe, recipeIndex) => {
      // Verifica se precisa adicionar nova página
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }

      // === CAIXA DA RECEITA ===
      // Fundo da receita
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(229, 229, 229);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, yPosition - 5, 180, 12, 3, 3, 'FD');

      // Número da receita em destaque
      doc.setFillColor(254, 240, 138); // Amarelo
      doc.circle(23, yPosition + 1, 4, 'F');
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(234, 88, 12);
      doc.text(`${recipeIndex + 1}`, 23, yPosition + 2, { align: "center" });

      // Nome da receita
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 55); // Cinza escuro
      doc.text(recipe.name, 30, yPosition + 2);
      yPosition += 10;

      // === BADGES DE INFORMAÇÃO ===
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      
      // Badge de tempo
      doc.setFillColor(239, 246, 255); // Azul claro
      doc.roundedRect(20, yPosition, 28, 6, 2, 2, 'F');
      doc.setTextColor(37, 99, 235); // Azul
      doc.text(`⏱️ ${recipe.prepTime}`, 21.5, yPosition + 4);
      
      // Badge de IG
      const igColor = recipe.glycemicIndex === 'baixo' ? [34, 197, 94] : [234, 179, 8];
      const igBgColor = recipe.glycemicIndex === 'baixo' ? [240, 253, 244] : [254, 249, 195];
      doc.setFillColor(igBgColor[0], igBgColor[1], igBgColor[2]);
      doc.roundedRect(50, yPosition, 28, 6, 2, 2, 'F');
      doc.setTextColor(igColor[0], igColor[1], igColor[2]);
      doc.text(`📊 IG ${recipe.glycemicIndex}`, 51.5, yPosition + 4);
      
      // Badge sem glúten
      doc.setFillColor(240, 253, 244); // Verde claro
      doc.roundedRect(80, yPosition, 28, 6, 2, 2, 'F');
      doc.setTextColor(34, 197, 94); // Verde
      doc.text("✓ Sem glúten", 81.5, yPosition + 4);

      yPosition += 12;

      // === INGREDIENTES ===
      // Título da seção
      doc.setFillColor(254, 243, 199); // Amarelo bem claro
      doc.roundedRect(20, yPosition, 170, 7, 2, 2, 'F');
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 83, 9); // Laranja escuro
      doc.text("🥘 Ingredientes", 23, yPosition + 5);
      yPosition += 10;

      // Lista de ingredientes
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99); // Cinza médio
      recipe.ingredients.forEach((ingredient) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Bullet point decorativo
        doc.setFillColor(251, 191, 36);
        doc.circle(23, yPosition - 1.5, 1, 'F');
        
        doc.text(ingredient, 27, yPosition);
        yPosition += 5;
      });

      yPosition += 3;

      // === MODO DE PREPARO ===
      // Título da seção
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(20, yPosition, 170, 7, 2, 2, 'F');
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 83, 9);
      doc.text("👨‍🍳 Modo de Preparo", 23, yPosition + 5);
      yPosition += 10;

      // Passos
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      recipe.steps.forEach((step, index) => {
        if (yPosition > 265) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Número do passo em destaque
        doc.setFillColor(254, 240, 138);
        doc.roundedRect(20, yPosition - 3, 5, 5, 1, 1, 'F');
        doc.setFont("helvetica", "bold");
        doc.setTextColor(234, 88, 12);
        doc.text(`${index + 1}`, 22.5, yPosition, { align: "center" });
        
        // Texto do passo com quebra de linha
        doc.setFont("helvetica", "normal");
        doc.setTextColor(75, 85, 99);
        const lines = doc.splitTextToSize(step, 160);
        lines.forEach((line: string) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 27, yPosition);
          yPosition += 5;
        });
        yPosition += 2;
      });

      yPosition += 8;

      // Separador entre receitas (se não for a última)
      if (recipeIndex < favoritedRecipes.length - 1) {
        // Linha pontilhada decorativa
        doc.setDrawColor(209, 213, 219);
        doc.setLineDash([2, 2]);
        doc.setLineWidth(0.5);
        doc.line(30, yPosition, 180, yPosition);
        doc.setLineDash([]); // Reset
        yPosition += 15;
      }
    });

    // === RODAPÉ EM TODAS AS PÁGINAS ===
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Linha superior do rodapé
      doc.setDrawColor(229, 229, 229);
      doc.setLineWidth(0.3);
      doc.line(20, 282, 190, 282);
      
      // Texto do rodapé
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(156, 163, 175);
      doc.text("HeitorApp - Receitas Seguras", 20, 287);
      doc.text(`Página ${i} de ${pageCount}`, 190, 287, { align: "right" });
      
      // Mensagem motivacional
      doc.setFontSize(7);
      doc.setTextColor(161, 161, 170);
      doc.text("💙 Feito com carinho para o Heitor", 105, 290, { align: "center" });
    }

    doc.save("Receitas-Favoritas-Heitor.pdf");
  };

  const handleDownloadRecipe = (recipe: Recipe) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(recipe.name, 10, 10);
    doc.setFontSize(12);
    doc.text(`Tempo de preparo: ${recipe.prepTime}`, 10, 20);
    doc.text(`Índice glicêmico: ${recipe.glycemicIndex}`, 10, 30);
    doc.text("Ingredientes:", 10, 40);
    recipe.ingredients.forEach((ingredient, index) => {
      doc.text(`• ${ingredient}`, 10, 50 + index * 5);
    });
    doc.text("Modo de preparo:", 10, 50 + recipe.ingredients.length * 5 + 10);
    recipe.steps.forEach((step, index) => {
      doc.text(`${index + 1}. ${step}`, 10, 60 + recipe.ingredients.length * 5 + index * 5);
    });
    doc.save(`${recipe.name}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PhoneMockup>
        <div className="flex flex-col h-full bg-gradient-to-b from-yellow-50 to-white pb-24 overflow-y-auto">
          {/* Header */}
          <div className="px-6 pt-14 pb-6">
            <button
              onClick={() => navigate('/home')}
              className="mb-6 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <HeitorAvatar mood="happy" size="md" gender={profileGender} />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Receitas Seguras
                </h1>
                <p className="text-sm text-gray-500">
                  Vamos cozinhar algo gostoso!
                </p>
              </div>
            </div>

            {/* Input Card */}
            {!showRecipe && !isSearching && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Quais ingredientes você tem?
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Ex: frango, brócolis, cenoura..."
                  className="w-full h-24 text-gray-800 bg-gray-50 rounded-xl p-4 outline-none resize-none border border-gray-200 focus:border-yellow-400 transition-colors"
                />

                <button
                  onClick={handleGenerate}
                  disabled={!ingredients}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl py-4 font-semibold shadow-lg shadow-yellow-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Gerar receita
                </button>
              </div>
            )}

            {/* Loading Animation */}
            {isSearching && (
              <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-8 shadow-md border border-yellow-100 mb-6">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-yellow-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-yellow-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {searchProgress}
                  </p>
                  <p className="text-sm text-gray-500">
                    Aguarde um momento...
                  </p>
                </div>
              </div>
            )}

            {/* Recipe Result */}
            {showRecipe && !generatedRecipe && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="text-center py-8">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Nenhuma receita encontrada
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Não encontramos receitas com esses ingredientes.<br/>
                    Tente: frango, brócolis, ovo, peixe, banana, arroz, etc.
                  </p>
                  <button
                    onClick={() => {
                      setShowRecipe(false);
                      setIngredients("");
                    }}
                    className="bg-yellow-500 text-white rounded-xl px-6 py-3 font-semibold active:scale-[0.98] transition-transform"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            )}

            {/* Recipe Result */}
            {showRecipe && generatedRecipe && (
              <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-6 shadow-md border border-yellow-100 animate-in slide-in-from-bottom mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-yellow-100 p-2 rounded-xl">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {generatedRecipe.name}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Sem glúten
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {generatedRecipe.glycemicIndex === 'baixo' ? 'Baixo IG' : 'Médio IG'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Ingredientes:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {generatedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>• {ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Modo de preparo:</h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      {generatedRecipe.steps.map((step, index) => (
                        <li key={index}>{index + 1}. {step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-800">
                      <strong>💡 Dica:</strong> Esta receita tem {generatedRecipe.glycemicIndex === 'baixo' ? 'baixo índice glicêmico' : 'índice glicêmico médio'} e é totalmente livre de glúten, perfeita para o Heitor!
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveRecipe}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl py-3 font-semibold active:scale-[0.98] transition-transform"
                    >
                      Salvar receita
                    </button>
                    <button
                      onClick={() => {
                        setShowRecipe(false);
                        setGeneratedRecipe(null);
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold active:scale-[0.98] transition-transform"
                    >
                      Nova busca
                    </button>
                    <button
                      onClick={() => handleDownloadRecipe(generatedRecipe)}
                      className="flex-1 bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold active:scale-[0.98] transition-transform"
                    >
                      <Download className="w-5 h-5" />
                      Baixar receita
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Recipes */}
            {!showRecipe && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Receitas salvas ({savedRecipes.length})
                  </h2>
                  {savedRecipes.filter(r => r.favorited).length > 0 && (
                    <button
                      onClick={handleDownloadFavorites}
                      className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium text-sm active:scale-95 transition-all hover:bg-red-100"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {savedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="bg-yellow-100 p-2 rounded-xl">
                            <ChefHat className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{recipe.name}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                Sem glúten
                              </span>
                              {recipe.favorited && (
                                <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Heart className="w-3 h-3 fill-red-500" />
                                  Favorita
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFavorite(recipe.id)}
                            className={`p-2 rounded-lg transition-all ${
                              recipe.favorited 
                                ? 'bg-red-50 hover:bg-red-100' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <Heart 
                              className={`w-5 h-5 transition-colors ${
                                recipe.favorited 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`} 
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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