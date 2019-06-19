function getParams({ pageNumber = 1, pageSize = 20, total } = {}) {
  if (
    pageNumber === 0 ||
    pageNumber == null ||
    pageSize === 0 ||
    pageSize == null
  ) {
    throw new Error(
      "You cannot provided either pageNumber and pageSize with zero values"
    );
  }

  const latestPage = Math.ceil(total / pageSize);
  if (pageNumber > latestPage && total !== 0) {
    throw new Error("You are trying to fetch an out of range page");
  }

  return {
    filter: { limit: pageSize, skip: (pageNumber - 1) * pageSize },
    pageNumber: Number(pageNumber),
    latestPage,
    pageSize,
    total
  };
}

module.exports = { getParams };
