import { 
  collection, doc,
  getDoc, updateDoc
} from 'firebase/firestore';




/**
 * @description
 * Update a document by removing, from one of its {Array} properties,
 * its first element.
 * @param {String} docId E.g: 'country01'
 * @param {String} arrayProp E.g: 'cities'
 * @returns {String || Null}  The ID of the document having been updated
 * @example
 * const country01 = {
 *   id: 'country01',
 *   cities: ['Madrid, 'Barcelona', 'Valencia']
 * };
 *  
 * await Country.shiftFrom(country01, cities);
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Barcelona', 'Valencia']
 * // };
 */
const shiftFrom = async function (docId, arrayProp) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp) {
    throw new Error('Not enough params for [shiftFrom]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();
    doc[arrayProp].shift()

    // After updating the array, it is passed again as the property
    // to be overwritten:
    let updatedArray = {
      [arrayProp]: doc[arrayProp]
    }

    await updateDoc(docRef, updatedArray);
    return docRef.id
  } else {
    return null;
  }
};




export default shiftFrom;