import { 
  collection, doc,
  setDoc, 
} from 'firebase/firestore';




/**
 * @description
 * Async function to set a Firebase document in a collection, after its creation
 * as a new Instance of a Class
 */
const save = async function () {
  let Constructor = this.__proto__.constructor;

  const db = Constructor.db;
  const collectionName = Constructor.collection;
  const collectionRef = collection(db, collectionName);

  const docRef = doc(collectionRef, this.__id);
  await setDoc(docRef, this.info);
  return this.__id;
}




export {
  save,
}