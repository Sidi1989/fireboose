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
 * Retrieve multiple Firestore documents from a collection
 * (with an optional limit in their retrieval; so if it's not
 * set, it will be 10 documents).
 * @param {Number} documentsLimit Optional
 * @returns Array (of Firestore docs)
 * @example
 * const countriesRetrieved = await Country.findMany(3);
 * 
 * console.log(countriesRetrieved)
 * // [
 * //   {name: 'Spain' capital: 'Madrid'},
 * //   {name: 'France' capital: 'Paris'},
 * //   {name: 'Germany' capital: 'Berlin'}
 * // ]
 */
const findMany = async function (documentsLimit = 10) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);
  
  // Set the number of documents to be retrieved
  const queryLimit = limit(documentsLimit);
  const queryDocs = query(collectionRef, queryLimit);

  var querySnap = await getDocs(queryDocs);
  const docs = [];
  querySnap.forEach((doc) => docs.push(doc.data()));
  return docs;
};


/**
 * @description
 * Retrieve a Firestore document from a collection, found by any of
 * its properties.
 * @param {String} propertyName E.g: age
 * @param {Mixed} propertyValue E.g: 23 (Coincident with typeof(propertyName))
 * @returns Firestore doc || null
 */
const findOneByProperty = async function (propertyName, propertyValue) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!propertyName || !propertyValue) {
    throw new Error('Not enough params for [findOneByProperty]')
  }
  
  // Here is set the property to be searched for:
  const queryConditions = where(propertyName, '==', propertyValue);
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It only returns the first coincidence:
  if (docs.length > 0) {
    return docs[0];
  } else {
    return null
  }
};


/**
 * @description
 * Retrieve a Firestore document from a collection, found by its ID.
 * @param {String} docId E.g: m1a
 * @returns Firestore doc || null
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
 * Updates a document, by adding a new element in one of its array properties,
 * appending it at the end
 * @param {String} docId E.g: 'm1a'
 * @param {String} fieldName E.g: 'countries'
 * @param {Mixed} fieldValue 46 || 'Spain' || {name: 'Spain', city: 'Madrid'}
 * @returns String
 * @example
 * const country1a = {
 *   id: 'country1a',
 *   cities: ['Barcelona', 'Valencia']
 * };
 *  
 * await Country.updateArrayByAddingOne(country1a, cities, 'Madrid');
 * 
 * console.log(country1a)
 * // {
 * //   id: 'country1a',
 * //   cities: ['Barcelona', 'Valencia', 'Madrid']
 * // };
 */
const updateArrayByAddingOne = async function (docId, fieldName, fieldValue) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !fieldName || !fieldValue) {
    throw new Error('Not enough params for [updateArrayByAddingOne]')
  }

  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [fieldName]: arrayUnion(fieldValue)
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