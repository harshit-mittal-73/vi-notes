import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../auth.context";
import { login, logout, register } from '../services/auth.api';

export const useAuth = () => {

    const context = useContext(AuthContext) as AuthContextType;
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        setLoading(true)
        try{
            const data = await login({ email, password })
            setUser(data.user)
        } catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }: { username: string; email: string; password: string }) => {
        setLoading(true)
        try{
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }   
    }

    const handleLogout = async () => {
        setLoading(true)
        try{
            await logout()
            setUser(null)
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    return {user, loading, handleLogin, handleRegister, handleLogout}

}