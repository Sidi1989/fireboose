# API

## Model Methods

### Common actions

- create
- ensureIndexes

| Action      | One             | Many          |
| :---:       | :---:           | :---:         |
| Find        | findOne         | findMany      |
| Find        | findOneById     | ...           |
| Update      | updateOne       | updateMany    |
| Update      | updateOneById   | ...           |
| Delete      | deleteOne       | deleteMany    |
| Delete      | deleteOneById   | ...           |

### Field-related updates

- unset (delete a field)
- rename (rename a field)

| Action    | One             | Many          |
| :---:     | :---:           | :---:         |
| Rename    | renameOne       | renameMany    |
| Rename    | renameOneById   | ...           |
| Unset     | unsetOne        | unsetMany     |
| Unset     | unsetOneById    | ...           |

### Array-related updates

- pop (remove last element)
- shift (remove first element)
- push (add element at the end)
- unshift (add element at the beginning)
- pull (remove coincident elements)

| Action    | One             | Many          |
| :---:     | :---:           | :---:         |
| Pop       | popOne          | popMany       |
| Pop       | popOneById      | ...           |
| Shift     | shiftOne        | shiftMany     |
| Shift     | shiftOneById    | ...           |
| Push      | pushOne         | pushMany      |
| Push      | pushOneById     | ...           |
| Unshift   | unshiftOne      | unshiftMany   |
| Unshift   | unshiftOneById  | ...           |
| Pull      | pullOne         | pullMany      |
| Pull      | pullOneById     | ...           |

## Document Methods

- toObject()
- inspect()
- validate()
- save()

## Query Methods

- Skip
- Limit
- OrderBy
- Where
- getQueryOperations