import React, { useEffect, useState } from 'react'
import { getUbicacion } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../loadings/Loading';

const SelectUbicaciones = ({data, update}) => {

    const [ubicaciones, setUbicaciones] = useState(null);
    const [currentUB, setCurrentUB] = useState("");
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
    }, [config]);

    useEffect(() => {      
      if(data)setCurrentUB(data);
      console.log('codub_efect')
  }, [data]);


    
  if(ubicaciones) {return (
    <>
    <select name="CodUbicacion" onChange={update}value={currentUB} disabled={!config.modifyFields.CodUbicacion}>
        <option value="">Seleccione una opcion</option>
        {
            ubicaciones.map((ub)=>(
                <option key={ub.Code} value={ub.Code}>{ub.Name}</option>
            ))
        }
    </select>
    </>
  )}else{return <Loading/>}
}

export default SelectUbicaciones