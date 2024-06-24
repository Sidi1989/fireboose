import { deleteCollectionDocs } from '../../src/utils/db.js';




console.log('[INFO] Start clearing DB');

await deleteCollectionDocs('indexedCountries');
await deleteCollectionDocs('unindexedCountries');

console.log('[INFO] Finish clearing DB');

// Evita que el proceso continúe en terminal:
//   0 -> Resultado exitoso
//   1 -> Resultado frustrado
process.exit(0);