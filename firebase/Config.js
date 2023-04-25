import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDJ3H_G4ZE-3dD0yyitvDN1dUogP59hMzk",
    authDomain: "recipepal-158ca.firebaseapp.com",
    databaseURL: "https://recipepal-158ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recipepal-158ca",
    storageBucket: "recipepal-158ca.appspot.com",
    messagingSenderId: "830372151014",
    appId: "1:830372151014:web:0b9cafdddd76a57c13c527"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const USERS_REF = '/users/';
export const FAVORITES_REF = '/favorites/';