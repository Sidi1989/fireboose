import { flatten } from 'flat';
import { 
  collection, doc,
  setDoc, getDoc, getDocs, 
  updateDoc, deleteDoc,
  arrayUnion, arrayRemove,
  query, limit, orderBy,
} from 'firebase/firestore';




/**
 * @description
 * Función asíncrona para recuperar varios documents consignados 
 * en una collection (con un límite al número de ellos)
 * @param {String} collectionName E.g: members
 * @returns Array (of firestore docs)
 */
const findMany = async function (db, collectionName) {
  if (!collectionName) {
    console.warn('[WARNING] [utils/db/findMany] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName);
  const queryLimit = limit(10);
  const queryDocs = query(collectionRef, queryLimit);

  try {
    const docs = [];
    var querySnap = await getDocs(queryDocs);
    if (!querySnap) {
      console.warn(`[WARNING] [utils/db/findMany] Not found Docs in <${collectionName}>`);
      return [];
    }
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
const findOne = async function (docId, collectionName) {
  if (!docId || !collectionName) {
    console.warn('[WARNING] [utils/db/findOne] Not enough params');
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
      console.warn(`[WARNING] [utils/db/findOne] Document <${docId}> not found`);
      return null;
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
 * @param {Object} docInfo E.g: {name: Miguel, firstname: Díaz, lastname: Laclaustra}
 * @param {String} collectionName E.g: members
 * @returns String || null
 */
const insertOne = async function (docId, docInfo, collectionName) {
  if (!docId || !docInfo || !collectionName) {
    console.warn('[WARNING] [utils/db/insertOne] Not enough params');
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
 * @param {Object} docInfo E.g: {name: Fernando, firstname: Díaz, lastname: Laclaustra}
 * @param {String} collectionName E.g: members
 * @returns String || null
 */
const updateOne = async function (docId, docInfo, collectionName) {
  if (!docId || !docInfo || !collectionName) {
    console.warn('[WARNING] [utils/db/updateOne] Not enough params');
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
    console.warn('[WARNING] [utils/db/deleteOne] Not enough params');
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
 * Función asíncrona para eliminar un document consignado 
 * en una collection
 * @param {String} docId E.g: m1a
 * @param {String} collectionName E.g: members
 * @param {String} arrayToUpdate E.g: integrations
 * @param {String} operation 'add' || 'remove'
 * @param {Mixed} fieldInfo 46 || 'Miguel' || {name: Miguel, userRole: admin}
 * @returns String || null
 */
const updateArrayInOne = async function (docId, collectionName, arrayToUpdate, operation, fieldInfo) {
  if (!docId || !collectionName || !arrayToUpdate || !operation || !fieldInfo) {
    console.warn('[WARNING] [utils/db/updateArrayInOne] Not enough params');
    return [];
  }
  const collectionRef = collection(db, collectionName); 
  const docRef = doc(collectionRef, docId);

  try {
    if (operation == 'add') {
      let updateInfo = {
        [arrayToUpdate]: arrayUnion(fieldInfo)
      }
      await updateDoc(docRef, updateInfo);
    }
    if (operation == 'remove') {
      let updateInfo = {
        [arrayToUpdate]: arrayRemove(fieldInfo)
      }
      await updateDoc(docRef, updateInfo);
    }
    return docId;
  } catch (e) {
    console.error(e);
    return null;
  }
};




export { 
  findMany,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayInOne,
};