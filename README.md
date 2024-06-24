# README

Elegant Firebase's Firestore object modeling for node.js

Fireboose provides a straight-forward, schema-based solution to model your 
application data. It includes built-in type casting, validation, query 
building, business logic hooks and more, out of the box.

## Installation 

Use the package manager 'npm' to install Fireboose:

```js
npm install fireboose --save
yarn add fireboose
```
Then you will be able to import it:

```js
const fireboose = require('fireboose');
import fireboose from 'fireboose';
```

## Connect

You can connect to Fireboose using a Service Account key from Firebase,
as the config object should look like this:

```js
const connectionConfig = {
  apiKey: 'api_key',
  authDomain: "auth_domain",
  projectId: "project_id",
  storageBucket: "storage_bucket",
  messagingSenderId: "messaging_sender_id",
  appId: "app_id",
}

fireboose.connect(connectionConfig);
```

## Schema

Once achieved the connection, you can build an Schema:

```js
const definition = {
  name: {
    $type: String,
    required: true
  },
  age: {
    $type: Number,
    required: false,
    default: 18
  }
}
const config = {
  // Default options that can be modified
};

const countrySchema = new Schema(definition, config);
```

## Model

Once set an Schema, you can create a new Model from it.
It requires 3 parameters:
  - Name of the Class
  - Schema for the Class
  - Name of the Collection in Firestore

```js
const Country = fireboose.model('Country', countrySchema, 'countries');

const nation = Country.create({ name: 'Nation' }, 'id');
  ||
const nation = new Country({ name: 'Nation' }, 'id')
nation.save()
```

## Query

For some interaction with the collections, it could be necessary to set up firstly
an instanced query with the parameters for searching among the documents.
So after configuring that query with the desired methods -with an array of all of those
searching operations as the key to compose correct queries-, the query itself would be
one of the arguments for some Model methods (v.g.: findMany)

```js
const query = new Query().where('continent', '==', 'Europe')
const countries = Country.findMany(query)
```

### Caveat

https://stackoverflow.com/questions/53790175/why-does-this-firestore-query-require-an-index
https://firebase.google.com/docs/firestore/query-data/index-overview
https://firebase.google.com/docs/firestore/query-data/queries
https://firebase.google.com/docs/firestore/query-data/order-limit-data

Contrary to https://mongoosejs.com/docs/api/model.html#Model.ensureIndexes()
where Moongose can ask MongoDB to create the necessary indexes, 
Fireboose CANNOT ask Firestore to do it, so it must be done manually in the UI.
However, thanks to the query method "ensureIndexes" and the default config "autoIndex",
a list of all the needed links (for that visual creation of the indexes) will be triggered
as soon as their fault is detected.

## Acknowledgement

[Firefose](https://www.npmjs.com/package/firefose)

## License

ISC