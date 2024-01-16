import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import M from 'materialize-css';
const SelectCompanies = ({update}) => {
    const [companies, setCompanies] = useState(null);
    const [currentCIA, setCurrentCIA] = useState("");
    const { config } = useAuth();

    const handleSelectRef = (ref)=>{
        if(ref)M.FormSelect.init(ref);
    }
    const getCompanies = ()=>{
        if(config.companies){
            const listCompanies = config.companies.filter(company => company.active);
            setCompanies(listCompanies);
        }else{setCompanies([{companyName:config.companyName,dbCode:config.dbCode}])}
    }

    const handleOnChange = (e)=>{
        update(e.target.value)
    }

    useEffect(() => { 
        if(config)getCompanies(); 
    }, [config])
    

   if(companies){
    return (
        <>
            <div className="input-field col s12 m6">        
              <select name="companyName" id='companyName' ref={handleSelectRef} onChange={handleOnChange} >
                <option value="">Seleccione una opcion</option>
                {
                  companies.map((cia) => (
                    <option key={cia.dbCode} value={cia.dbCode}>{cia.companyName}</option>
                  ))
                }
              </select>
              <label htmlFor="companyName">Compañia</label>
            </div>
          </>
      )
   } else{
    return (<><p>No hay datos de compañia</p></>)
   }
  
}

export default SelectCompanies