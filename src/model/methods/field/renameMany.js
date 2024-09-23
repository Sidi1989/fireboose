import { 
  collection,
  getDocs, query,
  getDoc, 
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Rename a specific field 
 * from multiple documents of a collection.
 * @param {Query} q
 * @param {String} oldKey E.g: 'countries'
 * @param {String} newKey E.g: 'nations'
 * @returns {Promise<String[]>} Array of modified docIds
 */
const renameMany = async function (q, oldKey, newKey) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !oldKey || !newKey) {
    throw new Error('Not enough params for [renameMany]')
  }
  
  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsRefs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach(function(queryDocSnap) {
    docsRefs.push(queryDocSnap.ref);
  })

  const modifiedDocsIds = [];
  for (let docRef of docsRefs) { 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const doc = docSnap.data();

      // When both 'Old key' and 'New key' exist:
      //   -the 'Old key' field is deleted
      if (doc[oldKey] && doc[newKey]) {
        const deletion = {[oldKey]: deleteField()};
        await updateDoc(docRef, deletion);
        
        modifiedDocsIds.push(docRef.id)
      }

      // When 'Old key' exists and 'New key' does not, the Doc is updated:
      //   -the 'New key' preserves the 'Old key' field value 
      //   -the 'Old key' field is deleted
      if (doc[oldKey] && !doc[newKey]) {
        const preservation = {[newKey]: doc[oldKey]};
        await updateDoc(docRef, preservation);
        const deletion = {[oldKey]: deleteField()};
        await updateDoc(docRef, deletion);

        modifiedDocsIds.push(docRef.id)
      }

      // When 'Old key' does not exist in the Doc:
      // the modifications cannot take place, 
      // so no Id will be passed to the returning Array
    }
  };
  
  return modifiedDocsIds;
};




export default renameMany;