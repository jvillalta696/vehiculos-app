import axios from "axios"; 

const getToken = async()=>{
    try {
        const response = await axios.post('https://db.cloud.delserint.com:1889/api/login/authenticate',
        {
            Username:"Motors",
            Password:"FfUZ6g!#"
        })
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getVehiculo = async(vin, dbcode)=>{
    try {
        const token = await getToken();
        const response = await axios.get(`https://db.cloud.delserint.com:1889/api/Vehiculo/ListVehiculo?CodeBD=${dbcode}&VIN=${vin}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getUbicacion = async(dbcode)=>{
    try {
        const token = await getToken();
        const response = await axios.get(`https://db.cloud.delserint.com:1889/api/Ubicacion/ListUbica?CodeBD=${dbcode}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error
    }
}


export const getColor = async(dbcode)=>{
    try {
        const token = await getToken();
        const response = await axios.get(`https://db.cloud.delserint.com:1889/api/Color/ListColor?CodeBD=${dbcode}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const pathVehiculo = async(data,dbcode,vin)=>{
    try {
        const token = await getToken();
        const response = await axios.patch(`https://db.cloud.delserint.com:1889/api/UpdateVehiculo/UpVehiculo?CodeBD=${dbcode}&VIN=${vin}`,
        data,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        throw error
    }
}



