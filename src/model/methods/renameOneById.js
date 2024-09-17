import { 
  collection, doc,
  getDoc,
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Rename a specific field from a document, 
 * identified by its Id
 * @param {String} docId E.g: 'continent01'
 * @param {String} oldKey E.g: 'countries'
 * @param {String} newKey E.g: 'nations'
 * @returns {String || Null} Id of the updated document || Null
 * @example
 * const newCountry = await Country.create(
 *    {name: 'USA', colonies: ['Virginia', 'Maryland', 'Delaware']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.renameOneById(
 *    'newCountryId',
 *    'colonies',
 *    'states'
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'USA', states: ['Virginia', 'Maryland', 'Delaware']}
 */
const renameOneById = async function (docId, oldKey, newKey) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !oldKey || !newKey) {
    throw new Error('Not enough params for [renameOneById]')
  }
  
  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();
    
    // When 'New key' already exist, but 'Old key' does not:
    if (doc[newKey] && !doc[oldKey]) {
      return null;
    }

    // When neither 'Old key' nor 'New key' exist:
    if (!doc[newKey] && !doc[oldKey]) {
      return null;
    }

    // When both 'Old key' and 'New key' exist:
    //   -the 'Old key' field is deleted
    if (doc[oldKey] && doc[newKey]) {
      const deletion = {[oldKey]: deleteField()};
      await updateDoc(docRef, deletion);

      return docId;
    }

    // When 'Old key' exists and 'New key' does not, the Doc is updated:
    //   -the 'New key' preserves the 'Old key' field value 
    //   -the 'Old key' field is deleted
    if (doc[oldKey] && !doc[newKey]) {
      const preservation = {[newKey]: doc[oldKey]};
      await updateDoc(docRef, preservation);
      const deletion = {[oldKey]: deleteField()};
      await updateDoc(docRef, deletion);

      return docId
    }
  } else {
    return null;
  }
};




export default renameOneById;