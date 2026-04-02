import React, { useState } from 'react'
import '../auth.form.css'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const navigate = useNavigate();
  const[username, setUsername] = useState<string>("")
  const[email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const {loading, handleRegister} = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      await handleRegister({username, email, password})
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "An error occurred during registration")
    }
  }

  if(loading){
    return(
      <main>
        <h1>
          Loading...
        </h1>
      </main>
    )
  }

  return (

    <main>
      <div className="form-container">


        <h1>Register</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
            type="text" id="username" name= "username" placeholder='Enter username' />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
            type="email" id="email" name= "email" placeholder='Enter email address' />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
            type="password" id="password" name="password" placeholder='Enter Password' />
          </div>

          <button className='button primary-button'>Register</button>

        </form>

        <p>
          Already have an account? <Link className='highlight' to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register