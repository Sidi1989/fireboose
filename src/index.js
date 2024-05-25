import { connect } from './connection.js';
import { model } from './model.js';
import Schema from './schema.js';
import Query from './query.js';




const fireboose = {
  connect,
  model
};




export default fireboose;
export {Schema, Query};