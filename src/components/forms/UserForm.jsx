import React from 'react'

const UserForm = ({currentUser,updateCurrent, updateUser,addUser, change,modifyProperty,typeForm}) => {
    return (
        <>
            <div>
                <label htmlFor="email">Usuario: </label>
                {
                typeForm==="add"&&<>
                <input type="text" name="email" onChange={change}/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" onChange={change} name="password"/>
                </>                
                }
                {typeForm==="update"&&<span>{currentUser.email}</span>}
            </div>
            <div>
                <label htmlFor="rol">Rol:</label>
                <select name="rol" onChange={change} value={currentUser.rol}>
                    <option value="">Seleccione un tipo de usuario</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="dbCode">Compañia :</label>
                <select name="dbCode" onChange={change} value={currentUser.dbCode}>
                    <option value="">Seleccione una base</option>
                    <option value="01">Cori Car</option>
                    <option value="02">GrandMotors</option>
                </select>
            </div>
            <ul>
                {Object.keys(currentUser.modifyFields).map((propertyName) => (
                    <li key={propertyName}>
                        {propertyName}: {currentUser.modifyFields[propertyName] === true ? 'Verdadero' : 'Falso'}
                        <button onClick={() => { modifyProperty(propertyName) }}>
                            Cambiar
                        </button>
                    </li>
                ))}
            </ul>
            {typeForm==="add"&&<button onClick={() => { addUser(currentUser) }}>Crear</button>}
            {typeForm==="update"&&<button onClick={() => { updateUser(currentUser.id) }}>Actualizar</button>}            
            <button onClick={() => { updateCurrent(null) }}>salir</button>
        </>
    )
}

export default UserForm