const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

var directories = [];

const { options } = config;

var getFiles = function (path, files) {
  fs.readdirSync(path).forEach(function (file) {
    var subpath = path + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      getFiles(subpath, files);
    } else {
      files.push(file);
    }
  });
}

var getDirectory = function (path, files) {
  fs.readdirSync(path).forEach(function (file) {
    var subpath = path + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      files.push(file);
      getDirectory(subpath, files);
    }
  });
}

async function executeTest() {
  console.log('------------------------------------------------------------------------------------');
  console.log("Execution started..");
  const beforePath = config.beforePath;
  const afterPath = config.afterPath;

  getDirectory(beforePath, directories);

  for (i = 0; i < directories.length; i++) {
    const dir = directories[i];
    if (!fs.existsSync(`./results/${dir}`)) {
      fs.mkdirSync(`./results/${dir}/imagenes`, { recursive: true });
    }
    fs.copyFileSync('./index.css', `./results/${dir}/index.css`);
    filesSorce = []
    let resultInfo = {}
    getFiles(`./${beforePath}/${dir}`, filesSorce);
    for (step of filesSorce) {

      const data = await compareImages(
        fs.readFileSync(`${beforePath}/${dir}/${step}`),
        fs.readFileSync(`${afterPath}/${dir}/${step}`),
        options
      );

      resultInfo[step] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./results/${dir}/imagenes/compare-${step}`, data.getBuffer());
      fs.copyFileSync(`${beforePath}/${dir}/${step}`, `./results/${dir}/imagenes/before-${step}`);
      fs.copyFileSync(`${afterPath}/${dir}/${step}`, `./results/${dir}/imagenes/after-${step}`);
    }

    let datetime = new Date().toISOString().replace(/:/g, ".");
    fs.writeFileSync(`./results/${dir}/report.html`, createReportHTML(dir, datetime, filesSorce, resultInfo));
    console.log('------------------------------------------------------------------------------------');
    console.log(`Execution finished for folder ${dir}`);
  }
  console.log('------------------------------------------------------------------------------------');
  console.log("Execution finished. Check the report under the results folder");
  return "";
}

(async () => console.log(await executeTest()))();


function stepHTML(step, info) {
  const tableResults = createTableFromJson(info);
  return `<div class=" browser" id="test0">
  <div class=" btitle">
      <h2>Step: ${step}</h2>
      <p><div id="container">${tableResults}</div></p>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="./imagenes/before-${step}" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="./imagenes/after-${step}" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./imagenes/compare-${step}" id="diffImage" label="Diff">
    </div>
  </div>
</div>`
}

function createReportHTML(scenarioName, datetime, stepList, resInfo) {
  return `
  <html>
      <head>
          <title> Resemble VRT Report </title>
          <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1>Report for ${scenarioName} </h1>
          <p>Before link:&nbsp;<a href="${config.urlBefore}">${config.urlBefore}</a>
          </p>
          <p>
          After lin:&nbsp;<a href="${config.urlAfter}"> ${config.urlAfter}</a>
          </p>
          
          <div id="visualizer">
              ${stepList.map(step => stepHTML(step, resInfo[step])).join('')}
          </div>
      </body>
  </html>`
}

function createTableFromJson(jsonData) {
  let tableHtml = '<table style="width:100%"><thead><tr>';
  for (const key in jsonData) {
    tableHtml += '<th>' + key + '</th>';
  }
  tableHtml += '</tr></thead><tbody><tr>';
  for (const key in jsonData) {
    tableHtml += "<td style='text-align:center; vertical-align:middle'>" + JSON.stringify(jsonData[key]) + '</td>';
  }
  tableHtml += '</tr></tbody></table>';
  return tableHtml;
}