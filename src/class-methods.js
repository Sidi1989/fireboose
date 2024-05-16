import { flatten } from 'flat';
import { 
  collection, doc,
  addDoc, setDoc, 
  getDoc, getDocs, 
  updateDoc, deleteDoc,
  arrayUnion, arrayRemove,
  query, where, limit,
} from 'firebase/firestore';




/**
 * @description
 * Async function to retrieve multiple documents from a colelction
 * (with an optional limit in their retrieval)
 * @returns Array (of firestore docs)
 */
const findMany = async function () {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);
  
  // Set the number of documents to be retrieved
  const queryLimit = limit(10);
  const queryDocs = query(collectionRef, queryLimit);

  var querySnap = await getDocs(queryDocs);
  const docs = [];
  querySnap.forEach((doc) => docs.push(doc.data()));
  return docs;
};


/**
 * @description
 * Async function to retrieve a document from a collection, known by any of
 * its attributes
 * @param {String} propertyName E.g: age
 * @param {} propertyValue E.g: 23
 * @returns Object (firestore doc) || null
 */
const findOneByProperty = async function (propertyName, propertyValue) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!propertyName || !propertyValue) {
    throw new Error('Not enough params for [findOneByProperty]')
  }
  
  // Here is set the attribute to be searched for
  const queryConditions = where(propertyName, '==', propertyValue);
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  if (docs.length > 0) {
    return docs[0];
  } else {
    return null
  }
};


/**
 * @description
 * Async function to retrieve a document from a collection, known by
 * its ID
 * @param {String} docId E.g: m1a
 * @returns Object (firestore doc) || null
 */
const findOneById = async function (docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId) {
    throw new Error('Not enough params for [findOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();
    return doc;
  } else {
    return null;
  }
};


/**
 * @description
 * Async function to create / add a document to a collection
 * @param {Object} docInfo E.g: {name: Miguel, username: Gobo}
 * @param {String} docId (Optional) E.g: m1a
 * @return String
 */
const create = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docInfo) { 
    throw new Error('Not enough params for [create]') 
  }

  if (docId) {
    const docRef = doc(collectionRef, docId);
    await setDoc(docRef, docInfo);
    return docRef.id;
  // If there isn't a meaningful ID for the document, let Cloud Firestore 
  // auto-generate an ID
  } else {
    const docRef = await addDoc(collectionRef, docInfo);
    return docRef.id;
  }
}


/**
 * @description
 * Async function to create a document in a collection
 * @param {Object} docInfo E.g: {name: Miguel, username: Gobo}
 * @param {String} docId E.g: m1a
 * @returns String
 */
const insertOne = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docInfo || !docId) {
    throw new Error('Not enough params for [insertOne]')
  }

  const docRef = doc(collectionRef, docId);
  await setDoc(docRef, docInfo);
  return docId;
};


/**
 * @description
 * Async function to overwrite a document in a collection
 * @param {Object} docInfo E.g: {name: Fernando, username: Fer}
 * @param {String} docId E.g: m1a
 * @returns String
 */
const updateOne = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docInfo || !docId) {
    throw new Error('Not enough params for [updateOne]')
  }

  const docRef = doc(collectionRef, docId);
  await updateDoc(docRef, flatten(docInfo));

  // About 'nested objects':

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

  return docId;
};


/**
 * @description
 * Async function to delete a document from its collection
 * @param {String} docId E.g: m1a
 * @returns String
 */
const deleteOne = async function (docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId) {
    throw new Error('Not enough params for [deleteOne]')
  }

  const docRef = doc(collectionRef, docId);
  await deleteDoc(docRef);
  return docId;
};


/**
 * @description
 * Async function to update a document in a collection, concerning one of 
 * its array attributes, in which new elements are included
 * @param {String} docId E.g: m1a
 * @param {String} arrayToUpdate E.g: countries
 * @param {Mixed} fieldInfo 46 || 'Spain' || {name: Spain, city: Madrid}
 * @returns String
 */
const updateArrayByAddingOne = async function (docId, arrayToUpdate, fieldInfo) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayToUpdate || !fieldInfo) {
    throw new Error('Not enough params for [updateArrayByAddingOne]')
  }

  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayToUpdate]: arrayUnion(fieldInfo)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};


/**
 * @description
 * Async function to update a document in a collection, concerning one of 
 * its array attributes, in which new elements are excluded
 * @param {String} docId E.g: m1a
 * @param {String} arrayToUpdate E.g: countries
 * @param {Mixed} fieldInfo 46 || 'Spain' || {name: Spain, city: Madrid}
 * @returns String || null
 */
const updateArrayByRemovingOne = async function (docId, arrayToUpdate, fieldInfo) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !arrayToUpdate || !fieldInfo) {
    throw new Error('Not enough params for [updateArrayByRemovingOne]')
  }
  
  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayToUpdate]: arrayRemove(fieldInfo)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};




export { 
  findMany,
  findOneById,
  findOneByProperty,
  create,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayByAddingOne,
  updateArrayByRemovingOne,
};