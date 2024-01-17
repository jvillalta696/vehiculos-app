import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import M from 'materialize-css'
import coriLogo from "../../assets/cori-logo.jpeg"
import grandLogo from "../../assets/grand-logo.jpeg"

const Nav = ({ selectView, onSignOut, reset }) => {
  const { config, user } = useAuth()

  const handleSidenavRef = (ref) => {
    if (ref) M.Sidenav.init(ref);
  }

  const handleInicio = () => {
    reset(null);
    selectView("main");
  }

  const obtenerLogo = (usuario) => {
    let dbCode;
    if ('companies' in usuario) {
      if (usuario.companies.every((compania) => compania.active)) {
        dbCode = '01';
      } else {
        const companiaActiva = usuario.companies.find((compania) => compania.active);
        dbCode = companiaActiva.dbCode;
      }
    } else {
      dbCode = usuario.dbCode;
    }
    const logo = dbCode === '01' ? coriLogo : grandLogo;
    return logo;
  }

  return (
    <>
      <div className="navbar-fixed">
        <nav className='teal lighten-2'>
          <div className="nav-wrapper">
            <a onClick={() => { selectView("main") }} className="brand-logo center">
              <img className='hide-on-small-only' style={{ width: '200px', height: '60px', paddingTop: '5px' }} src={obtenerLogo(config)} alt="" />
            </a>
            <a data-target="slide-out" className="sidenav-trigger show-on-small"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a onClick={handleInicio}>Inicio</a></li>
              {config.rol === "admin" && <li><a onClick={() => { selectView("config"); }}>Configuración</a></li>}
              <li><a onClick={onSignOut}>Salir</a></li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id='slide-out' ref={handleSidenavRef}>
          <li>
            <div className="user-view">
              <div className="backgroud">
                <img className="responsive-img" src={obtenerLogo(config)} alt="" />
              </div>
              <a ><span className="email">{user.email}</span></a>
            </div>
          </li>
          <li><a className='sidenav-close' onClick={handleInicio}><i className="material-icons">home</i>Inicio</a></li>
          {config.rol === "admin" && <li><a className='sidenav-close' onClick={() => { selectView("config") }}><i className="material-icons">settings</i>Configuración</a></li>}
          <li><a className='sidenav-close' onClick={onSignOut}><i className="material-icons">logout</i>Salir</a></li>
        </ul>
      </div>
    </>
  )
}

export default Nav