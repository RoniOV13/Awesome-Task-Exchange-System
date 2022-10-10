import { valueToId } from '../MongooseUtils';

/**
 * Создаёт из имени поля, оператора и значения поля query объект для поиска в базе
 * @param {Object} options - Options
 * @param {string} options.field - Where clause field
 * @param {string} options.operator - Where clause operator
 * @param {*} options.value - Where clause value
 */
export default function buildWhereClause({ field, operator, value }) {
  if (Array.isArray(value) && !['or', 'in', 'nin'].includes(operator)) {
    return {
      $or: value.map((val) =>
        buildWhereClause({ field, operator, value: val }),
      ),
    };
  }
  const val = valueToId(value);

  switch (operator) {
    case 'or': {
      return {
        $or: value.map((orClause) => {
          if (Array.isArray(orClause)) {
            return {
              $and: orClause.map(buildWhereClause),
            };
          } else {
            return buildWhereClause(orClause);
          }
        }),
      };
    }
    case 'eq':
      return { [field]: val };
    case 'ne':
      return { [field]: { $ne: val } };
    case 'lt':
      return { [field]: { $lt: val } };
    case 'lte':
      return { [field]: { $lte: val } };
    case 'gt':
      return { [field]: { $gt: val } };
    case 'gte':
      return { [field]: { $gte: val } };
    case 'in':
      return {
        [field]: {
          $in: Array.isArray(val) ? val : [val],
        },
      };
    case 'nin':
      return {
        [field]: {
          $nin: Array.isArray(val) ? val : [val],
        },
      };
    case 'contains': {
      return {
        [field]: {
          $regex: `${val}`,
          $options: 'i',
        },
      };
    }
    case 'ncontains':
      return {
        [field]: {
          $not: new RegExp(val, 'i'),
        },
      };
    case 'containss':
      return {
        [field]: {
          $regex: `${val}`,
        },
      };
    case 'ncontainss':
      return {
        [field]: {
          $not: new RegExp(val),
        },
      };
    case 'null': {
      return value ? { [field]: { $eq: null } } : { [field]: { $ne: null } };
    }

    default:
      throw new Error(`Unhandled whereClause : ${field} ${operator} ${value}`);
  }
}
