import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AcercaDeNosotros from "./components/pages/AcercaDeNosotros";
import Administracion from "./components/pages/Administracion";
import CrearProducto from "./components/sections/CrearProducto";
import Editar from "./components/sections/Editar";
import ErrorPage from "./components/pages/ErrorPage";
import UserContext from "./Context/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const SaveAuth=(auth)=>{
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };

  const GetAuth=()=>{
    return JSON.parse(sessionStorage.getItem("auth"))
  };

  const RemoveAuth=()=>{
    sessionStorage.removeItem("auth")
  };

  useEffect(()=>{
    const session=GetAuth();
    if (session) {
      setCurrentUser(session)
    };
    return ()=>{
      setCurrentUser(undefined);
    };
  },[])

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, SaveAuth, GetAuth, RemoveAuth }}>
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />

              {currentUser !== undefined && currentUser.role === "Admin" && (
                <Route path="/administracion" element={<Administracion />} />
              )}

              <Route path="/crear-producto" element={<CrearProducto />} />
              <Route path="/editar/:id" element={<Editar />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </main>
          <footer className="m0 p0">
            <Footer />
          </footer>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
