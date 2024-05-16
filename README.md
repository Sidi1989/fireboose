# README

Elegant Firebase's Firestore object modeling for node.js

Fireboose provides a straight-forward, schema-based solution to model your 
application data. It includes built-in type casting, validation, query 
building, business logic hooks and more, out of the box.

## Basic example

```js
const fireboose = require('fireboose');

const config = {};
fireboose.connect(config);

const Pet = fireboose.model('Pet', 'pets');

const dog = Pet.create({ name: 'Kira' }, 'id');
  ||
const dog = new Pet({ name: 'Kira' }, 'id')
dog.save()

```

## Methods

```js

```

## Acknowledgement

[Firefose](https://www.npmjs.com/package/firefose)