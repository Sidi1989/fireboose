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
 * Retrieve a Firestore document from a collection, found by its ID.
 * @param {String} docId E.g: 'country1a'
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
 * Retrieve multiple Firestore documents from a collection
 * (with an optional limit in their retrieval; so if it's not
 * set, it will be 10 documents).
 * @param {Number} documentsLimit Optional (25 documents by default)
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
const findMany = async function (documentsLimit = 25) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);
  
  // Set the number of documents to be retrieved:
  const queryLimit = limit(documentsLimit);
  const queryDocs = query(collectionRef, queryLimit);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  return docs;
};


/**
 * @description
 * Retrieve a Firestore document from a collection, found by any of
 * its properties.
 * @param {String} property E.g: 'age'
 * @param {Mixed} value E.g: 753 (Coincident with typeof(property))
 * @returns Firestore doc || null
 */
const findOneByProperty = async function (property, value) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  // About 'nested objects':

  // If the value is that of a property in a nested object, it should be passed
  // as a flatten string. E.g.:
  // Country.create(
  //    {
  //      name: 'Spain', 
  //      capital: {
  //        river: 'Manzanares',
  //        coasted: false,
  //      }, 
  //    },
  //    'newCountryId'
  // );
  // const foundCountry = await Country.findOneByProperty('capital.river', 'Manzanares');

  if (!property || !value) {
    throw new Error('Not enough params for [findOneByProperty]')
  }
  
  // Here is set the property to be searched for:
  const queryConditions = where(property, '==', value);
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
 * Retrieve Firestore documents from a collection, found by the presence of
 * some values for one of their properties.
 * @param {String} property E.g: 'seas'
 * @param {Array} elements E.g.: ['Atlantic', 'Mediterranean']
 * Although the values could be of different types (according to the property 
 * queried), all of the possible matches must be passed inside an array
 * @param {Object} matchProps Always includes two properties:
 *  -documentsLimit ({Number}): how many docs it will return; 
 *      1 by default
 *  -equality ({Boolean}): whether it will search for the equality or
 *   non-equality of the elements to the values of the property; 
 *      true by default
 * E.g.: {documentsLimit: 10, equality: true}
 * @returns Array (of Firestore docs)
 * @example 
 * When looking for the existence, it operates as the combination of
 * up to 30 equality (==) clauses on the same property with a logical OR;
 * so the query will return documents where the given property matches 
 * any of the comparison values.
 * 
 * When looking for the inexistence, it operates as the combination of
 * up to 10 non-equality (!=) clauses on the same property with a logical AND;
 * so the query will return documents where the given property exists, it is 
 * not null, and does not match any of the comparison values.
 */
const findManyByProperty = async function (property, elements, matchProps={documentsLimit: 1, equality: true}) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!property || !elements) {
    throw new Error('Not enough params for [findManyByProperty]')
  }
  
  // Here are set the values to be searched for (with their respective limits of
  // up to 30 or up to 10 clauses), as well as the decision of searching for their
  // equality or non-equality to values of the property:
  var queryConditions;
  if (matchProps && matchProps.equality == false) {
    queryConditions = where(property, 'not-in', elements);
  } else if (!matchProps || matchProps && matchProps.equality == true) {
    queryConditions = where(property, 'in', elements);
  }
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It will return all the documents where the elements are or not matched,
  // according to the equality option, up to the optional limit:
  var sliceLimit;
  if (matchProps && matchProps.documentsLimit != 1) {
    sliceLimit = matchProps.documentsLimit;
  } else if (!matchProps || matchProps && matchProps.documentsLimit == 1) {
    sliceLimit = 1;
  }

  if (docs.length > 0) {
    const slice = docs.slice(0, sliceLimit)
    return slice;
  } else {
    return docs;
  }
};


/**
 * @description
 * Retrieve Firestore documents from a collection, found by the presence
 * of a certain element in one of its {Array} properties.
 * @param {String} arrayProp E.g: 'countries'
 * @param {Mixed} element 27 || 'Spain' || true
 * However, about arrays of objects:
 *  -In order to return documents that contain a particular object in the array, 
 *   you need to pass the entire object as an argument, not only a single field.
 *  -So if you need to filter based on one of the object properties, then you could: 
 *      create an additional array that only contains that one; or
 *      store the objects as a sub-collection instead of as an array.
 * @param {Number} documentsLimit Optional (Just 1 document by default)
 * @returns Array (of Firestore docs)
 */
const findByArrayElement = async function (arrayProp, element, documentsLimit = 1) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!arrayProp || !element) {
    throw new Error('Not enough params for [findByArrayElement]')
  }
  
  // Here is set the element of the arrayProp to be searched for:
  const queryConditions = where(arrayProp, 'array-contains', element);
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It will returns all the documents where the array contains
  // the searched element, up to the optional limit:
  if (docs.length > 0) {
    const slice = docs.slice(0, documentsLimit)
    return slice;
  } else {
    return docs;
  }
};


