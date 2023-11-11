import React from 'react'

const LoginTest = () => {
    return (
        <div className="container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-content">
                  <span className="card-title">Iniciar sesión</span>
                  <div className="input-field">
                    <input
                      type="email"
                      id="email"                  
                    />
                    <label htmlFor="email">Correo electrónico</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      id="password"                      
                    />
                    <label htmlFor="password">Contraseña</label>
                  </div>
                </div>
                <div className="card-action">
                  <button
                    className="btn waves-effect waves-light"                    
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default LoginTest