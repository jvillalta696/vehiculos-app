import React, { useEffect, useState } from 'react'
import { addUsers, deleteUser, getUsers } from '../services/autUser.service'
import Loading from '../components/loadings/Loading';
import { getById, insert, remove, update } from '../services/firestore.service';
import UserForm from '../components/forms/UserForm';

const ConfigView = () => {

    const templateUser = {
        email:"",
        password:"",
        dbCode: "",
        rol:"",
        companyName:"",
        modifyFields:{
            CodColorTap:true,
            CodUbicacion:true,
            Comentarios:true,
            DUA:true,
            kilometraje:true,
        }
    }

    const [typeForm, setTypeForm] = useState("");
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

    const handleCreateUser = async (newUser)=>{
        try {
            console.log(newUser);
        const {
            companyName,
            dbCode,
            email,
            modifyFields,
            password,
            rol,
        } = newUser;
        const response = await addUsers({email,password});
        await insert("Usuarios",{dbCode,companyName,email,modifyFields,rol,uid:response.uid},response.uid);
        alert("usuario creado exitosamente");
        setCurrentUser(null);
        setUsers(null);
        await  handleGetUser();
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDelete = async (id)=>{
        await deleteUser(id);
        await remove("Usuarios",id);
        alert("Usuario borrado con exito");
        setUsers(null);
        await  handleGetUser();
    }

    const handleOnChange = (e) => {
        const { name, value, selectedOptions} = e.target;
        setCurrentUser({ ...currentUser, [name]: value,companyName: name === "dbCode" ? selectedOptions[0].text : currentUser.companyName, })
    }

    useEffect(() => {
        handleGetUser();
    }, [])


    if (users) {
        return (
            <div>
                <h1>ConfigView</h1>                
                {!currentUser && <>
                <button onClick={()=>{setTypeForm("add");setCurrentUser(templateUser)}}>Agregar Usuario</button>
                <ul>
                    {users.map(usr => (
                        <li key={usr.uid}>
                            {usr.email}
                            <button onClick={() => {setTypeForm("update");handlegetCurrentUser(usr.uid, usr.email) }}>Edit</button>
                            <button onClick={()=>{handleDelete(usr.uid)}}>Delete</button>
                        </li>
                    ))}
                </ul>
                </>}
                {currentUser &&<UserForm currentUser={currentUser} updateUser={handleUpdateUser} updateCurrent={setCurrentUser} addUser={handleCreateUser} change={handleOnChange} modifyProperty={handleModificarPropiedad} typeForm={typeForm}/>}
            </div>

        )
    } else { return (<Loading />) }
}


export default ConfigView