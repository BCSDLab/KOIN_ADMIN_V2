const uploadQueries = {
  allKeys: () => ['upload'],

  fileKeys: () => [...uploadQueries.allKeys(), 'file'],

  filesKeys: () => [...uploadQueries.allKeys(), 'files'],
};

export default uploadQueries;
