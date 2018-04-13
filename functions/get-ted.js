const fs = require('fs');
// const request = require("request");
// const axios = require("axios")
const http = require("http");
// var request = promisify(req);

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

function fetchData() {
  return new Promise(resolve => {
    http.get(`http://tedtalk.directory/ted-data.json`, res => {
      res.setEncoding("utf8");
      let body = "";

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

async function searchTed() {
  try {
    const data = await fetchData();

    for (let i in data) {
      console.log(data[i].speakerInfo.speakerName);
    }

    return new Promise(resolve => { resolve(data[0].speakerInfo.speakerName) })
  }
  catch (err) {
    console.log(err);

    return new Promise(reject => { reject(err.toString()) })
  }
}

exports.handler = async (event, context, callback) => {
  console.log(context);
  console.log(event.queryStringParameters.path)

  const res = await searchTed();

  callback(null, {
    statusCode: 200,
    body: res
  });
}