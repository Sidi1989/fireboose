import { 
  collection,
  getDocs, query,
  getDoc, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified as the result of a query) 
 * by sorting one of its {Array} properties.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * About the elements in the array:
 *    there can only be {Number},
 *    but neither {String} nor {Object}
 * @param {String} order 'asc' | 'desc'
 * @returns {Promise<String[]>} Array of docIds
 */
const sortMany = async function (q, arrayProp, order) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !order) {
    throw new Error('Not enough params for [sortMany]')
  }

  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  const docsRefs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(queryDocSnap) {
    docsIds.push(queryDocSnap.id);
    docsRefs.push(queryDocSnap.ref);
  });

  for (let docRef of docsRefs) {
    const docSnap = await getDoc(docRef);
    const doc = docSnap.data();
    
    let sortedArray = [];
    if (doc[arrayProp]) {
      if (order == 'asc') {
        sortedArray = doc[arrayProp].sort((a, b) => a - b);
      } else if (order == 'desc') {
        sortedArray = doc[arrayProp].sort((a, b) => b - a);
      }
  
      // After updating the array, it is passed again as the property
      // to be overwritten:
      const updatedArray = {
        [arrayProp]: sortedArray
      }
      await updateDoc(docRef, updatedArray);
    }
  }
  
  return docsIds;
};




export default sortMany;