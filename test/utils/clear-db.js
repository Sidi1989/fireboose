import fireboose from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };
import { 
  collection, doc,
  getDocs, deleteDoc,
} from 'firebase/firestore';




fireboose.connect(firebooseConnectionSettings);

/**
 * Función asíncrona para eliminar todos los documents consignados
 * en una collection
 * @param {String} collectionName E.g: members 
 */
const deleteCollectionDocs = async function (collectionName) {
  // Se recuperan los ids de todos los docs que componen la collection
  const collectionRef = collection(fireboose.db, collectionName); 
  var collectionData = await getDocs(collectionRef);
  const collectionDocsIds = collectionData.docs.map((doc) => doc.id);

  // Y para cada uno de ellos, se lleva a cabo un delete
  for (let id of collectionDocsIds) {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
  }
}

await deleteCollectionDocs('countries')

// Finalmente, se evita que el proceso continúe en terminal:
//   0 -> Resultado exitoso
//   1 -> Resultado frustrado
process.exit(0);