import React, { useState } from 'react'
import { createUser } from '../../libs/auth';
const LoginForm = () => {
    
    const [user, setUser] = useState({}); 
    
    const handleOnChange = (e)=>{
        const { name,value} = e.target;
        setUser({...user,[name]:value});
        console.log(name,' | ',value)
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
            <button type="submit">Entrar</button>
            <button type="submit">Salir</button>
            <button type="submit" onClick={createUser}>Registra</button>
        </div>
    </div>
  )
}

export default LoginForm