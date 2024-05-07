import app from '../runtime/config/firebase-client.js';
import { getFirestore, } from 'firebase/firestore';



// Initialize Cloud Firestore and get a reference to the service
const fireboose = function (app) {
  return getFirestore(app)
}

// The creation of the DB must begin through the execution of 
// fireboose function
const db = fireboose(app);




export default db;