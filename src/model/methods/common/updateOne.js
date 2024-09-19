import { flatten } from 'flat';
import { 
  collection, doc,
  getDocs, query,
  updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Overwrite a document, identified as the result of a query,
 * with the info passed as the argument
 * @param {Query} q
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
 * @returns {Promise<String|Null>} docId
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.updateOne(
 *    query,
 *    {name: 'Roman Empire'}
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Roman Empire', capital: 'Rome'}
 */
const updateOne = async function (q, docInfo) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !docInfo) {
    throw new Error('Not enough params for [updateOne]')
  }

  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id)
  });

  // It only keeps the first coincidence:
  if (docsIds.length > 0) {
    const queriedDocumentId = docsIds[0];
    const docRef = doc(collectionRef, queriedDocumentId);
    await updateDoc(docRef, flatten(docInfo));

    return docRef.id;
  } else {
    return null
  }
};




export default updateOne;