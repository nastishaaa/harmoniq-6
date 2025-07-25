const parseNumber = (num, defaultNum) => {
    const isString = typeof num === 'string';

    if (!isString) return defaultNum;

    const parsedNum = Number(num);

    if (Number.isNaN(parsedNum)) {
        return defaultNum;
    }

    return parsedNum;
};

export const parsePaginationParams = (data = {}) => {
    const { page, perPage } = data;

    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};