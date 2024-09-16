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
  // Default options, that can be modified
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
```

Once a Class has been created, you can now create instances out of it, like:

```js
const nation = Country.create({ name: 'Nation' }, 'id');
```

Or alternatively:

```js
const nation = new Country({ name: 'Nation' }, 'id')
nation.save()
```

## Query

For some interaction with the collections, it could be necessary to set up firstly
an instanced query with the parameters for searching among the documents.
So after configuring that query with the desired filters, the query itself would be
one of the arguments for some Model methods (v.g.: findMany)

```js
const query = new Query().where('continent', '==', 'Europe')
const europeanCountries = Country.findMany(query)
```

### Caveat

It is recommended to read the Docs about:
  - the needed values for an adequate .env configuration
  - the relation of methods offered by Fireboose
  - the Firestore Limitations in the configuration of composite queries

## Acknowledgement

[Firefose](https://www.npmjs.com/package/firefose)

## License

ISC