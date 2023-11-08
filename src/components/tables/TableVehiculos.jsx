import React from 'react'

const TableVehiculos = ({data,reset,update}) => {
  return (
    <>
    <table>
        <thead>
           <tr>
            <th>VIN</th>
           </tr>
        </thead>
        <tbody>
            {data.map((v)=>(
                <tr key={v.VIN}>
                    <td onClick={()=>{
                        const cv = data.find((dt)=>(dt.VIN=v.VIN))
                        console.log(cv);
                        update(cv);
                        reset(null);
                        }}>
                        {v.VIN}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default TableVehiculos