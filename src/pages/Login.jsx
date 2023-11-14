import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loadings/Loading";
import M from 'materialize-css';

const Login = () => {

  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    email: '',
    psw: ''
  });
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      await signIn(formUser.email, formUser.psw);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      //alert(error.message)
      setCargando(false);
      M.toast({ html: error.message, classes: 'rounded red' });
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
      <div className="container ">
        <div className="row">
          <div className="col s12  m8 offset-m2">
            <div className="card center-align" style={{ borderRadius: '30px' }}>
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
                </form>
                <div className="card-action" style={{border: 'none'}}>
                <div className="row">
                  <div className="col s12 ">
                    <button className='btn wave-effect wave-light' onClick={handleSubmit}><i className='material-icons right'>start</i>Entrar</button>
                  </div>
                  {
                    cargando && <div ><Loading /></div>
                  }
                </div>
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