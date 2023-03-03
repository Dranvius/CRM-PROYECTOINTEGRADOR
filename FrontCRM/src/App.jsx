import { FinalConcept } from "./components/FinalConcept";
import { Boton } from "./pages/Boton";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //!Especificar que se mostrara
import { HomePage } from "./pages/HomePage";
import { NavbarLinks } from "./components/NavbarLinks";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./storage/globalStorage";
import { DashBoard } from './pages/DashBoard';
import { ListUsers } from './pages/ListUsers'
import { ListClient } from './pages/ListClient';
import { ListProducts } from './pages/ListProducts';
import { ListQuotation } from "./pages/ListQuotation";
import { CotizacionesList } from './pages/CotizacionesList'

export function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <BrowserRouter>
        {/* <NavbarLinks /> */}

        <Routes>
          <Route path="/" element={<Boton />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/cotizaciones" element={<CotizacionesList />} />
            <Route path="/usuarios" element={<ListUsers />} />
            <Route path="/clientes" element={<ListClient />} />
            <Route path="/productos" element={<ListProducts />} />
          </Route>

        </Routes>
      </BrowserRouter>

      {/* 
    <div id='general'>
    <div className="red">
    <FinalConcept id='Red'/>
    </div>

    <div className="green">
    <FinalConcept id='green'/>
    </div>
    
    <div className="yellow">
    <FinalConcept id='yellow'/>
    </div>
    
    <div className="blue">
    <FinalConcept id='yellow'/>
    </div>
    </div> 
     */}

    </>
  );
}
