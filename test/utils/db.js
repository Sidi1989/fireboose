import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };
import { 
  collection, doc,
  getDocs, deleteDoc,
} from 'firebase/firestore';




// All the DB functions will need a previous connection to Firestore 
fireboose.connect(firebooseConnectionSettings);


/**
 * @description
 * Delete all the Documents from a Collection.
 * @param {String} collectionName E.g: members 
 */
const deleteCollectionDocs = async function (collectionName) {
  // First, it retrieves all the IDs from the Documents in the Collection
  const collectionRef = collection(fireboose.db, collectionName); 
  var collectionData = await getDocs(collectionRef);
  const collectionDocsIds = collectionData.docs.map((doc) => doc.id);

  // And then it removes each Document through their IDs
  for (let id of collectionDocsIds) {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
  }
};


/**
 * @description
 * IndexedCountry Model
 */

// Basic parameters of the Schema
const indexedCountrySchemaDefinition = {
  name: {
    $type: String,
    required: false
  },
  continent: {
    $type: String,
    required: false
  },
  capital: {
    $type: String,
    required: false
  },
  seas: {
    $type: Array,
    required: false
  },
  rivers: {
    $type: Array,
    required: false
  },
  population: {
    $type: Number,
    required: false
  }
};
const indexedCountrySchemaConfig = {
  autoIndex: true
};

// Instantiation of the Schema
const indexedCountrySchema = new Schema(indexedCountrySchemaDefinition, indexedCountrySchemaConfig);

// Addition of some indexes to the instanced schema
indexedCountrySchema.addIndex({name: 'asc', continent: 'asc'});
indexedCountrySchema.addIndex({name: 'asc', continent: 'desc'});
indexedCountrySchema.addIndex({name: 'desc', population: 'asc'});
indexedCountrySchema.addIndex({continent: 'desc', population: 'desc'});

// While creating the Model, it will trigger Model.ensureIndexes():
const IndexedCountry = fireboose.model('IndexedCountry', indexedCountrySchema, 'indexedCountries');


/**
 * @description
 * UnIndexedCountry Model
 */

// Basic parameters of the Schema
const unindexedCountrySchemaDefinition = {
  name: {
    $type: String,
    required: false
  },
  continent: {
    $type: String,
    required: false
  },
  capital: {
    $type: String,
    required: false
  },
  seas: {
    $type: Array,
    required: false
  },
  rivers: {
    $type: Array,
    required: false
  },
  population: {
    $type: Number,
    required: false
  }
};
const unindexedCountrySchemaConfig = {};

// Instantiation of the Schema
const unindexedCountrySchema = new Schema(unindexedCountrySchemaDefinition, unindexedCountrySchemaConfig);

// While creating the Model, it will trigger Model.ensureIndexes():
const UnindexedCountry = fireboose.model('UnindexedCountry', unindexedCountrySchema, 'unindexedCountries');




export {
  deleteCollectionDocs,
  IndexedCountry,
  UnindexedCountry
};