/**
 * @description
 * Retrieve Firestore documents from a collection, found by the existence
 * of certain elements in one of its {Array} properties.
 * @param {String} arrayProp E.g: 'seas'
 * @param {Array} elements E.g.: ['Atlantic', 'Mediterranean']
 * @param {Number} documentsLimit Optional (Just 1 document by default)
 * @returns Array (of Firestore docs)
 * @example 
 * It operates as the combination of up to 30 'array-contains' clauses on the same 
 * array property, with a logical OR; so the query will return documents where that
 * given array contains one or more of the comparison elements.
 */
const findByArrayElements = async function (arrayProp, elements, documentsLimit = 1) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!arrayProp || !elements) {
    throw new Error('Not enough params for [findByArrayElements]')
  }
  
  // Here are set the elements of the arrayProp to be searched for:
  const queryConditions = where(arrayProp, 'array-contains-any', elements);
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It will returns all the documents where the array contains one or more 
  // of the searched elements, up to the optional limit:
  if (docs.length > 0) {
    const slice = docs.slice(0, documentsLimit)
    return slice;
  } else {
    return docs;
  }
};


/**
 * @description
 * Create or Add a document to a collection, depending on an optional
 * 'id' argument.
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * @param {String} docId (Optional) E.g: 'country1a'
 * @return String
 * @example
 * const newCountryWithChosenId = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    newCountryId
 * );
 * // After saving it to Firestore, it returns the id: 'newCountryId'
 * 
 * const newCountryWithoutChosenId = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}
 * );
 * // After saving it to Firestore, it returns the id: 'autoGeneratedId'
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
  // If there isn't a meaningful ID for the document, Cloud Firestore 
  // will auto-generate one for the document:
  } else {
    const docRef = await addDoc(collectionRef, docInfo);
    return docRef.id;
  }
}


/**
 * @description
 * Overwrite a document, according to the new info passed as the argument.
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * @param {String} docId E.g: 'country1a'
 * @returns String
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    newCountryId
 * );
 * 
 * const updatedCountry = await Country.updateOne(
 *    {name: 'Roman Empire', capital: 'Rome'}
 * );
 * 
 * console.log(await Country.findOneById(newCountryId))
 * // {name: 'Roman Empire', capital: 'Rome'}
 */
const updateOne = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docInfo || !docId) {
    throw new Error('Not enough params for [updateOne]')
  }

  // About 'nested objects':

  // If the info to update is contained in a nested object like this:
  // {
  //   name: 'Spain', 
  //   capital: {
  //     city: 'Madrid', 
  //     river: 'Jarama'
  //   }
  // }

  // And the update (docInfo) is represented like this:
  // {
  //   capital: {
  //     river: 'Manzanares'
  //   }
  // }

  // "flatten" will transform the object in a 'firebase dot notation' like this:
  // {'capital.river': 'Manzanares'}

  const docRef = doc(collectionRef, docId);
  await updateDoc(docRef, flatten(docInfo));
  return docId;
};


/**
 * @description
 * Update a document by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, appending it 
 * at the end of the array.
 * @param {String} docId E.g: 'country1a'
 * @param {String} arrayProp E.g: 'countries'
 * @param {Mixed} element 27 || 'Spain' || {name: 'Spain', city: 'Madrid'}
 * @returns String
 * @example
 * const country1a = {
 *   id: 'country1a',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.pushInto(country1a, cities, 'Valencia');
 * 
 * console.log(country1a)
 * // {
 * //   id: 'country1a',
 * //   cities: ['Madrid', 'Barcelona', 'Valencia']
 * // };
 */
const pushInto = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pushInto]')
  }

  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be adding elements with more of a set-like functionality.
  // So the arrayUnion operator will append an element to an array at the end of it,
  // and only if it doesn’t exist in the array already.

  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayUnion(element)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};


/**
 * @description
 * Update a document by removing, from one of its {Array} properties,
 * those elements whose value is coincident with the element passed
 * as the argument.
 * @param {String} docId E.g: 'country1a'
 * @param {String} arrayProp E.g: 'countries'
 * @param {Mixed} element 27 || 'Spain' || {name: 'Spain', city: 'Madrid'}
 * @returns String
 */
const pullFrom = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pullFrom]')
  }
  
  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be removing elements with more of a set-like functionality.
  // So rather than asking to delete an item at index [i], you would ask to remove, 
  // for example, all elements whose value is the string "Spain".
  
  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayRemove(element)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};


/**
 * @description
 * Delete a document from its collection.
 * @param {String} docId E.g: 'country1a'
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
  // After deleting it from Firestore, it returns the old Id
  // of the deleted document:
  return docRef.id;
};




export { 
  findOneById,
  findMany,
  findOneByProperty,
  findManyByProperty,
  findByArrayElement,
  findByArrayElements,
  create,
  updateOne,
  pushInto,
  pullFrom,
  deleteOne,
};