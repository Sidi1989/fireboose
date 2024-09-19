import { flatten } from 'flat';
import { 
  collection, 
  getDocs, query,
  updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Overwrite multiple documents of a collection, 
 * found according to a previously defined query,
 * with new info passed as the argument
 * @param {Query} q
 * @param {Object} info E.g: {name: 'Spain', capital: 'Madrid'}
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
 * @returns {Promise<String[]>} Array of docIds
 */
const updateMany = async function (q, info) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !info) {
    throw new Error('Not enough params for [updateMany]')
  }

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  const docsRefs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(queryDocSnap) {
    docsIds.push(queryDocSnap.id);
    docsRefs.push(queryDocSnap.ref);
  })

  for (let docRef of docsRefs) {
    await updateDoc(docRef, flatten(info));
  }

  return docsIds;
};




export default updateMany;