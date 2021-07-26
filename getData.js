var fetchUrl = require('fetch').fetchUrl;

const dataSources = [
  'https://pastebin.com/raw/xakN3d90',
  'https://pastebin.com/raw/4aQB0PfA',
  'https://pastebin.com/raw/aqyKgFk4',
  'https://pastebin.com/raw/aqRHtkAN',
  'https://pastebin.com/raw/GwE7q2gR',
  'https://pastebin.com/raw/E9nVzqSU',
  'https://pastebin.com/raw/V895E5bV',
  'https://pastebin.com/raw/hfz8HKBA',
  'https://pastebin.com/raw/EiMfxdb3',
  'https://pastebin.com/raw/QRmckcsw',
  'https://pastеbin.com/raw/z0mcx7dk',
];

const getData = () => {
  return new Promise((resolve, reject) => {
    const getSource = () => {
      const i = Math.floor(Math.random() * dataSources.length);
      return dataSources[i];
    };
    fetchUrl(getSource(), function (error, meta, body) {
      if (!error) {
        const data = body.toString();
        const date = new Date();
        const minutes = date.getMinutes();
        let resp = data;
        for (let i = 0; i < minutes; i++) {
          resp += data;
        }
        resolve(resp);
      } else {
        reject(false);
      }
    });
  });
};

module.exports = { getData };
