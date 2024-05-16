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
  await setDoc(docRef, this.toObject());
  return this.__id;
};


/**
 * @description
 * Function to help logging information about the instance
 * 
 * It includes both inherited and owned properties
 * Its result will be coincident to the .toObject() instance method
 */
const inspect = function () {
  for (let prop of Object.getOwnPropertyNames(this)) {
    console.log(prop);
  }
};


/**
 * @description
 * Function to convert an instance into a plain object
 * 
 * It includes only ownPropertyNames (both enumerable and non-enumerable),
 * but not inherited properties, since we want to exclude methods like:
 * save(), inspect(),... which are inherited from its parent Class
 */
const toObject = function () {
  const pojo = {}
  for (let prop of Object.getOwnPropertyNames(this)) {
    pojo[prop] = this[prop];
  }

  return pojo;
}




export {
  save,
  inspect,
  toObject,
}