import { deleteCollectionDocs } from './db.js';




console.log('[INFO] Start clearing DB');

await deleteCollectionDocs('countries');

console.log('[INFO] Finish clearing DB');