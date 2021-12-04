const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.beecrowd.com.br/judge/pt/problems/all');
  
  
  const node = await page.evaluate(() => {
    const trNode = [...document.querySelectorAll("tr")];

    const data = trNode.map( (node) => {
      const challengeId = node.children[0].textContent;
      const challengeUrl = node.children[2].children[0].href

      return {
        codeId: challengeId,
        codeUrl: challengeUrl
      }
    } )


    return data;
  })

  console.log(node)


  await browser.close();
})();