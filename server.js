const express = require('express');
var cors = require('cors');
const {performance} = require('perf_hooks');
const { getData } = require('./getData');
const {
  incrementRequestReceived,
  incrementRetry,
  addExecutionTimeForRequest,
  getServerMetrics,
  processDataForMetrics,
} = require('./metrices');

const app = express();
const port = 3000;
app.use(cors());

// serve your css as static
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

const getDataForResponse = async () => {
  try {
    const data = await getData();
    return data;
  } catch (ex) {
    console.log('Failed Request');
    incrementRetry();
    return getDataForResponse();
  }
};

app.get('/getData', async (req, res) => {
  var t0 = performance.now();
  incrementRequestReceived();
  const data = await getDataForResponse();
  var t1 = performance.now();
  const timeTakenByCall = t1 - t0;
  addExecutionTimeForRequest(timeTakenByCall);
  processDataForMetrics(data);
  res.send({ data, serverMetrics: getServerMetrics() });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
