import React from 'react'
import M from 'materialize-css'

const UserForm = ({ currentUser, updateCurrent, updateUser, addUser, change, modifyProperty, typeForm }) => {

    const handleSelectRef = (ref) => {
        if (ref) M.FormSelect.init(ref);
    }

    return (
        <>
            <div className='row'>
                {
                    typeForm === "add" && <>
                        <div className="input-field col s12 m6">
                            <label htmlFor="email">Usuario: </label>
                            <input type="text" name="email" id='email' onChange={change} />
                        </div>
                        <div className="input-field col s12 m6">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id='password' onChange={change} name="password" />
                        </div>
                    </>
                }
                {typeForm === "update" && <>
                    <div className="col s12 m6">
                        <label htmlFor="email">Usuario: </label>
                        <span>{currentUser.email}</span>
                    </div>
                </>}
            </div>
            <div className='row'>
                <div className="input-field col s12 m6">
                    <select ref={handleSelectRef} name="rol" id='rol' onChange={change} value={currentUser.rol}>
                        <option value="">Seleccione un tipo de usuario</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <label htmlFor="rol">Rol:</label>
                </div>
                <div className="input-field col s12 m6">
                    <select ref={handleSelectRef} name="dbCode" id='dbCode' onChange={change} value={currentUser.dbCode}>
                        <option value="">Seleccione una base</option>
                        <option value="01">Cori Car</option>
                        <option value="02">GrandMotors</option>
                    </select>
                    <label htmlFor="dbCode">Compañia :</label>
                </div>
            </div>
            <ul>
                {
                    Object.keys(currentUser.modifyFields).map((propertyName) => (
                        <li key={propertyName}>
                            {propertyName}:
                            <div className="switch">
                                <label>
                                    Deshabilitado
                                    <input
                                        type="checkbox"
                                        checked={currentUser.modifyFields[propertyName]} // Set the initial value
                                        onChange={() => modifyProperty(propertyName)}
                                    />
                                    <span className="lever"></span>
                                    Habilitado
                                </label>
                            </div>
                        </li>
                    ))}
            </ul>
            <div className='row center'>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {typeForm === "add" && <button className='btn waves-effect waves-light' onClick={() => { addUser(currentUser) }}>Crear</button>}
                    {typeForm === "update" && <button className='btn waves-effect waves-light' onClick={() => { updateUser(currentUser.id) }}>Actualizar</button>}
                    <button className='btn waves-effect waves-light yellow lighten-2 black-text' onClick={() => { updateCurrent(null) }}>salir</button>
                </div>

            </div>


        </>
    )
}

export default UserForm