module.exports = {
  apps: [
    {
      name: 'dict-worker',
      script: 'dist/queues/dictionaryQueue.js', // <— add /src/
    },
    {
      name: 'table-worker',
      script: 'dist/queues/tableQueue.js', // <— add /src/
    },
  ],
};
