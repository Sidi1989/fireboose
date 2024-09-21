import { 
  collection,
  getDocs, query,
  arrayUnion, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update multiple documents of a collection, 
 * found according to a previously defined query,
 * by adding, to one of their {Array} properties
 * (that must be common to all of them), 
 * a new element that doesn’t exist there already, 
 * appending it at the end.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String[]>} Array of docIds
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   location: "Southwest",
 *   rivers: ['Ebro, 'Júcar', 'Tajo']
 * };
 * 
 * const country02 = {
 *   id: 'country02',
 *   name: 'Portugal',
 *   location: "Southwest",
 *   rivers: ['Mondego, 'Tajo']
 * };
 * 
 * await Country.pushMany(query, rivers, 'Duero');
 * 
 * console.log(country01, country02)
 * // {
 * //   id: 'country01',
 * //   name: 'Spain',
 * //   location: "Southwest",
 * //   rivers: ['Ebro', 'Júcar', 'Tajo', 'Duero']
 * // };
 * //
 * // {
 * //   id: 'country02',
 * //   name: 'Portugal',
 * //   location: "Southwest",
 * //   rivers: ['Mondego', 'Tajo', 'Duero']
 * // };
 */
const pushMany = async function (q, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [pushMany]')
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
  })

  for (let docRef of docsRefs) {
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
  }

  return docsIds;
};




export default pushMany;