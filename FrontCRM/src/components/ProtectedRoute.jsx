//!Protecciòn de rutas
import {Navigate, Outlet} from 'react-router-dom'

export function ProtectedRoute({isAllowed, children}) {

  if(!isAllowed)return <Navigate to="/"/>

  return children ? <>{children}</> : <Outlet/>
}

//!Debe ser igual la sintaxis en todos los casos
