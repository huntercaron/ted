const fs = require('fs');

exports.handler = function (event, context, callback) {
  

  fs.readdir('../.', function (err, items) {
    console.log(items);

    let logs = [];

    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      logs.push(items[i])
    }

    callback(null, {
      statusCode: 200,
      body: logs.toString()
    });
  });
}