import axios from "axios"; 

export const getUsers = async()=>{
    try {     
        const response = await axios.get(`https://db.cloud.delserint.com:18001/api/v1/user/`);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const addUsers = async(data)=>{
    try {     
        const response = await axios.post(`https://db.cloud.delserint.com:18001/api/v1/user/`,data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const deleteUser = async(id)=>{
    try {     
        const response = await axios.delete(`https://db.cloud.delserint.com:18001/api/v1/user/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}