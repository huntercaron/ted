const fs = require('fs');

exports.handler = function (event, context, callback) {
  console.log(context);
  console.log(event.queryStringParameters.path)

  callback(null, {
    statusCode: 200,
    body: "suh"
  });
}