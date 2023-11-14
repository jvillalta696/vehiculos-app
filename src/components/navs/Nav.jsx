import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import M from 'materialize-css'

const Nav = ({selectView,onSignOut,reset}) => {
    const {config}= useAuth()

    const handleSidenavRef = (ref)=>{
        if(ref)M.Sidenav.init(ref);
      }

    const handleInicio = ()=>{
        reset(null);
        selectView("main");
    }
    
  return (
    <>
      <div className="navbar-fixed">
    <nav className='teal lighten-2'>
      <div className="nav-wrapper">
        <a onClick={()=>{selectView("main")}}className="brand-logo center">Logo</a>
        <a data-target="slide-out" class="sidenav-trigger show-on-small"><i class="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a onClick={handleInicio}>Inicio</a></li>
          {config.rol==="admin"&&<li><a onClick={()=>{selectView("config");}}>Configuración</a></li>}
          <li><a onClick={onSignOut}>Salir</a></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id='slide-out' ref={handleSidenavRef}>
          <li><a className='sidenav-close' onClick={handleInicio}>Inicio</a></li>
          {config.rol==="admin"&&<li><a className='sidenav-close' onClick={()=>{selectView("config")}}>Configuración</a></li>}
          <li><a className='sidenav-close' onClick={onSignOut}>Salir</a></li>
        </ul>
  </div>
    </>
  )
}

export default Nav