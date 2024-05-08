import db from './index.js';
import { flatten } from 'flat';
import { 
  collection, doc,
  setDoc, getDoc, getDocs, 
  updateDoc, deleteDoc,
  arrayUnion, arrayRemove,
  query, where, limit,
} from 'firebase/firestore';




/**
 * @description
 * Función asíncrona para recuperar varios documents consignados 
 * en una collection (con un límite al número de ellos)
 * @param {String} collectionName E.g: members
 * @returns Array (of firestore docs)
 */
const findMany = async function (collectionName) {
  if (!collectionName) {
    console.warn('[WARNING] [methods/findMany] Not enough params');
    return [];
  }
  
  const collectionRef = collection(db, collectionName);
  const queryLimit = limit(10);
  const queryDocs = query(collectionRef, queryLimit);

  try {
    var querySnap = await getDocs(queryDocs);
    const docs = [];
    querySnap.forEach((doc) => docs.push(doc.data()));
    return docs;
  } catch (e) {
    console.error(e);
    return [];
  }
};


/**
 * @description
 * Función asíncrona para recuperar un document consignado 
 * en una collection
 * @param {String} docId E.g: m1a
 * @param {String} collectionName E.g: members
 * @returns Object (firestore doc) || null
 */
const findOneById = async function (docId, collectionName) {
  if (!docId || !collectionName) {
    console.warn('[WARNING] [methods/findOne] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    var docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const doc = docSnap.data();
      return doc;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para recuperar un document consignado 
 * en una collection, no sólo por su Id, sino por cualquier 
 * propiedad que contenga
 * @param {String} propertyName E.g: age
 * @param {} propertyValue E.g: 23
 * @param {String} collectionName E.g: members
 * @returns Object (firestore doc) || null
 */
const findOneByProperty = async function (collectionName, propertyName, propertyValue) {
  if (!collectionName || !propertyName || !propertyValue) {
    console.warn('[WARNING] [methods/findOneByProperty] Not enough params');
    return null;
  }
  
  const collectionRef = collection(db, collectionName);
  const queryConditions = where(propertyName, '==', propertyValue);
  const queryDocs = query(collectionRef, queryConditions);

  try {
    const docs = [];
    var querySnap = await getDocs(queryDocs);
    querySnap.forEach((doc) => docs.push(doc.data()));
    
    if (docs.length > 0) {
      return docs[0];
    } else {
      return null
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para añadir un document a una collection
 * @param {String} docId E.g: m1a
 * @param {Object} docInfo E.g: {name: Miguel, username: Gobo}
 * @param {String} collectionName E.g: members
 * @returns String || null
 */
const insertOne = async function (docId, docInfo, collectionName) {
  if (!docId || !docInfo || !collectionName) {
    console.warn('[WARNING] [methods/insertOne] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    await setDoc(docRef, docInfo);
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para sobreescribir un document de una collection
 * @param {String} docId E.g: m1a
 * @param {Object} docInfo E.g: {name: Fernando, username: Fer}
 * @param {String} collectionName E.g: members
 * @returns String || null
 */
const updateOne = async function (docId, docInfo, collectionName) {
  if (!docId || !docInfo || !collectionName) {
    console.warn('[WARNING] [methods/updateOne] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName);  
  const docRef = doc(collectionRef, docId);

  try {
    // If the info to update is contained in a nested object like this:
    // {
    //   name: "Miguel", 
    //   surnames: {
    //     first: "Díaz", 
    //     last: "Laclaustra"
    //   }
    // }
    // And the update (docInfo) is represented like this:
    // {
    //   surnames: {
    //     first: Janssen
    //   }
    // }
    // 'flatten' will transform the object in a 'firebase dot notation' like this:
    //   {"surnames.first": "Janssen"} 
    await updateDoc(docRef, flatten(docInfo));
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para eliminar un document consignado 
 * en una collection
 * @param {String} docId E.g: m1a
 * @param {String} collectionName E.g: members
 * @returns String || null
 */
const deleteOne = async function (docId, collectionName) {
  if (!docId || !collectionName) {
    console.warn('[WARNING] [methods/deleteOne] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    await deleteDoc(docRef);
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para actualizar un document consignado 
 * en una collection respecto de una de sus propiedades tipo array,
 * añadiéndola un elemento
 * @param {String} docId E.g: m1a
 * @param {String} collectionName E.g: members
 * @param {String} arrayToUpdate E.g: shkleps
 * @param {Mixed} fieldInfo 46 || 'Miguel' || {name: Miguel, userRole: admin}
 * @returns String || null
 */
const updateArrayByAddingOne = async function (docId, collectionName, arrayToUpdate, fieldInfo) {
  if (!docId || !collectionName || !arrayToUpdate || !fieldInfo) {
    console.warn('[WARNING] [methods/updateArrayByAddingOne] Not enough params');
    return null;
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    let updateInfo = {
      [arrayToUpdate]: arrayUnion(fieldInfo)
    }
    await updateDoc(docRef, updateInfo);
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};


/**
 * @description
 * Función asíncrona para actualizar un document consignado 
 * en una collection respecto de una de sus propiedades tipo array,
 * quitándola uno de sus elementos
 * @param {String} docId E.g: m1a
 * @param {String} collectionName E.g: members
 * @param {String} arrayToUpdate E.g: shkleps
 * @param {Mixed} fieldInfo 46 || 'Miguel' || {name: Miguel, userRole: admin}
 * @returns String || null
 */
const updateArrayByRemovingOne = async function (docId, collectionName, arrayToUpdate, fieldInfo) {
  if (!docId || !collectionName || !arrayToUpdate || !fieldInfo) {
    console.warn('[WARNING] [methods/updateArrayByRemovingOne] Not enough params');
    return null;
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    let updateInfo = {
      [arrayToUpdate]: arrayRemove(fieldInfo)
    }
    await updateDoc(docRef, updateInfo);
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};




export { 
  findMany,
  findOneById,
  findOneByProperty,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayByAddingOne,
  updateArrayByRemovingOne,
};