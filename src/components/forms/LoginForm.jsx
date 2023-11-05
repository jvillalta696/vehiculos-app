import React, { useState } from 'react'
import { signIn, signout } from '../../libs/auth';
const LoginForm = () => {
    
    const [user, setUser] = useState({}); 
    
    const handleOnChange = (e)=>{
        const { name,value} = e.target;
        setUser({...user,[name]:value});
        console.log(name,' | ',value)
    }
    
    const  handleSignIn = async (e)=>{
      e.preventDefault();
      console.log(user)
      try {
        await signIn(user.email,user.password);
      } catch (error) {
        alert(error.message)
      }
    }

  return (
    <div>
        <div>
        <label htmlFor="email">Correo</label>
        <input type="email" name="email" onChange={handleOnChange}/>
        </div>
        <div>
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" onChange={handleOnChange}/>
        </div>
        <div>
            <button type="submit" onClick={handleSignIn}>Entrar</button>
            <button type="submit" onClick={signout}>Salir</button>         
        </div>
    </div>
  )
}

export default LoginForm