import { 
  collection, doc,
  deleteDoc,
} from 'firebase/firestore';




/**
 * @description
 * Delete a document from its collection, 
 * identified by its Id.
 * @param {String} docId E.g: 'country01'
 * @returns {Promise<String|Null>} docId
 */
const deleteOneById = async function (docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId) {
    throw new Error('Not enough params for [deleteOneById]')
  }

  const docRef = doc(collectionRef, docId);
  if (docRef) {
    await deleteDoc(docRef);
    return docRef.id;
  } else {
    return null;
  }
};




export default deleteOneById;