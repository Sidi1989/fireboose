import { 
  collection, doc,
  arrayUnion, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified by its Id) 
 * by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, 
 * appending it at the end of the array.
 * @param {String} docId E.g: 'country01'
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.pushOneById(country01, cities, 'Valencia');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona', 'Valencia']
 * // };
 */
const pushOneById = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pushOneById]')
  }

  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be adding elements with more of a set-like functionality.
  // So the arrayUnion operator will append an element to an array at the end of it,
  // and only if it doesn’t exist in the array already.

  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayUnion(element)
  }
  await updateDoc(docRef, updateInfo);
  return docRef.id;
};




export default pushOneById;