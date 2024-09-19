import { 
  collection, doc,
  getDocs, query,
  getDoc, updateDoc
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
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   coasts: [1090, 1200, 910]
 * };
 *  
 * await Country.sortOne(query, 'coasts', 'asc');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   coasts: [910, 1090, 1200]
 * // };
 */
const sortOne = async function (q, arrayProp, order) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !order) {
    throw new Error('Not enough params for [sortOne]')
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

      let sortedArray = [];
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

      return docRef.id;
    } else {
      return null;
    }
  }
};




export default sortOne;