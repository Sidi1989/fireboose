import { 
  collection, doc,
  deleteDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a document from its collection.
 * @param {String} docId E.g: 'country01'
 * @returns String
 */
const deleteOne = async function (docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId) {
    throw new Error('Not enough params for [deleteOne]')
  }

  const docRef = doc(collectionRef, docId);
  await deleteDoc(docRef);
  // After deleting it from Firestore, it returns the old ID
  // of the deleted document:
  return docRef.id;
};




export default deleteOne;