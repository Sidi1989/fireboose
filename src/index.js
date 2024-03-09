import { getFirestore, } from 'firebase/firestore';




// Initialize Cloud Firestore and get a reference to the service
const db = function (app) {
  return getFirestore(app)
}




export default db;