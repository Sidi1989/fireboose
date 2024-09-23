import { 
  collection, doc,
  getDoc, updateDoc
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified by its Id) 
 * by removing, from one of its {Array} properties,
 * its last element.
 * @param {String} docId E.g: 'country01'
 * @param {String} arrayProp E.g: 'cities'
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   cities: ['Madrid, 'Barcelona', 'Valencia']
 * };
 *  
 * await Country.popOneById(country01, cities);
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona']
 * // };
 */
const popOneById = async function (docId, arrayProp) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp) {
    throw new Error('Not enough params for [popOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();

    if (doc[arrayProp]) {
      doc[arrayProp].pop()

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




export default popOneById;