const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { options } = config;

async function executeTest(){
  const scenarioName = config.scenarioName;
  const beforePath = config.beforePath;
  const afterPath = config.afterPath;
  const beforeFileImages = fs.readdirSync(beforePath).sort((a, b) => a.localeCompare(b));
  const afterFileImages = fs.readdirSync(afterPath).sort((a, b) => a.localeCompare(b));

  if(beforeFileImages.length === 0 || beforeFileImages.length !== afterFileImages.length){
    return "Invalid content length";
  }
  const size = beforeFileImages.length;
  const stepList = [];
  for(let i = 0; i < size; i++) {
    if(beforeFileImages[i] !== afterFileImages[i]) {
      return "Invalid content names";
    }

    stepList.push(beforeFileImages[i].slice(0, beforeFileImages[i].lastIndexOf('.')));
  }
  let resultInfo = {}
  if (!fs.existsSync(`./results/${scenarioName}`)){
    fs.mkdirSync(`./results/${scenarioName}`, { recursive: true });
  }
  fs.copyFileSync('./index.css', `./results/${scenarioName}/index.css`);
  for(step of stepList){
      const data = await compareImages(
          fs.readFileSync(`${beforePath}/${step}.png`),
          fs.readFileSync(`${afterPath}/${step}.png`),
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
      fs.writeFileSync(`./results/${scenarioName}/compare-${step}.png`, data.getBuffer());
      fs.copyFileSync(`${beforePath}/${step}.png`, `./results/${scenarioName}/before-${step}.png`);
      fs.copyFileSync(`${afterPath}/${step}.png`, `./results/${scenarioName}/after-${step}.png`);      
  }

  let datetime = new Date().toISOString().replace(/:/g,".");
  fs.writeFileSync(`./results/${scenarioName}/report.html`, createReportHTML(scenarioName, datetime, stepList, resultInfo));
  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return resultInfo;  
}
(async ()=>console.log(await executeTest(process.argv[2], process.argv[3], process.argv[4])))();

function stepHTML(step, info){
  return `<div class=" browser" id="test0">
  <div class=" btitle">
      <h2>Step: ${step}</h2>
      <p>Data: ${JSON.stringify(info)}</p>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="before-${step}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="after-${step}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare-${step}.png" id="diffImage" label="Diff">
    </div>
  </div>
</div>`
}

function createReportHTML(scenarioName, datetime, stepList, resInfo){
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
              ${stepList.map(step=>stepHTML(step, resInfo[step]))}
          </div>
      </body>
  </html>`
}