import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/autUser.service'
import Loading from '../components/loadings/Loading';
import { getById, update } from '../services/firestore.service';

const ConfigView = () => {

    const [users, setUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const handleGetUser = async () => {
        try {
            const response = await getUsers();
            console.log(response);
            setUsers(response);
        } catch (error) {
            alert(error.message);
        }
    }

    const handlegetCurrentUser = async (uid, email) => {
        const usrConf = await getById('Usuarios', uid);
        setCurrentUser({ ...usrConf.data(), email, id: uid });
        console.log(usrConf.data());
    }

    const handleModificarPropiedad = (propiedad) => {
        // Copia del objeto externo
        const value = !currentUser.modifyFields[propiedad];
        const nuevoModifyFields = { ...currentUser.modifyFields };
        // Modifica la propiedad deseada       
        nuevoModifyFields[propiedad] = value;
        // Actualiza el estado con el nuevo objeto externo
        setCurrentUser({
            ...currentUser,
            modifyFields: nuevoModifyFields,
        });
        console.log(currentUser)
    };

    const handleUpdateUser = async (id) => {
        try {
            await update("Usuarios", currentUser, id)
            alert("Actualizacion exitosa!!")
        } catch (error) {
            alert(`No se a podido actualizar: ${error.message}`)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value })
    }

    useEffect(() => {
        handleGetUser();
    }, [])


    if (users) {
        return (
            <div>
                <h1>ConfigView</h1>
                {!currentUser && <ul>
                    {users.map(usr => (
                        <li key={usr.uid}>
                            {usr.email}
                            <button onClick={() => { handlegetCurrentUser(usr.uid, usr.email) }}>Edit</button>
                        </li>

                    ))}
                </ul>}
                {currentUser && <>
                    <div>
                        <label htmlFor="email">Usuario: </label>
                        {/*<input type="text" name="email" onChange={handleOnChange} value={currentUser.email} />*/}
                        <span>{currentUser.email}</span>
                    </div>
                    <div>
                        <label htmlFor="rol">Rol:</label>
                        <select name="rol" onChange={handleOnChange} value={currentUser.rol}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label htmlFor="dbCode">Compañia :</label>
                        <select name="dbCode" onChange={handleOnChange} value={currentUser.dbCode}>
                            <option value="01">Cori Car</option>
                            <option value="02">GrandMotors</option>
                        </select>
                    </div>


                    <ul>
                        {Object.keys(currentUser.modifyFields).map((propertyName) => (
                            <li key={propertyName}>
                                {propertyName}: {currentUser.modifyFields[propertyName] === true ? 'Verdadero' : 'Falso'}
                                <button onClick={() => { handleModificarPropiedad(propertyName) }}>
                                    Cambiar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => { handleUpdateUser(currentUser.id) }}>Actualizar</button>
                    <button onClick={() => { setCurrentUser(null) }}>salir</button>
                </>}
            </div>

        )
    } else { return (<Loading />) }


}


export default ConfigView