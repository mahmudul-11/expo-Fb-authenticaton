import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD_J6g87h9GGSlaxC3Iz1d21pjsZDvkBoQ",
    authDomain: "expotesting2.firebaseapp.com",
    projectId: "expotesting2",
    storageBucket: "expotesting2.appspot.com",
    messagingSenderId: "187684033799",
    appId: "1:187684033799:web:2e48a595782b916b0e21a2"
  };


    firebase.initializeApp(firebaseConfig);
  

export { firebase }