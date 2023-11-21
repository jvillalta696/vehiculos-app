import React, { useEffect, useState } from 'react'
import { addUsers, deleteUser, getUsers } from '../services/autUser.service'
import Loading from '../components/loadings/Loading';
import { getById, insert, remove, update } from '../services/firestore.service';
import UserForm from '../components/forms/UserForm';
import M from 'materialize-css';
import { useAuth } from '../contexts/AuthContext';
import { validateCreateData, validateLoginData, validateUserData } from '../libs/validations';

const ConfigView = ({ isLoading }) => {



    const templateUser = {
        email: "",
        password: "",
        dbCode: "",
        rol: "",
        companyName: "",
        modifyFields: {
            CodColorTap: true,
            CodUbicacion: true,
            Comentarios: true,
            DUA: true,
            kilometraje: true,
        }
    }

    const [typeForm, setTypeForm] = useState("");
    const [users, setUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const {user}=useAuth();

    const validateSameUser = (data)=>{
        if(data===user.uid){
            throw new Error("No puedes eliminar el usuario actual");
        }
    }

    const handleGetUser = async () => {
        try {
            isLoading(true);
            const response = await getUsers();
            console.log(response);
            setUsers(response);
        } catch (error) {
            alert(error.message);
        } finally { isLoading(false) };
    }

    const handlegetCurrentUser = async (uid, email) => {
        try {
            isLoading(true);
            const usrConf = await getById('Usuarios', uid);
            setCurrentUser({ ...usrConf.data(), email, id: uid });
            console.log(usrConf.data());
        } catch (error) {
            alert(error.message);
        }finally{isLoading(false)}

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
            isLoading(true);
            validateUserData(currentUser);
            await update("Usuarios", currentUser, id)
            M.toast({ html: 'Usuario actualizado con exito', classes: 'rounded teal' });
            //alert("Actualizacion exitosa!!")
        } catch (error) {
            M.toast({html: error.message,classes:'rounded red'})
        }finally{isLoading(false)}
    }

    const handleCreateUser = async (newUser) => {
        try {            
            isLoading(true);
            validateCreateData(newUser);
            validateUserData(newUser);            
            console.log(newUser);
            const {
                companyName,
                dbCode,
                email,
                modifyFields,
                password,
                rol,
            } = newUser;
            const response = await addUsers({ email, password });
            await insert("Usuarios", { dbCode, companyName, email, modifyFields, rol, uid: response.uid }, response.uid);
            //alert("usuario creado exitosamente");
            M.toast({ html: 'Usuario creado con exito', classes: 'rounded teal' });
            setCurrentUser(null);
            setUsers(null);
            await handleGetUser();
        } catch (error) {
            M.toast({html: error.message,classes:'rounded red'})
        }finally{isLoading(false)}
    }

    const handleDelete = async (id) => {
        try {
            validateSameUser(id);
        await deleteUser(id);
        await remove("Usuarios", id);
        M.toast({ html: 'Usuario borrado con exito', classes: 'rounded teal' });
        //alert("Usuario borrado con exito");
        setUsers(null);
        await handleGetUser();
        } catch (error) {
            M.toast({ html: error.message, classes: 'rounded red' })
        }
        
    }

    const handleOnChange = (e) => {
        const { name, value, selectedOptions } = e.target;
        setCurrentUser({ ...currentUser, [name]: value, companyName: name === "dbCode" ? selectedOptions[0].text : currentUser.companyName, })
    }

    useEffect(() => {
        handleGetUser();
    }, [])


    if (users) {
        return (
            <div className='card'>
                <div className="card-content">
                    <span className='card-title'>Configuracion</span>
                    {!currentUser && <>
                        <button className='btn' onClick={() => { setTypeForm("add"); setCurrentUser(templateUser) }}><i className='large right prefix material-icons'>add</i> Agregar Usuario</button>
                        <ul className='collection'>
                            {users.map(usr => (
                                <li className='collection-item' key={usr.uid}>
                                    <div className='row' style={{ marginBottom: '0px' }}>
                                        <div className='col s12 m6'>
                                            <div>
                                                <span className='flow-text'>{usr.email}</span>
                                            </div>

                                        </div>
                                        <div className='col s12 m6'>
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <div style={{ padding: '5px' }}>
                                                    <button className='btn-floating waves-effect waves-light'
                                                        onClick={() => { setTypeForm("update"); handlegetCurrentUser(usr.uid, usr.email) }}>
                                                        <i className='large material-icons'>edit</i>
                                                    </button>
                                                </div>
                                                <div style={{ padding: '5px' }}>
                                                    <button className='btn-floating waves-effect waves-light red lighten-2' onClick={() => { handleDelete(usr.uid) }}><i className='large material-icons'>delete</i></button>
                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                </li>
                            ))}
                        </ul>
                    </>}
                    {currentUser &&
                        <UserForm
                            currentUser={currentUser}
                            updateUser={handleUpdateUser}
                            updateCurrent={setCurrentUser}
                            addUser={handleCreateUser}
                            change={handleOnChange}
                            modifyProperty={handleModificarPropiedad}
                            typeForm={typeForm} />}
                </div>

            </div>

        )
    } else { return (<><div style={{ display: 'grid', placeItems: 'center' }}><Loading /></div></>) }
}


export default ConfigView