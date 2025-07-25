export const parseSortParams = (query = {}) => {
  const { sort, sortBy, sortOrder } = query;

  if (sort === 'popular') {
    return { sortBy: 'rate', sortOrder: 'desc' };
  }

  if (sortBy && sortOrder) {
    return { sortBy, sortOrder: sortOrder.toLowerCase() };
  }

  return { sortBy: 'createdAt', sortOrder: 'desc' };
};
