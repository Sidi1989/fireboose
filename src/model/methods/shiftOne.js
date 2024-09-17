import { 
  collection, doc,
  getDocs, query,
  getDoc, updateDoc
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified as the result of a query) 
 * by removing, from one of its {Array} properties,
 * its first element.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @returns {String || Null} Id of the updated document || Null
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona', 'Valencia']
 * };
 *  
 * await Country.shiftOne(query, cities);
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Barcelona', 'Valencia']
 * // };
 */
const shiftOne = async function (q, arrayProp) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp) {
    throw new Error('Not enough params for [shiftOne]')
  }

  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id);
  });

  // It only keeps the first coincidence:
  if (docsIds.length > 0) {
    const queriedDocumentId = docsIds[0];
    const docRef = doc(collectionRef, queriedDocumentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const doc = docSnap.data();
      doc[arrayProp].shift();
  
      // After changing the array, this is passed again 
      // as the property to be overwritten in the Doc:
      let updatedArray = {
        [arrayProp]: doc[arrayProp]
      }
  
      await updateDoc(docRef, updatedArray);
      return docRef.id
    } else {
      return null;
    }
  } 
};




export default shiftOne;