// const request = require("request");
// const axios = require("axios")
const http = require("http");
const { promisify } = require('util');
// var request = promisify(req);

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

function fetchData() {
  return new Promise(resolve => {
    http.get(`http://tedtalk.directory/ted-data.json`, res => {
      res.setEncoding("utf8");
      let body = "";

      const { statusCode } = res;
      let error; 
      if (statusCode !== 200)
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.on("data", data => {
        // console.log(data);
        body += data;
      });

      res.on("end", () => {
        let dataJson = JSON.parse(body);
        console.log("done");
        resolve(dataJson)
      });
    })
  })
}


exports.handler = async (event, context, callback) => {
  try {
    const data = await fetchData();

    for (let i in data) {
      console.log(data[i].speakerInfo.speakerName);
    }

    callback(null, {
      statusCode: 200,
      body: data[0].speakerInfo.speakerName
    });
  }
  catch (err) {
    console.log(err);

    callback(null, {
      statusCode: 400,
      body: err
    });
  }
}