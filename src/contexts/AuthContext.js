import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserSessionPersistence,

} from "firebase/auth";
import { auth } from '../backend/firebase';
import { getById } from "../services/firestore.service";

const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [config, setConfig]=useState(null)

    const signIn = async(email, psw) => {
        try {
            await setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, email, psw);
                })        
            .catch((e)=>{throw e})
            //await signInWithEmailAndPassword(auth, email, psw)
        } catch (error) {
            throw error
        }

    };
    const signout = () => signOut(auth)

    const getConfig = async()=>{
        if(user){
            const usrConf = await getById('Usuarios',user.uid);
            setConfig(usrConf.data());
            console.log(usrConf.data());
        }
    }

    useEffect(() => {
        const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);            
            setLoading(false);            
            console.log('authContext_uf')
        })
        return () => { unsubscirbe() }
    }, []);

    useEffect(() => {
       getConfig();
    }, [user]);

    return (
        <authContext.Provider value={{ signIn, signout, user, loading, config }}>
            {children}
        </authContext.Provider>
    );

}
