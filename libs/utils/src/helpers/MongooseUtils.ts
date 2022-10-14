import * as _ from 'lodash';
import { Types, Schema } from 'mongoose';

export function isMongoId(value) {
  if (value instanceof Types.ObjectId) {
    return true;
  }

  if (!_.isString(value)) {
    return false;
  }

  // Here we don't use mongoose.Types.ObjectId.isValid method because it's a weird check,
  // it returns for instance true for any integer value
  const hexadecimal = /^[0-9A-F]+$/i;
  return hexadecimal.test(value) && value.length === 24;
}

export function valueToId(value) {
  try {
    if (Array.isArray(value)) return value.map(valueToId);
    if (isMongoId(value)) {
      return new Types.ObjectId(value);
    }
    return value;
  } catch (error) {
    return null;
  }
}
