import { Button, StyleSheet, View,Text,Image, Alert } from 'react-native';
import 'expo-dev-client';
import {getAuth, FacebookAuthProvider, signInWithCredential} from 'firebase/auth'
import {firebase} from './cocnfig'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import { useEffect, useState } from 'react';

export default function App() {
const [initilizing, setInitilizing] = useState(true);
const [user, setUser] = useState(undefined);
const [userData, setUserData] = useState({});

function onAuthStateChanged(user){
  setUser(user);
  if(initilizing) setInitilizing(false);
}

useEffect(()=>{
  const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
},[]);

useEffect(()=>{
  console.log(userData)
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

  return (
    <View style={styles.container}>
      {
        userData.displayName?<View style={styles.marginStyle}>
          <Image source={{uri: userData.photoUrl}} style={styles.imageStyle} />
          <Text>{userData.displayName}</Text>
          <Text>{userData.email}</Text>
        </View>:null
      }
      {
        userData.displayName? <Button title='Logout' onPress={signOut} /> : <Button title='Facebook Login' onPress={signInWithFB} />
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginStyle:{
    marginBottom:20
  },
  imageStyle:{
    marginLeft:20,
    marginBottom:30,
    height:100,
    width:100,
    borderRadius:100,
    borderColor:"black",
    borderWidth:2
    
  }
});
