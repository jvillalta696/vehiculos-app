import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getVehiculo } from '../services/vehiculos.service'
import TableVehiculos from '../components/tables/TableVehiculos';
import VehiculoForm from '../components/forms/VehiculoForm';
import Loading from '../components/loadings/Loading';
import ConfigView from '../views/ConfigView';

const Dashboard = () => {
    
    const [vehiculos, setVehiculos] = useState(null);
    const [currentVehiculo, setCurrentVehiculo] = useState(null);
    const [currentView, setCurrentView] = useState("main")
    const [vin, setVin] = useState(null);  
    const {signout, config} = useAuth()

    const handleOnChange = (e)=>{
        const { name,value} = e.target;
        setVin(value);
        console.log(name,' | ',value)
    };
    
    const handleSetCurrentView = (view)=>{
      setCurrentView(view);
    }

    const handleGetVehiculoByVIN = async()=>{
       try {
         setCurrentVehiculo(null);        
        const data = await getVehiculo(vin,config.dbCode);
        setVehiculos(data);        
       } catch (error) {
        alert(error.message)
       }
    };

  if(config){ return (
    <>
    <header>
    <button onClick={()=>{handleSetCurrentView("main")}}>Inicio</button>
      {config.rol==="admin"&&<button onClick={()=>{handleSetCurrentView("config")}}>Configuraciones</button>}
    <button onClick={signout}>Salir</button>
    </header>
    <main>
    <h1>Dashboard</h1>
    <h3>Compañia: {config.companyName}</h3>
    {currentView==="main"&&<>
    <label htmlFor="vin">VIN</label>
    <input type="text" name="vin" onChange={handleOnChange}/>
    <button onClick={handleGetVehiculoByVIN}>GET VEHICULO</button>
    <div>
      {vehiculos&&<TableVehiculos data={vehiculos} update={setCurrentVehiculo} reset={setVehiculos}/>}
      {currentVehiculo&&<VehiculoForm data={currentVehiculo} close={setCurrentVehiculo}/>}
    </div>
    </>}
    {currentView==="config"&&<ConfigView/>}    
    </main>
    <footer>

    </footer>
    </>
  )} else { return (<Loading/>)}
}

export default Dashboard