import React, { useEffect, useState } from 'react'
import { getColor } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../loadings/Loading';

const SelectColor = ({data, update}) => {

    const [color, setColor] = useState(null);
    const [currentColor, setCurrentColor] = useState("");
    const {config} = useAuth();

    const handleGetColor = async(dbCode)=>{
        try {
            const data = await getColor(dbCode);
            setColor(data);
           } catch (error) {
            alert(error.message)
           }
    }

    useEffect(() => {
        if(config)
      handleGetColor(config.dbCode);
    }, [config]);

    useEffect(() => {      
      if(data)setCurrentColor(data);
      console.log('codColor_efect')
  }, [data]);


    
  if(color) {return (
    <>
    <select name="CodColorTap" onChange={update}value={currentColor} disabled={!config.modifyFields.CodColorTap}>
        <option value="">Seleccione una opcion</option>
        {
            color.map((cl)=>(
                <option key={cl.Code} value={cl.Code}>{cl.Name}</option>
            ))
        }
    </select>
    </>
  )}else{return <Loading/>}
}

export default SelectColor