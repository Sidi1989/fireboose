# API

## Class Methods

- findMany
- findOneById
- findOneByProperty 
- findManyByProperty
- findByArrayElement
- findByArrayElements
- create
- updateOne
- pushInto
- pullFrom
- deleteOne

| Find            | One                 | Many                    |
| :---:           | :---:               | :---:                   |
| ...             | findMany()          | findMany(queryLimit)    |
| ById            | findOneById         | ...                     |
| ByProperty      | findOneByProperty   | ...                     |

@TODO Todas las divisiones que dependan del parámetro queryLimit 
tienen que convertirse en 2 funciones distintas...
y la actual findManyByProperty tiene que convertirse en la genérica find() o findByQuery()

## Instance Methods

- toObject()
- inspect()
- validate()
- save()