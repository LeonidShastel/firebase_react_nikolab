import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/database"

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAupvaAGsrdeeOplIs8VlzMseAO_Yr8FTo",
  authDomain: "niko-labs-6db4e.firebaseapp.com",
  databaseURL: "https://niko-labs-6db4e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "niko-labs-6db4e",
  storageBucket: "niko-labs-6db4e.appspot.com",
  messagingSenderId: "120905005479",
  appId: "1:120905005479:web:231ec23a7680a8f9029e82"
};

function initFirebase(){
  if(!firebase.apps.length){
    firebase.initializeApp(config);

  }
}

initFirebase();

export { firebase };