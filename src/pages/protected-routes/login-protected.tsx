import { Navigate } from "react-router-dom"
import { getItem } from "../../helpers"
import type { ProtectedRoute } from "../../types"

const LoginProtected = ({children}: ProtectedRoute ) => {
    const access_token = getItem("access_token")
    const role = getItem("role")

    if(access_token){
        return <Navigate to={`/${role}`} replace/>
    }
  return (
    <>
    {children}
    </>
  )
}

export default LoginProtected