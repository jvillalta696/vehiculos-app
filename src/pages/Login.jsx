import { useState, useEffect } from 'react'
import {  useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loadings/Loading";
//mport M from '@materializecss/materialize';

const Login = () => {

  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    email: '',
    psw: ''
  });
  const [cargando,setCargando] =useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      const data = await signIn(formUser.email, formUser.psw);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
      //M.toast({html: error.message, classes: 'rounded red'});
    }
  }

  const handleOnChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    });

  }

  useEffect(() => {    
    if (user) { navigate("/") }
    console.log('Login_uf')
  }, [user, navigate])



  return loading ? (
    <Loading />
  ) : (
    <>
    <div className="contenedor">
      <div className="container ">
      <div className="row" style={{paddingTop:'25vh'}}>
        <div className="col s12  m8 offset-m2">
          <div className="card center-align">
          <div className="card-conten container">
            <div className="row">
              <div className="col s12 center">
                <span className='card-title'>Iniciar Sesión</span>
              </div>
            </div>            
            <form>              
                 <div className="row">
                <div className="input-field col s12">
                  <input 
                  className='focus-style'
                  type="email" 
                  name="email" 
                  id="email"                 
                  onChange={(e) => { handleOnChange(e) }} />
                  <label htmlFor='email'>Correo</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input className='focus-style' type='password' name="psw" id="psw" onChange={(e) => { handleOnChange(e) }} />
                  <label htmlFor="psw">Contraseña</label>                  
                </div>                
              </div>
              <div className="row">
                <div className="col s12 center" style={{margin:'10px'}}>
                  <button className='btn wave-effect wave-light blue-grey darken-3' onClick={(e) => { handleSubmit(e) }}><i className='material-icons right'>start</i>Entrar</button>
                </div>
                {
                  cargando && <div className="col s12"><Loading/></div>
                }
              </div>                        
            </form>
            </div>  
          </div>
        </div>
      </div>
    </div>
    </div> 

    </>
  )
}

export default Login