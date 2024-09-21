import { flatten } from 'flat';
import { 
  collection, doc,
  updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Overwrite a document, identified by its Id,
 * with the info passed as the argument
 * @param {String} docId E.g: 'country01'
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * About 'nested objects':
 * 
 * If the info to update is contained in a nested object like this:
 *  {
 *    name: 'Spain', 
 *    capital: { 
 *      city: 'Madrid', 
 *      river: 'Jarama'
 *    }
 *  }
 * 
 * And the update (docInfo) is represented like this:
 *  {
 *    capital: {
 *      river: 'Manzanares'
 *    }
 *  }
 * 
 * "flatten" will transform the object in a 'firebase dot notation' like this:
 *  {'capital.river': 'Manzanares'}
 * 
 * @returns {Promise<String>} docId
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.updateOneById(
 *    'newCountryId',
 *    {name: 'Roman Empire'},
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Roman Empire', capital: 'Rome'}
 */
const updateOneById = async function (docId, docInfo) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !docInfo) {
    throw new Error('Not enough params for [updateOneById]')
  }

  const docRef = doc(collectionRef, docId);
  await updateDoc(docRef, flatten(docInfo));
  
  return docRef.id;
};




export default updateOneById;