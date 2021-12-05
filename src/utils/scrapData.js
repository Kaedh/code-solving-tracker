const puppeteer = require('puppeteer');
const fs = require("fs");

const getAllExercicesPerPage = () => {
  const trNode = [...document.querySelectorAll("tr")];
  
  const data = trNode.map(node => {
    const challengeId = node.children[0]?.textContent;
    const challengeUrl = node.children[2]?.children[0]?.href;

    return { codeId: challengeId, codeUrl: challengeUrl }
  })

  data.shift()

  return data;  
  
}

const sanitizeDataScrapped = (data) => {

  const sanitizedData = data.map( exercise => {
    if (exercise.codeId != "") {
      exercise.codeId = exercise.codeId.slice(1).trim()

      return exercise
    }
  })

  return sanitizedData
} 

const main = async () => {
  const browser = await puppeteer.launch();

  let data = [];
  let dataPerPage = [];

  for(let i = 1; i <= 92; i++) {
    const pageUrl = `https://www.beecrowd.com.br/judge/pt/problems/all?page=${i}`

    const page = await browser.newPage();
    await page.goto(pageUrl);

    dataPerPage = await page.evaluate(getAllExercicesPerPage)

    data = [...data, ...dataPerPage ];
    
  }

  const sanitizedData = sanitizeDataScrapped(data);

  fs.writeFile("./data/data.json", JSON.stringify({...sanitizedData}), (err) => {
    if (err) console.log(err)
  })

  await browser.close();
}

main();