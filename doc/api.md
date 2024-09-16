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

### Array-related updates

- pop (remove last element)
- pull (remove coincident elements)
- push (add element at the end)
- shift (remove first element)
- unshift (add element at the beginning)

| Update    | One             | Many          |
| :---:     | :---:           | :---:         |
| Pop       | popOne          | popMany       |
| Pop       | popOneById      | ...           |
| Pull      | pullOne         | pullMany      |
| Pull      | pullOneById     | ...           |
| Push      | pushOne         | pushMany      |
| Push      | pushOneById     | ...           |
| Shift     | shiftOne        | shiftMany     |
| Shift     | shiftOneById    | ...           |
| Unshift   | unshiftOne      | unshiftMany   |
| Unshift   | unshiftOneById  | ...           |

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