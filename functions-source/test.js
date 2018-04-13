const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const cleanData = [
  {
    "index": 1,
    "speakerInfo": {
      "speakerLink": "https://www.ted.com/speakers/al_gore",
      "speakerName": "Al Gore",
      "speakerTitle": "Climate advocate",
      "speakerBio": "Nobel Laureate Al Gore focused the world’s attention on the global climate crisis. Now he’s showing us how we’re moving towards real solutions.\n"
    }
  },
  {
    "index": 2,
    "speakerInfo": {
      "speakerLink": "https://www.ted.com/speakers/al_gore",
      "speakerName": "Al Gore",
      "speakerTitle": "Climate advocate",
      "speakerBio": "Nobel Laureate Al Gore focused the world’s attention on the global climate crisis. Now he’s showing us how we’re moving towards real solutions.\n"
    }
  }
];


exports.handler = function (event, context, callback) {
  let path = event.queryStringParameters.path || '.';

  fs.readdir(path, function (err, items) {
    console.log(items);

    let logs = [];

    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      logs.push(items[i])
    }

    const json = JSON.stringify(cleanData);

    fs.writeFile('cleanData.json', json, 'utf8', () => { console.log("wronte to file")
    });

    callback(null, {
      statusCode: 200,
      body: logs.join("\n").toString()
    });
  });
}