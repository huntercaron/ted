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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let searchTed = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      const body = yield fetchData();
      const data = JSON.parse(body);

      for (let i in data) {
        console.log(data[i].speakerInfo.speakerName);
      }

      return new Promise(function (resolve) {
        resolve(data[0].speakerInfo.speakerName);
      });
    } catch (err) {
      console.log(err);

      return new Promise(function (reject) {
        reject(err.toString());
      });
    }
  });

  return function searchTed() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = __webpack_require__(14);
// const request = require("request");
// const axios = require("axios")
const http = __webpack_require__(20);
const { promisify } = __webpack_require__(1);
// var request = promisify(req);

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

function fetchData() {

  http.get(`http://tedtalk.directory/ted-data.json`, res => {
    res.setEncoding("utf8");
    let body = "";

    res.on("data", data => {
      console.log(data);

      body += data;
    });
  });

  // return new Promise(resolve => {
  //   request.get(`http://tedtalk.directory/ted-data.json`, (err, res, body) => {
  //     if (err) {
  //       reject(err)
  //     }

  //     console.log(body);


  //     resolve(body);
  //   });
  // })


  // fetch(`http://tedtalk.directory/ted-data.json`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     return new Promise(resolve => { resolve(data) })
  //   });
}

exports.handler = (() => {
  var _ref2 = _asyncToGenerator(function* (event, context, callback) {
    console.log(context);
    console.log(event.queryStringParameters.path);

    const res = yield searchTed();

    callback(null, {
      statusCode: 200,
      body: res
    });
  });

  return function (_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

/***/ })

/******/ })));