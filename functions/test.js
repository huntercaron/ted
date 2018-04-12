const fs = require('fs');

exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, Worldddd"
  });

  fs.readdir(path, function (err, items) {
    console.log(items);

    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  });
}