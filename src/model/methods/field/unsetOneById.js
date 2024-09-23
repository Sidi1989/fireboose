import { 
  collection, doc,
  getDoc,
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a specific field from a document, 
 * identified by its Id
 * @param {String} docId E.g: 'country01'
 * @param {String} field E.g: 'rivers'
 * @returns {Promise<String|Null>} docId
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Spain', capital: 'Madrid', rivers: ['Ebro', 'Tajo', 'Duero']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.unsetOneById(
 *    'newCountryId',
 *    'rivers',
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Spain', capital: 'Madrid'}
 */
const unsetOneById = async function (docId, field) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !field) {
    throw new Error('Not enough params for [unsetOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();

    if (doc[field]) {
      const deletion = {[field]: deleteField()};
      await updateDoc(docRef, deletion);
      
      return docRef.id;
    } else {
      throw new Error('Cannot unset inexistent key');
    }
  } else {
    return null;
  }
};




export default unsetOneById;