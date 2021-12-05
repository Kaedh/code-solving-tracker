const fs = require('fs');

const seedAllCodeScraped = (knexInstance) => {
  const rawdata = fs.readFileSync('./src/data/seeds/raw-data.json');
  const data = JSON.parse(rawdata);
  
  const formatedData = Object.keys(data).map(key => {
    return data[key];
  })
  
  return knexInstance('tbcode').insert(formatedData);
}


exports.seed = function(knex) {
  return knex('tbcode').del().then(() => seedAllCodeScraped(knex));
};

