import { 
  collection, 
  getDocs, query,
  getDoc,
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

  querySnap.forEach(function(queryDocSnap) {
    docsIds.push(queryDocSnap.id);
    docsRefs.push(queryDocSnap.ref);
  })

  const modifiedDocsIds = [];
  for (let docRef of docsRefs) {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const doc = docSnap.data();

      if (doc[field]) {
        const deletion = {[field]: deleteField()};
        await updateDoc(docRef, deletion);
        modifiedDocsIds.push(docRef.id)
      }
    }
  }

  return modifiedDocsIds;
};




export default unsetMany;