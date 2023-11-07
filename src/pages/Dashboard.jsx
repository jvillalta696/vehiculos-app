import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getColor, getUbicacion, getVehiculo } from '../services/vehiculos.service'
import SelectUbicaciones from '../components/selects/SelectUbicaciones';

const Dashboard = () => {
    
    const [vehiculo, setVehiculo] = useState({});
    const [codUb, setCodUb] = useState(null)    
    const {signout, config} = useAuth()

    const handleOnChange = (e)=>{
        const { name,value} = e.target;
        setVehiculo({...vehiculo,[name]:value});
        console.log(name,' | ',value)
    };
    
    const handleGetVehiculoByVIN = async()=>{
       try {
        const {vin}= vehiculo
        const data = await getVehiculo(vin,config.dbCode);
        setVehiculo(data[0]);
        setCodUb(data[0].CodUbicacion)
       } catch (error) {
        alert(error.message)
       }
    };

    const handleGetColor = async()=>{
        try {
         const {dbcode}= vehiculo
         await getColor(dbcode);
        } catch (error) {
         alert(error.message)
        }
     };

     const handleGetUbicación = async()=>{
        try {
         const {dbcode}= vehiculo
         await getUbicacion(dbcode);
        } catch (error) {
         alert(error.message)
        }
     };


  return (
    <>
    <header>
    <button onClick={signout}>Salir</button>
    </header>
    <main>
    <h1>Dashboard</h1>
    <label htmlFor="vin">VIN</label>
    <input type="text" name="vin" onChange={handleOnChange}/>
    <button onClick={handleGetVehiculoByVIN}>GET VEHICULO</button>
    <button onClick={handleGetUbicación}>GET UBICACION</button>
    <button onClick={handleGetColor}>GET COLOR</button>
    <SelectUbicaciones value={{codUb}}/>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default Dashboard