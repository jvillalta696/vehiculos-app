import React, { useEffect, useState } from 'react'
import { getColor } from '../../services/vehiculos.service';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../loadings/Loading';
import M from 'materialize-css';

const SelectColor = ({ data, update }) => {

  const [color, setColor] = useState(null);
  const [currentColor, setCurrentColor] = useState("");
  const { config } = useAuth();

  const handleGetColor = async (dbCode) => {
    try {
      const data = await getColor(dbCode);
      setColor(data);
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSelectRef = (ref)=>{
    if(ref)M.FormSelect.init(ref);
  }

  useEffect(() => {
    if (config)
      handleGetColor(config.dbCode);
  }, [config]);

  useEffect(() => {
    if (data) {
      setCurrentColor(data);
    }
    console.log('codColor_efect')
  }, [data]);



  if (color) {
    return (
      <>
        <div className="input-field col s12 m6">          
          <select name="CodColorTap" ref={handleSelectRef} id="CodColorTap" onChange={update} value={currentColor} disabled={!config.modifyFields.CodColorTap}>
            <option value="">Seleccione una opcion</option>
            {
              color.map((cl) => (
                <option key={cl.Code} value={cl.Code}>{cl.Name}</option>
              ))
            }
          </select>
          <label htmlFor="CodColorTap">Color Tapa</label>
        </div>
      </>
    )
  } else { return <Loading /> }
}

export default SelectColor