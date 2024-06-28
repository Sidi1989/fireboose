import {addIndex} from './methods/index.js';




// Defaults to apply when the user doesn't provide his own config options:
const configDefaults = {
  autoIndex: false
}

// Schema class, whose instances would be necessary for generating Models
const Schema = class {
  constructor (definition, config={}) {
    this.definition = definition;

    // Commonly the defaults are applied, but when there are config options
    // provided by the user, those will overwritte the defaults:
    this.config = configDefaults;
    for (let prop in config) {
      this.config[prop] = config[prop];
    }

    // List of composite indexes needed for Firestore to run cmposite queries:
    this.indexes = [];
  }
}

// Instance method for adding indexes into their array
Schema.prototype.addIndex = addIndex;




export default Schema;