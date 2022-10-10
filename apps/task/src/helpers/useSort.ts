export default function useSort(str = ''): { [key: string]: 1 | -1 } {
  try {
    if (str !== '' && str !== null && !!str) {
      const result: any = {};
      const sortable = str.split(',');
      sortable.forEach((element) => {
        const [filed, sort] = element.split(':');
        if (
          sort === 'ASC' ||
          sort === 'asc' ||
          sort === 'DESC' ||
          sort === 'desc'
        )
          result[filed] = sort === 'ASC' || sort === 'asc' ? 1 : -1;
      });
      return result;
    } else {
      return { createdAt: -1 };
    }
  } catch (error) {
    console.error(error);
    return { createdAt: -1 };
  }
}
