import {Navigate, Outlet} from 'react-router-dom'

export function ProtectedRoute({isAllowed, children}) {

  if(!isAllowed)return <Navigate to="/"/>

  return children ? <>{children}</> : <Outlet/>
}
