import { 
  collection, doc,
  getDocs, query,
  arrayRemove, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified as the result of a query) by removing, 
 * from one of its {Array} properties,
 * those elements whose value is coincident with the one 
 * passed as the argument.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {String || Null} Id of the updated document || Null
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona', 'Bilbao']
 * };
 *  
 * await Country.pullOne(query, cities, 'Bilbao');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona']
 * // };
 */
const pullOne = async function (q, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [pullOne]')
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
    // you’ll be removing elements with more of a set-like functionality.
    // So rather than asking to delete an item at index [i], you would ask to remove, 
    // for example, all elements whose value is the string "Spain".
    let updateInfo = {
      [arrayProp]: arrayRemove(element)
    }

    await updateDoc(docRef, updateInfo);
    return docRef.id
  } else {
    return null
  }
};




export default pullOne;