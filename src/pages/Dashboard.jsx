import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getVehiculo } from '../services/vehiculos.service'
import TableVehiculos from '../components/tables/TableVehiculos';
import VehiculoForm from '../components/forms/VehiculoForm';
import Loading from '../components/loadings/Loading';
import ConfigView from '../views/ConfigView';
import Nav from '../components/navs/Nav';
import LoadingBar from '../components/loadings/LoadingBar';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import M from 'materialize-css';
import SelectCompanies from '../components/selects/SelectCompanies';

const Dashboard = () => {

  const [vehiculos, setVehiculos] = useState(null);
  const [currentVehiculo, setCurrentVehiculo] = useState(null);
  const [currentView, setCurrentView] = useState("main")
  const [vin, setVin] = useState(null);
  const [codeDB, setCodeDB] = useState("");
  //const [data, setData] = useState('');
  const { signout, config, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVin(value);
    console.log(name, ' | ', value)
  };

  const handleSetCurrentView = (view) => {
    setCurrentView(view);
  }

  const handleGetVehiculoByVIN = async (code) => {
    try {
      setLoading(true)
      setCurrentVehiculo(null);
      console.log(codeDB)
      if(codeDB===""){
        M.toast({ html: "Debe de seleccionar una compañia", classes: 'rounded red' });
      }else if(vin===null||vin===undefined||vin===""){
        M.toast({ html: "Debe de introducir un VIN", classes: 'rounded red' });
      }else{
        const data = await getVehiculo(vin, codeDB);
        setVehiculos(data);
      }
      
    } catch (error) {
      alert(error.message)
    } finally { setLoading(false) }
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    console.log(decodedResult);
    setVin(decodedText);
    inputRef.current.value = decodedText;
    console.log(vin);
    M.updateTextFields();

  }

  if (config) {
    return (
      <>
        <header>
          <Nav selectView={handleSetCurrentView} onSignOut={signout} reset={setCurrentVehiculo} />
          {loading && <><LoadingBar /></>}
          <p className='right'>Usario: {user.email}</p>
        </header>
        <main>
          <div className="container">
            <h3 className='center'>Compañia: {config.companyName}</h3>
            {currentView === "main" && <>
              <div className="row">
                <div className="col s12 m4">
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12 input-field">
                  <SelectCompanies update={setCodeDB}/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m4">
                  <i className='material-icons prefix'>search</i>
                  <input type="text" name="vin" id="vin" ref={inputRef} onChange={handleOnChange} />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="col s12 m4 input-field">
                  <button className='btn' onClick={handleGetVehiculoByVIN}>Buscar</button>
                </div>
              </div>
              <div>
                {vehiculos && <TableVehiculos data={vehiculos} update={setCurrentVehiculo} reset={setVehiculos} />}
                {currentVehiculo && <VehiculoForm data={currentVehiculo} close={setCurrentVehiculo} isLoading={setLoading} />}
              </div>
            </>}
            {currentView === "config" && <ConfigView isLoading={setLoading} />}
          </div>

        </main>
        <footer>

        </footer>
      </>
    )
  } else {
    return (<>
      <div className="loading-container">
        <Loading />
      </div>
    </>)
  }
}

export default Dashboard