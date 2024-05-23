import { 
  collection, 
  getDocs,
  query, limit,
} from 'firebase/firestore';




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




export default findMany;