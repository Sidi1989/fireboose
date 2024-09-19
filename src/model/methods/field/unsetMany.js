import { 
  collection, 
  getDocs, query,
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a specific field 
 * from multiple documents of a collection.
 * @param {Query} q
 * @param {String} field E.g: 'rivers'
 * @returns {Promise<String[]>} Array of docIds
 */
const unsetMany = async function (q, field) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !field) {
    throw new Error('Not enough params for [unsetMany]')
  }

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  const docsRefs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id);
    docsRefs.push(docSnap.ref);
  })

  const deletion = {[field]: deleteField()};
  for (let docRef of docsRefs) {
    await updateDoc(docRef, deletion);
  }

  return docsIds;
};




export default unsetMany;