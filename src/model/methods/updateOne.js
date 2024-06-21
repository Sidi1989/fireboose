import { flatten } from 'flat';
import { 
  collection, doc,
  updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Overwrite a document with the info passed as the argument.
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * * About 'nested objects':
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
 * @param {String} docId E.g: 'country01'
 * @returns String
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    newCountryId
 * );
 * 
 * const updatedCountry = await Country.updateOne(
 *    {name: 'Roman Empire', capital: 'Rome'}
 * );
 * 
 * console.log(await Country.findOneById(newCountryId))
 * // {name: 'Roman Empire', capital: 'Rome'}
 */
const updateOne = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docInfo || !docId) {
    throw new Error('Not enough params for [updateOne]')
  }

  const docRef = doc(collectionRef, docId);
  await updateDoc(docRef, flatten(docInfo));
  
  return docId;
};




export default updateOne;