import { Boton } from "./pages/Boton";
import { ProfilePage } from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route,Router } from "react-router-dom"; //!Especificar que se mostrara
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./storage/globalStorage";
import { DashBoard } from './pages/DashBoard';
import { ListUsers } from './pages/ListUsers'
import { ListClient } from './pages/ListClient';
import { ListProducts } from './pages/ListProducts';
import { CotizacionesList } from './pages/CotizacionesList';
import {ViewPdf} from './pages/ViewPdf.jsx'
import {PDFViewer} from '@react-pdf/renderer'

export function App() {

  //!Extraido de LocalStorage
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          //!Ruta no protegida
          <Route path="/" element={<Boton />} />

          //!Protecciòn de rutas
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/cotizaciones" element={<CotizacionesList />} />
            <Route path="/usuarios" element={<ListUsers />} />
            <Route path="/clientes" element={<ListClient />} />
            <Route path="/productos" element={<ListProducts />} />
            <Route path="/vistaPdf/:index" element= {<ViewPdf/>} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
