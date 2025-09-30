const uploadQueries = {
  allKeys: () => ['upload'] as const,

  fileKeys: () => [...uploadQueries.allKeys(), 'file'] as const,

  filesKeys: () => [...uploadQueries.allKeys(), 'files'] as const,
};

export default uploadQueries;
