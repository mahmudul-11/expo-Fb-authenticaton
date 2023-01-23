import {getAuth, FacebookAuthProvider, signInWithCredential} from 'firebase/auth'
import {firebase} from './cocnfig'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import { useEffect, useState } from 'react';

const [initilizing, setInitilizing] = useState(true);
const [user, setUser] = useState(undefined);
const [userData, setUserData] = useState({})


function onAuthStateChanged(user){
    setUser(user);
    if(initilizing) setInitilizing(false);
  }

useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  useEffect(()=>{
    console.log(userData.displayName,userData.email,userData.photoUrl)
  },[userData])

 const signInWithFB = async () =>{
    try {
      await LoginManager.logInWithPermissions(['public_profile','email']);
      const data = await AccessToken.getCurrentAccessToken();
      if(!data){
        return;
      }
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      const auth = getAuth();
      const response = await signInWithCredential(auth,facebookCredential);
      setUserData(response._tokenResponse)
      // if (userData) console.log(userData)
    } catch (e) {
      console.log(e)
    }
  }
  const signOut = async () =>{
    
    try {
      await firebase.auth().signOut();
      setUserData({});
      console.log("Logout Successfully")
    } catch (e) {
      console.log(e)
    }
  }

  export {userData, setUserData, signInWithFB, signOut}
  