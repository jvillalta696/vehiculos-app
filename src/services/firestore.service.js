import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";


export const getById = async(collectionName,id)=>{
    const docRef = doc(db,collectionName,id);
    const docSnap = await getDoc(docRef)
    return docSnap;
}