import { auth } from "../backend/firebase.js";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signUp = async(email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const signIn = async(email,password)=>{    
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
    return userCredential
  } catch (error) {
   throw error
  }
}

export const signout = async()=>{
  signOut(auth).then(() => {
  console.log('logout successfully')
}).catch((error) => {
  throw error
});
}

