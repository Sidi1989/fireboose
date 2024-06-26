import { 
  collection, getDocs, 
  query,
  deleteDoc
} from 'firebase/firestore';



/**
 * @description
 * Delete multiple documents from its collection, according to
 * a previously defined query
 * @param {Query} q
 * @returns Array (of Strings)
 * @example
 */
const deleteMany = async function (q) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 
  
  if (!q) {
    throw new Error('Not enough params for [deleteMany]')
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

  for (let docRef of docsRefs) {
    await deleteDoc(docRef);
  }

  return docsIds;
};




export default deleteMany;