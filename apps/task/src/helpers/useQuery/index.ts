import buildWhereClause from './buildWhereClause';
import convertRestQueryParams from './convertRestQueryParams';

export default function useQuery(restQuery = {}) {
  try {
    const { where } = convertRestQueryParams(restQuery);
    let query = {};
    where.forEach((element) => {
      query = { ...query, ...buildWhereClause(element) };
    });
    return query;
  } catch (error) {
    return {};
  }
}
