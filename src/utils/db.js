import fireboose from '../index.js';
import { 
  collection, doc,
  getDocs, deleteDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete all the Documents from a Collection.
 * @param {String} collectionName E.g: members 
 * @return {Void}
 */
const deleteCollectionDocs = async function (collectionName) {
  // Firstly, it retrieves all the IDs from the Documents in the Collection
  const collectionRef = collection(fireboose.db, collectionName); 
  var collectionData = await getDocs(collectionRef);
  const collectionDocsIds = collectionData.docs.map((doc) => doc.id);

  // And then, it removes each Document through their IDs
  for (let id of collectionDocsIds) {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
  }
};




export {
  deleteCollectionDocs,
};