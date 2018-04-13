const fs = require('fs');

exports.handler = function (event, context, callback) {
  let path = event.queryStringParameters.path || '.';

  fs.readdir(path, function (err, items) {
    console.log(items);

    let logs = [];

    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      logs.push(items[i])
    }

    callback(null, {
      statusCode: 200,
      body: logs.join("\n").toString()
    });
  });
}