import { 
  collection, doc,
  getDocs, query,
  arrayUnion, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified as the result of a query) 
 * by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, 
 * appending it at the end of the array.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.pushOne(query, cities, 'Valencia');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona', 'Valencia']
 * // };
 */
const pushOne = async function (q, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [pushOne]')
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

    // According to Firebase Blog: 
    // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
    // In order to avoid some of the issues that can arise in a multi-user environment,
    // you’ll be adding elements with more of a set-like functionality.
    // So the arrayUnion operator will append an element to an array at the end of it,
    // and only if it doesn’t exist in the array already.
    let updateInfo = {
      [arrayProp]: arrayUnion(element)
    }

    await updateDoc(docRef, updateInfo);
    return docRef.id
  } else {
    return null
  }
};




export default pushOne;