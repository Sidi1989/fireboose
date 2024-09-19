import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';




/**
 * @description 
 * @param {Object} clientConfig 
 * @return {Void}
 */
const connect = function (clientConfig) {
  this.config = clientConfig;

  // Initialize a Firebase App (without name 'ad hoc', as this will be
  // considered the default app created for the project)
  const app = initializeApp(clientConfig);
  this.app = app;
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  this.db = db;
}




export {connect};