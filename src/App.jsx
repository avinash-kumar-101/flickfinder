import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;


