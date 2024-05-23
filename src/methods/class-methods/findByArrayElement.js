import { 
  collection,
  getDocs,
  query, where,
} from 'firebase/firestore';




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




export default findByArrayElement;