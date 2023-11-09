import axios from "axios"; 

export const getUsers = async()=>{
    try {     
        const response = await axios.get(`https://db.cloud.delserint.com:18001/api/v1/user/`);
        return response.data;
    } catch (error) {
        throw error
    }
}