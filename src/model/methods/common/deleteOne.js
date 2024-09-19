import { 
  collection, doc,
  getDocs, query,
  deleteDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a document from its collection, 
 * identified as the result of a query
 * @param {Query} q
 * @returns {Promise<String|Null>} docId
 */
const deleteOne = async function (q) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q) {
    throw new Error('Not enough params for [deleteOne]')
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
    await deleteDoc(docRef);

    return queriedDocumentId;
  } else {
    return null
  }
};




export default deleteOne;