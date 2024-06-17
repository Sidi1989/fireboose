import { connect } from './connect/index.js';
import { model } from './model/index.js';
import Schema from './schema/index.js';
import Query from './query/index.js';




const fireboose = {
  connect,
  model
};




export default fireboose;
export {Schema, Query};