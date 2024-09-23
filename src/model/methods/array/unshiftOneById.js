import { 
  collection, doc,
  getDoc, updateDoc
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified by its Id) 
 * by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, 
 * appending it at the beginning of the array.
 * @param {String} docId E.g: 'country01'
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.unshiftOneById(country01, cities, 'Valencia');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Valencia', 'Madrid', 'Barcelona']
 * // };
 */
const unshiftOneById = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [unshiftOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();

    if (doc[arrayProp]) {
      doc[arrayProp].unshift(element)

      // After updating the array, it is passed again as the property
      // to be overwritten:
      let updatedArray = {
        [arrayProp]: doc[arrayProp]
      }
      await updateDoc(docRef, updatedArray);

      return docRef.id;
    } else {
      throw new Error('Cannot update inexistent arrayProp');
    }
  } else {
    return null;
  }
};




export default unshiftOneById;