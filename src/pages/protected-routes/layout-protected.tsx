import type { ProtectedRoute } from '@types'
import { getItem } from '@helpers'
import { Navigate } from 'react-router-dom'

const LogoutProtected = ({children}: ProtectedRoute) => {
    const access_token = getItem("access_token")
    if(!access_token){
        return <Navigate to={"/"} replace />
    }
  return (
    <>
    {children}
    </>
  )
}

export default LogoutProtected