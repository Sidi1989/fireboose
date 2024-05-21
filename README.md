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

## Connection

You can connect to Fireboose using services account key from Firebase,
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
const config = {};

const dogSchema = new Schema(definition, config);
```

## Model

Once set an schema, you can create a new model from it.
It requires 3 parameters:
  - Name of the Class
  - Schema for the Class
  - Collection in Firestore

```js
const Dog = fireboose.model('Dog', dogSchema, 'dogs');

const kira = Dog.create({ name: 'Kira' }, 'id');
  ||
const kira = new Dog({ name: 'Kira' }, 'id')
kira.save()
```

## Acknowledgement

[Firefose](https://www.npmjs.com/package/firefose)

## License

ISC