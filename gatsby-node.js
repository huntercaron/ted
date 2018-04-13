/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');

const fromFilePath = './ted-data.json'
const toFilePath = './public/ted-datajson'


exports.onPreBuild = () => {
  fs.readFile(fromFilePath, (err, data) => {
    if (err) throw err;

    fs.writeFile(toFilePath, data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
}