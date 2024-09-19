import { 
  collection, doc,
  setDoc, 
} from 'firebase/firestore';




/**
 * @description
 * Set an instance (previously created through: new Class(info)) as a 
 * Firestore document in a collection.
 * 
 * @returns {Promise<String>} Id of the instance
 */
const save = async function () {
  let Constructor = this.__proto__.constructor;

  const db = Constructor.db;
  const collectionName = Constructor.collection;
  const collectionRef = collection(db, collectionName);

  const docRef = doc(collectionRef, this.__id);
  await setDoc(docRef, this.toObject());
  return this.__id;
};




export default save;