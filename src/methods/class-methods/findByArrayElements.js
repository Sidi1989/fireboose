import { 
  collection,
  getDocs,
  query, where,
} from 'firebase/firestore';




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




export default findByArrayElements;