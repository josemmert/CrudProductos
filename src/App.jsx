import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AcercaDeNosotros from "./components/pages/AcercaDeNosotros";
import Administracion from "./components/pages/Administracion";
import CrearProducto from "./components/sections/CrearProducto";
import Editar from "./components/sections/Editar";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/crear-producto" element={<CrearProducto/>} />
            <Route path="/editar/:id" element={<Editar/>} />
          </Routes>
        </main>
        <footer className="m0 p0">
          <Footer  />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
