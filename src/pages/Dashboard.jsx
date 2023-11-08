import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getVehiculo } from '../services/vehiculos.service'
import TableVehiculos from '../components/tables/TableVehiculos';
import VehiculoForm from '../components/forms/VehiculoForm';

const Dashboard = () => {
    
    const [vehiculos, setVehiculos] = useState(null);
    const [currentVehiculo, setCurrentVehiculo] = useState(null);
    const [vin, setVin] = useState(null);
    const [codUb, setCodUb] = useState(null); 
    const [codColor, setCodColor] = useState(null);    
    const {signout, config} = useAuth()

    const handleOnChange = (e)=>{
        const { name,value} = e.target;
        setVin(value);
        console.log(name,' | ',value)
    };
    
    const handleGetVehiculoByVIN = async()=>{
       try {
         setCurrentVehiculo(null);        
        const data = await getVehiculo(vin,config.dbCode);
        setVehiculos(data);        
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
    <div>
      {vehiculos&&<TableVehiculos data={vehiculos} update={setCurrentVehiculo} reset={setVehiculos}/>}
      {currentVehiculo&&<VehiculoForm data={currentVehiculo} close={setCurrentVehiculo}/>}
    </div>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default Dashboard