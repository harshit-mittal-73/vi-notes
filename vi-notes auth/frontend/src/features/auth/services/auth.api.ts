import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true 
})

export async function register({ username, email, password }: { username: string; email: string; password: string; }){
    try{
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password
        })
        return response.data
    } catch(err){
        console.log(err)
    }
}

export async function login({ email, password }: { email: string; password: string; }){
    try{
        const response = await api.post('/api/auth/login', {
            email,
            password
        })
        return response.data
    } catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
        const response = await api.get('/api/auth/logout')
        return response.data
    } catch(err){
        console.log(err)
    }
}