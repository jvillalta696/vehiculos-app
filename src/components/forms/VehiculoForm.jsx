import React, { useEffect, useState } from 'react'
import SelectUbicaciones from '../selects/SelectUbicaciones'
import SelectColor from '../selects/SelectColor'
import { pathVehiculo } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import M from 'materialize-css';
import { validateVehiculoData } from '../../libs/validations';
const VehiculoForm = ({ data, close, isLoading, cdDB }) => {
    const [upVehiculo, setUpVehiculo] = useState(null);
    const { config } = useAuth()
    const handleOnchage = (e) => {
        const { name, value } = e.target;
        setUpVehiculo({ ...upVehiculo, [name]: value });
        data[name] = value
        console.log(name, ' | ', value)
    }

    const handleSubmit = async () => {
        try {
            isLoading(true);
            validateVehiculoData(upVehiculo)
            const response = await pathVehiculo(upVehiculo, cdDB, data.VIN);
            console.log(response)
            //alert('Datos actualizados con exito');
            M.toast({ html: 'Datos actualizados con exito', classes: 'rounded teal' });
        } catch (error) {
            //alert(error.message)
            M.toast({ html: error.message, classes: 'rounded red' });
        }finally{isLoading(false)}
    }

    const handleClose = () => {
        close(null)
    }

    useEffect(() => {
        M.updateTextFields();
    }, [])


    return (
        <div>
           <div className="card">
            <div className="card-content">
            <h5 className='center'>Vehículo: {data.VIN}</h5>
            <div className="row">
                <div className="col s12 m4">
                    <label>Marca: </label>
                    <span >{data.Marca}</span>
                </div>
                <div className="col s12 m4">
                    <label>Estilo: </label>
                    <span>{data.Estilo}</span>
                </div>
                <div className="col s12 m4">
                    <label>Año: </label>
                    <span>{data.Año}</span>
                </div>
            </div>
            <div className='row'>
                <div className="col s12 m4">
                    <label >NoMotor: </label>
                    <span >{data.NoMotor}</span>
                </div>
                <div className="col s12 m4">
                    <label >CodFabrica: </label>
                    <span >{data.CodFabrica}</span>
                </div>
                <div className="col s12 m4">
                    <label >Ultima Fech Serv: </label>
                    <span >{data.UltimaFechServ}</span>
                </div>
            </div>
            <div className='row'>
                <div className="col s12 m4">
                    <label >ColorVehiculo: </label>
                    <span >{data.ColorVehiculo}</span>
                </div>
                <div className="col s12 m4">
                    <label >NoPedidoFab: </label>
                    <span >{data.NoPedidoFab}</span>
                </div>
            </div>
            </div>
           </div>
           <div className="card">
            <div className="card-content">
            <h5 className='center'>Reserva</h5>
            <div className="row">
                <div className="col s12 m4">
                    <label>Estado de Venta: </label>
                    <span >{data.EstadoVenta}</span>
                </div>
                <div className="col s12 m4">
                    <label>Fecha Reserva: </label>
                    <span>{data.FechaReserva}</span>
                </div>
                <div className="col s12 m4">
                    <label>Vendedor: </label>
                    <span>{data.Vendedor}</span>
                </div>
            </div>
            <div className='row'>
                <div className="col s12 m4">
                    <label >Fecha Arribo: </label>
                    <span >{data.FechaArribo}</span>
                </div>
                <div className="col s12 m4">
                    <label >Fecha Ven Reserva: </label>
                    <span >{data.FechaVenc_Reserva}</span>
                </div>
                {/*<div className="col s12 m4">
                    <label >Ultima Fech Serv: </label>
                    <span >{data.UltimaFechServ}</span>
    </div>*/}
            </div>
            <div className='row'>
                <div className="col s12">
                    <label >Observaciones: </label>
                    <span >{data.Observaciones}</span>
                </div>
            </div>
            </div>
           </div>
            <div className="card">
                <div className="card-content">
                    <h5 className='card-title center'>Datos para actualizar</h5>
                    <div className='row'>
                        <div className="input-field col s12 m4">
                            <input type="text" name="Comentarios" id='Comentarios' disabled={!config.modifyFields.Comentarios} onChange={handleOnchage} value={data.Comentarios} />
                            <label htmlFor="Comentarios">Comentarios</label>
                        </div>
                        <div className="input-field col s12 m4">
                            <input type="text" name="DUA" id='DUA' disabled={!config.modifyFields.DUA} onChange={handleOnchage} value={data.DUA} />
                            <label htmlFor="DUA">DUA</label>
                        </div>
                        <div className="input-field col s12 m4">
                            <input type="text" name="kilometraje" id='kilometraje' disabled={!config.modifyFields.kilometraje} onChange={handleOnchage} value={data.kilometraje} />
                            <label htmlFor="kilometraje">kilometraje</label>
                        </div>
                    </div>
                    <div className='row'>
                        <SelectUbicaciones name="CodUbicacion" update={handleOnchage} data={data.CodUbicacion} cdDB={cdDB}/>
                        <SelectColor name="CodColorTap" update={handleOnchage} data={data.CodColorTap} />
                    </div>


                </div>
                <div className="card-action">
                    <div className='row'>
                        <div className="col s6 center">
                            <button disabled={!upVehiculo} className='btn' onClick={handleSubmit}>actualizar</button>

                        </div>
                        <div className="col s6 center">
                            <button  className='btn yellow lighten-2 black-text' onClick={handleClose}>salir</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default VehiculoForm