import { createBrowserRouter } from "react-router";
import { HomeScreen } from "./screens/HomeScreen";
import { GlycemiaScreen } from "./screens/GlycemiaScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { ShowcaseView } from "./screens/ShowcaseView";
import { MessageStatesShowcase } from "./screens/MessageStatesShowcase";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ShowcaseView },
      { path: "mensagens", Component: MessageStatesShowcase },
      { path: "home", Component: HomeScreen },
      { path: "glicemia", Component: GlycemiaScreen },
      { path: "historico", Component: HistoryScreen },
      { path: "receitas", Component: RecipesScreen },
      { path: "perfil", Component: ProfileScreen },
    ],
  },
]);