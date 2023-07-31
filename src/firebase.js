import { getAuth } from "firebase/auth";
import { getFirestore} from "@firebase/firestore"; //for write database
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCSQVO-eixI_t3H66VFq1hj7mD9UCwBR8Y",
  authDomain: "wire-database-14557.firebaseapp.com",
  projectId: "wire-database-14557",
  storageBucket: "wire-database-14557.appspot.com",
  messagingSenderId: "176771589066",
  appId: "1:176771589066:web:9616c9756f312ee956a533",
  measurementId: "G-WQZE51ZYJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app); //for write database
export const auth = getAuth(app);