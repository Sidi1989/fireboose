import { 
  collection, doc,
  getDoc, updateDoc
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified by its Id) 
 * by sorting one of its {Array} properties.
 * @param {String} docId E.g: 'country01'
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
 * await Country.sortOneById('country01', 'coasts', 'asc');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   coasts: [910, 1090, 1200]
 * // };
 */
const sortOneById = async function (docId, arrayProp, order) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp || !order) {
    throw new Error('Not enough params for [sortOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

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
};




export default sortOneById;