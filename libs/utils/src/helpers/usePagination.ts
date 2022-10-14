// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isNumeric } from 'validator';

export function usePagination(
  skip = '',
  limit = '',
): { skip: number; limit: number } {
  try {
    const result = {
      skip: 0,
      limit: 100,
    };
    if (!!skip && isNumeric(skip)) result.skip = parseInt(skip, 10);
    if (!!limit && isNumeric(limit))
      result.limit = parseInt(limit, 10) === 0 ? 100 : parseInt(limit, 10);
    return result;
  } catch (error) {
    console.error(error);
    return {
      skip: 0,
      limit: 100,
    };
  }
}
