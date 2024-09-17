import { 
  collection,
  getDocs, query,
  getDoc, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update multiple documents of a collection, 
 * found according to a previously defined query,
 * by adding, to one of their {Array} properties
 * (that must be common to all of them), 
 * a new element that doesn’t exist there already, 
 * appending it at the beginning.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Array (of Strings)} Ids of the updated documents
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
 * await Country.unshiftMany(query, rivers, 'Duero');
 * 
 * console.log(country01, country02)
 * // {
 * //   id: 'country01',
 * //   name: 'Spain',
 * //   location: "Southwest",
 * //   rivers: ['Duero', 'Ebro', 'Júcar', 'Tajo',]
 * // };
 * //
 * // {
 * //   id: 'country02',
 * //   name: 'Portugal',
 * //   location: "Southwest",
 * //   rivers: ['Duero', 'Mondego', 'Tajo', 'Duero']
 * // };
 */
const unshiftMany = async function (q, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [unshiftMany]')
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
    const docSnap = await getDoc(docRef);
    const doc = docSnap.data();
    doc[arrayProp].unshift(element);

    // After changing the array, this is passed again 
    // as the property to be overwritten in the Doc:
    let updatedArray = {
      [arrayProp]: doc[arrayProp]
    }

    await updateDoc(docRef, updatedArray);
  }

  return docsIds;
};




export default unshiftMany;