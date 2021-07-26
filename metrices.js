const timeTakenByRequest = [];
const serverMetrics = {
  retries: 0,
  totalRequestReceived: 0,
  totalCharactersReceivedAtServer: 0,
  charactersMap: {},
};

const incrementRetry = () => {
  serverMetrics.retries += 1;
};

const incrementRequestReceived = () => {
  serverMetrics.totalRequestReceived += 1;
};

const processDataForMetrics = (text) => {
  const characters = text.split('');
  serverMetrics.totalCharactersReceivedAtServer += text.replace(
    / /g,
    ''
  ).length;
  characters.forEach((char) => {
      if (!serverMetrics.charactersMap[char]) {
        serverMetrics.charactersMap[char] = 0;
      }
      serverMetrics.charactersMap[char] += 1;
  });
};

const addExecutionTimeForRequest = (value) => {
  timeTakenByRequest.push(value);
};

const getAverageExecutionTime = () => {
  const sum = timeTakenByRequest.reduce((a, b) => a + b, 0);
  return sum / timeTakenByRequest.length || 0;
};

const getServerMetrics = () => {
  const minExecutionTimeAtServer = Math.min.apply(
    null,
    timeTakenByRequest
  );
  const maxExecutionTimeAtServer = Math.max.apply(
    null,
    timeTakenByRequest
  );
  return {
    ...serverMetrics,
    minExecutionTimeAtServer,
    maxExecutionTimeAtServer,
    averageExecutionTime: getAverageExecutionTime(),
  };
};

module.exports = {
  getServerMetrics,
  incrementRetry,
  incrementRequestReceived,
  processDataForMetrics,
  addExecutionTimeForRequest,
};
