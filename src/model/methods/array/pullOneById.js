import { 
  collection, doc,
  arrayRemove, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Update a document (identified by its Id) 
 * by removing, from one of its {Array} properties,
 * those elements whose value is coincident with the one 
 * passed as the argument.
 * @param {String} docId E.g: 'country01'
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   cities: ['Madrid, 'Barcelona', 'Bilbao']
 * };
 *  
 * await Country.pullOneById(country01, cities, 'Bilbao');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona']
 * // };
 */
const pullOneById = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pullOneById]')
  }
  
  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be removing elements with more of a set-like functionality.
  // So rather than asking to delete an item at index [i], you would ask to remove, 
  // for example, all elements whose value is the string "Spain".
  
  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayRemove(element)
  }
  await updateDoc(docRef, updateInfo);
  return docRef.id;
};




export default pullOneById;