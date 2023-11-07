import React, { useEffect, useState } from 'react'
import { getUbicacion } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../loadings/Loading';

const SelectUbicaciones = ({codUb}) => {

    const [ubicaciones, setUbicaciones] = useState(null);
    const {config} = useAuth();

    const handleGetUbicaciones = async(dbCode)=>{
        try {
            const data = await getUbicacion(dbCode);
            setUbicaciones(data);
           } catch (error) {
            alert(error.message)
           }
    }

    useEffect(() => {
        if(config)
      handleGetUbicaciones(config.dbCode);
    }, [config])
    
  return ubicaciones && (
    <>
    <select name="CodUbicacion" value={codUb&&codUb||''}>
        <option value="">Seleccione una opcion</option>
        {
            ubicaciones.map((ub)=>(
                <option key={ub.Code} value={ub.Code}>{ub.Name}</option>
            ))
        }
    </select>
    </>
  )||<Loading/>
}

export default SelectUbicaciones