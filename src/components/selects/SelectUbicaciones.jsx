import React, { useEffect, useState } from 'react'
import { getUbicacion } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../loadings/Loading';
import M from 'materialize-css';

const SelectUbicaciones = ({ data, update, cdDB }) => {

  const [ubicaciones, setUbicaciones] = useState(null);
  const [currentUB, setCurrentUB] = useState("");
  const { config } = useAuth();

  const handleGetUbicaciones = async (dbCode) => {
    try {
      const data = await getUbicacion(dbCode);
      setUbicaciones(data);
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (cdDB){    
      handleGetUbicaciones(cdDB);
    }      
  }, [cdDB]);

  useEffect(() => {
    if (data) setCurrentUB(data);
    console.log('codub_efect')
  }, [data]);

  const handleSelectRef = (ref)=>{
    if(ref)M.FormSelect.init(ref);
  }

  if (ubicaciones) {
    return (
      <>
        <div className="input-field col s12 m6">
        
          <select name="CodUbicacion" id='codUbicacion' ref={handleSelectRef} onChange={update} value={currentUB} disabled={!config.modifyFields.CodUbicacion}>
            <option value="">Seleccione una opcion</option>
            {
              ubicaciones.map((ub) => (
                <option key={ub.Code} value={ub.Code}>{ub.Name}</option>
              ))
            }
          </select>
          <label htmlFor="codUbicacion">Ubicacion</label>
        </div>

      </>
    )
  } else { return <Loading /> }
}

export default SelectUbicaciones