import React, { useState } from 'react'
import SelectUbicaciones from '../selects/SelectUbicaciones'
import SelectColor from '../selects/SelectColor'
import { pathVehiculo } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';


const VehiculoForm = ({ data, close }) => {
    const [upVehiculo, setUpVehiculo] = useState({});
    const { config } = useAuth()
    const handleOnchage = (e) => {
        const { name, value } = e.target;
        setUpVehiculo({ ...upVehiculo, [name]: value });
        data[name] = value
        console.log(name, ' | ', value)
    }

    const handleSubmit = async () => { 
        try {
            const response = await pathVehiculo(upVehiculo, config.dbCode, data.VIN); 
            console.log(response)
            alert('Datos actualizados con exito'); 
        } catch (error) {
            alert(error.message)
        }
    }

    const handleClose = ()=>{
        close(null)
    }

    return (
        <div>
            <div>
                <h1>VEHICULO {data.VIN}</h1>
            <label htmlFor="Marca">Marca</label>
                <input type="text" name="Marca" disabled={true} onChange={()=>{}} value={data.Marca} />
                <label htmlFor="Estilo">Estilo</label>
                <input type="text" name="Estilo" disabled={true} onChange={()=>{}} value={data.Estilo} />
                <label htmlFor="Año">Año</label>
                <input type="text" name="Año" disabled={true} onChange={()=>{}} value={data.Año} />
            </div>
            <div>
            <label htmlFor="NoMotor">NoMotor</label>
                <input type="text" name="NoMotor" disabled={true} onChange={()=>{}} value={data.NoMotor} />
                <label htmlFor="CodFabrica">CodFabrica</label>
                <input type="text" name="CodFabrica" disabled={true} onChange={()=>{}} value={data.CodFabrica} />
                <label htmlFor="UltimaFechServ">Ultima Fech Serv</label>
                <input type="text" name="UltimaFechServ" disabled={true} onChange={()=>{}} value={data.UltimaFechServ} />
            </div>
            <div>
            <label htmlFor="ColorVehiculo">ColorVehiculo</label>
                <input type="text" name="ColorVehiculo" disabled={true} onChange={()=>{}} value={data.ColorVehiculo} />
                <label htmlFor="NoPedidoFab">NoPedidoFab</label>
                <input type="text" name="NoPedidoFab" disabled={true} onChange={()=>{}} value={data.NoPedidoFab} />               
            </div>
            <div>
                <label htmlFor="Comentarios">Comentarios</label>
                <input type="text" name="Comentarios" disabled={!config.modifyFields.Comentarios} onChange={handleOnchage} value={data.Comentarios} />
                <label htmlFor="DUA">DUA</label>
                <input type="text" name="DUA" disabled={!config.modifyFields.DUA} onChange={handleOnchage} value={data.DUA} />
            </div>
            <div>
                <label htmlFor="kilometraje">kilometraje</label>
                <input type="text" name="kilometraje" disabled={!config.modifyFields.kilometraje} onChange={handleOnchage} value={data.kilometraje} />
            </div>
            <div>
                <label htmlFor="codUbicacion">Ubicacion</label>
                <SelectUbicaciones name="CodUbicacion" update={handleOnchage} data={data.CodUbicacion} />
                <label htmlFor="CodColorTap">Color Tapa</label>
                <SelectColor name="CodColorTap" update={handleOnchage} data={data.CodColorTap} />
            </div>
            <div>
                <button onClick={handleSubmit}>actualizar</button>
                <button onClick={handleClose}>salir</button>
            </div>
        </div>
    )
}

export default VehiculoForm