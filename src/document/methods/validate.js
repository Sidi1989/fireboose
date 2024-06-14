/**
 * @description
 * Check multiple conditions to be fulfilled by an instance,
 * triggering before it could be saved.
 * 
 * @return {Boolean} Returns true if everything goes well, otherwise it 
 * returns false
 */
const validate = function () {
  const selfSchema = this.__proto__.constructor.schema;
  const selfSchemaDefinition = selfSchema.definition;
  const selfSchemaConfig = selfSchema.config;

  // Check if a property defined as required in the Schema
  // exists in the instance
  for (let prop in selfSchemaDefinition) {
    if (selfSchemaDefinition[prop].required && this[prop] === undefined) {
      console.error(`Required property ${prop} not found in the instance`);
      return false;
    }
  }

  return true;
}




export default validate;