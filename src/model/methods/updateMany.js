import { flatten } from 'flat';
import { 
  collection, getDocs, 
  query,
  updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Overwrite multiple documents of a collection
 * with the info passed as the argument,
 * according to a previously defined query
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
 * @param {Query} q
 * @returns Array (of Strings)
 * @example
 */
const updateMany = async function (info, q) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be passed into the query function as if each of
  // the elements of the array was an argument of the function:
  const queryDocs = query(collectionRef, ...q.queryOperations);

  const docsIds = [];
  const docsRefs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id);
    docsRefs.push(docSnap.ref);
  })

  for (let docRef of docsRefs) {
    await updateDoc(docRef, flatten(info));
  }

  return docsIds;
};




export default updateMany;