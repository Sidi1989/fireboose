import { 
  collection, doc,
  getDocs, query,
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a specific field from a document, 
 * identified as the result of a query
 * @param {Query} q
 * @param {String} field E.g: 'rivers'
 * @returns {String || Null} Id of the updated document || Null
 * @example
 * const newCountry = await Country.create(
 *     {name: 'Spain', capital: 'Madrid', rivers: ['Ebro', 'Tajo', 'Duero']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.unsetOne(
 *    query,
 *    'rivers'
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Spain', capital: 'Madrid'}
 */
const unsetOne = async function (q, field) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !field) {
    throw new Error('Not enough params for [unsetOne]')
  }

  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id)
  });

  // It only keeps the first coincidence:
  if (docsIds.length > 0) {
    const queriedDocumentId = docsIds[0];
    const docRef = doc(collectionRef, queriedDocumentId);
    const deletion = {[field]: deleteField()};

    await updateDoc(docRef, deletion);
    return docRef.id;
  } else {
    return null
  }
};




export default unsetOne;