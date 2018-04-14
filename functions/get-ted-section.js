(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let searchTranscript = (() => {
  var _ref = _asyncToGenerator(function* (transcript, searchTerm) {
    return new Promise(function (resolve) {
      let lastLine = transcript[transcript.length - 1].time;

      let foundLines = transcript.reduce(function (accumulator, line) {
        if (line.text.toLowerCase().indexOf(searchTerm) !== -1) accumulator.push(line.time);
        return accumulator;
      }, []);

      let transcriptData = {
        foundLines: foundLines,
        lastLine: lastLine
      };

      resolve(transcriptData);
    });
  });

  return function searchTranscript(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// add logic to grab multiple files


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const request = require("request");
// const axios = require("axios")
const http = __webpack_require__(0);
// var request = promisify(req);

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

function fetchFile(path) {
  return new Promise(resolve => {
    http.get(path, res => {
      res.setEncoding("utf8");
      let body = "";

      const { statusCode } = res;
      let error;
      if (statusCode !== 200) error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
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
        resolve(dataJson);
      });
    });
  });
}

exports.handler = (() => {
  var _ref2 = _asyncToGenerator(function* (event, context, callback) {
    try {
      let fileNum = event.queryStringParameters.number || 1;
      const data = yield fetchFile(`http://tedtalk.directory/ted-data-${fileNum}.json`);
      let searchTerm = event.queryStringParameters.search.toLowerCase() || '(Applause)';
      let talkPromises = [];

      for (let i = 0; i < data.length; i++) {
        talkPromises.push(searchTranscript(data[i].transcript, searchTerm));
      }

      const foundLines = yield Promise.all(talkPromises);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(foundLines)
      });
    } catch (err) {
      console.log(err);

      callback(null, {
        statusCode: 400,
        body: err.toString()
      });
    }
  });

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

/***/ })
/******/ ])));