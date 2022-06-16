async function feed(parent, { filter, skip, take, orderBy }, context) {
  const where = filter
    ? {
        OR: [
          { description: { contains: filter } },
          { url: { contains: filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  //TODO 2 await in 1 iteration

  const count = await context.prisma.link.count({ where });

  return {
    links,
    count,
  };
}

module.exports = {
  feed,
};
