import { 
  collection, doc,
  setDoc, 
} from 'firebase/firestore';




/**
 * @description
 * Convert an instance into a Plain Object.
 * 
 * It includes only ownProperties (both enumerable and non-enumerable),
 * but not inherited properties, so it excludes methods like:
 * inspect(), save(),... which are inherited from its parent Class.
 * @return {Object}
 */
const toObject = function () {
  const pojo = {}
  for (let prop of Object.getOwnPropertyNames(this)) {
    pojo[prop] = this[prop];
  }

  return pojo;
}


/**
 * @description
 * Help logging information about an instance.
 * 
 * It exposes both ownProperties and the inherited ones, but only if 
 * they are enumerable.
 * @return {Log}
 */
const inspect = function () {
  for (let prop in this) {
    console.log(prop, this[prop]);
  }
};

/**
 * @description
 * Check multiple conditions to be fulfilled by an instance,
 * triggering before it could be saved.
 * 
 * @return
 */
const validate = function () {
  const selfSchema = this.__proto__.constructor.schema;
  const selfSchemaDefinition = selfSchema.definition;
  const selfSchemaConfig = selfSchema.config;

  // Check if a property defined as required in the Schema exists
  // in the instance
  for (let prop in selfSchemaDefinition) {
    if (selfSchemaDefinition[prop].required && this[prop] === undefined) {
      console.error(`Required property ${prop} not found in the instance`);
    }
  }
}


/**
 * @description
 * Set an instance (previously created through: new Class(info)) as a 
 * Firestore document in a collection.
 * 
 * @return {String} Id of the instance
 */
const save = async function () {
  let Constructor = this.__proto__.constructor;

  const db = Constructor.db;
  const collectionName = Constructor.collection;
  const collectionRef = collection(db, collectionName);

  const docRef = doc(collectionRef, this.__id);
  await setDoc(docRef, this.toObject());
  return this.__id;
};




export {
  toObject,
  inspect,
  validate,
  save,
}