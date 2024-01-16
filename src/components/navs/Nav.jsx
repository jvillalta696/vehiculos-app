import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import M from 'materialize-css'
import coriLogo from "../../assets/cori-logo.jpeg"
import grandLogo from "../../assets/grand-logo.jpeg"

const Nav = ({selectView,onSignOut,reset}) => {
    const {config, user}= useAuth()

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
        <a onClick={()=>{selectView("main")}}className="brand-logo center">{
          config.dbCode==='01'&&<img className='hide-on-small-only' style={{width:'200px',height:'60px',paddingTop:'5px'}} src={coriLogo}alt="" />
        }
        {
          config.dbCode==='02'&&<img className='hide-on-small-only' style={{width:'200px',height:'60px',paddingTop:'5px'}} src={grandLogo}alt="" />
        }</a>
        <a data-target="slide-out" className="sidenav-trigger show-on-small"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a onClick={handleInicio}>Inicio</a></li>
          {config.rol==="admin"&&<li><a onClick={()=>{selectView("config");}}>Configuración</a></li>}
          <li><a onClick={onSignOut}>Salir</a></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id='slide-out' ref={handleSidenavRef}>
      <li>
        <div className="user-view">
          <div className="backgroud">
          {
          config.dbCode==='01'&&<img className="responsive-img"src={coriLogo}alt="" />
        }
        {
          config.dbCode==='02'&&<img className="responsive-img" src={grandLogo}alt="" />
        }
          </div>
          <a ><span className="email">{user.email}</span></a>
        </div>
      </li>
          <li><a className='sidenav-close' onClick={handleInicio}><i className="material-icons">home</i>Inicio</a></li>
          {config.rol==="admin"&&<li><a className='sidenav-close' onClick={()=>{selectView("config")}}><i className="material-icons">settings</i>Configuración</a></li>}
          <li><a className='sidenav-close' onClick={onSignOut}><i className="material-icons">logout</i>Salir</a></li>
        </ul>
  </div>
    </>
  )
}

export default Nav