import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getVehiculo } from '../services/vehiculos.service'
import TableVehiculos from '../components/tables/TableVehiculos';
import VehiculoForm from '../components/forms/VehiculoForm';
import Loading from '../components/loadings/Loading';
import ConfigView from '../views/ConfigView';
import Nav from '../components/navs/Nav';

const Dashboard = () => {

  const [vehiculos, setVehiculos] = useState(null);
  const [currentVehiculo, setCurrentVehiculo] = useState(null);
  const [currentView, setCurrentView] = useState("main")
  const [vin, setVin] = useState(null);
  const { signout, config } = useAuth()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVin(value);
    console.log(name, ' | ', value)
  };

  const handleSetCurrentView = (view) => {
    setCurrentView(view);
  }

  const handleGetVehiculoByVIN = async () => {
    try {
      setCurrentVehiculo(null);
      const data = await getVehiculo(vin, config.dbCode);
      setVehiculos(data);
    } catch (error) {
      alert(error.message)
    }
  };

  if (config) {
    return (
      <>
        <header>
          <Nav selectView={handleSetCurrentView} onSignOut={signout} reset={setCurrentVehiculo}/>
        </header>
        <main>
          <div className="container">
            <h1 className='center'>Dashboard</h1>
            <h5>Compañia: {config.companyName}</h5>
            {currentView === "main" && <>
            <div className="row">
              <div className="input-field col s12 m6">                
                <i className='material-icons prefix'>search</i>
              <input type="text" name="vin" id="vin"onChange={handleOnChange} />
              <label htmlFor="vin">VIN</label>
              </div>
              <div className="col s12 m6 input-field">
              <button className='btn' onClick={handleGetVehiculoByVIN}>Buscar</button>
              </div>
            </div>
              
              <div>
                {vehiculos && <TableVehiculos data={vehiculos} update={setCurrentVehiculo} reset={setVehiculos} />}
                {currentVehiculo && <VehiculoForm data={currentVehiculo} close={setCurrentVehiculo} />}
              </div>
            </>}
            {currentView === "config" && <ConfigView />}
          </div>

        </main>
        <footer>

        </footer>
      </>
    )
  } else { return (<Loading />) }
}

export default Dashboard