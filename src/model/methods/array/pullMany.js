import { 
  collection,
  getDocs, query,
  arrayRemove, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update multiple documents of a collection, 
 * found according to a previously defined query,
 * by removing, from one of their {Array} properties
 * (that must be common to all of them), 
 * those elements whose value is coincident with the one 
 * passed as the argument.
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
 * await Country.pullMany(query, rivers, 'Ebro');
 * 
 * console.log(country01, country02)
 * // {
 * //   id: 'country01',
 * //   name: 'Spain',
 * //   location: "Southwest",
 * //   rivers: ['Júcar', 'Tajo']
 * // };
 * //
 * // {
 * //   id: 'country02',
 * //   name: 'Portugal',
 * //   location: "Southwest",
 * //   rivers: ['Mondego', 'Tajo']
 * // };
 */
const pullMany = async function (q, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [pullMany]')
  }

  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
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
  }

  return docsIds;
};




export default pullMany;