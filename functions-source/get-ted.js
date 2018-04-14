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

async function searchTranscript(transcript, searchTerm) {
  return new Promise(resolve => {
    let lastLine = transcript[transcript.length - 1].time;

    let foundLines = transcript.reduce((accumulator, line) => {
      if (line.text.toLowerCase().indexOf(searchTerm) !== -1)
        accumulator.push(line.time);
      return accumulator;
    }, [])

    let transcriptData = {
      foundLines: foundLines,
      lastLine: lastLine
    }

    resolve(transcriptData);
  })
}

// add logic to grab multiple files


exports.handler = async (event, context, callback) => {
  try {
    const data = await fetchData();
    let searchTerm = event.queryStringParameters.search.toLowerCase() || '(Applause)';
    let talkPromises = [];

    for (let i = 0; i < data.length; i++) {
      talkPromises.push(searchTranscript(data[i].transcript, searchTerm));
    }

    const foundLines = await Promise.all(talkPromises);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(foundLines)
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