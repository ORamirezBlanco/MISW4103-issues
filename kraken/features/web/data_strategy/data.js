const { faker } = require('@faker-js/faker');
const https = require('https');
const fs = require('fs');
const path = require('path');

const A_PRIORI_STRATEGY = "a-priori";
const PSEUDO_STRATEGY = "pseudo";
const RANDOM_STRATEGY = "random";

class DataStrategy {
  strategy = "";
  data = {};
  config = {};

  constructor(strategy, config) {
    this.strategy = strategy;
    this.config = config;

    if(this.strategy === A_PRIORI_STRATEGY) {
      if (!this.config.hasOwnProperty('file')) {
        throw new Error("La clave file es requerida para la configuración de la estrategia a-priori");
      }
      if (!this.config.hasOwnProperty('index')) {
        throw new Error("La clave index es requerida para la estrategia configuración de la estrategia a-priori");
      }
    }
    if(this.strategy === PSEUDO_STRATEGY) {
      if (!this.config.hasOwnProperty('uri')) {
        throw new Error("La clave uri es requerida para la configuración de la estrategia pseudo");
      }
    }
    if(this.strategy === RANDOM_STRATEGY) {
      if (!this.config.hasOwnProperty('seed')) {
        throw new Error("La clave seed es requerida para la configuración de la estrategia aleatoria");
      }
    }
  }

  async init() {
    console.log(`Initializing ${this.strategy} strategy`);
    if(this.strategy === A_PRIORI_STRATEGY) {
      this.data = JSON.parse(fs.readFileSync(path.join(__dirname, `../../../${this.config.file}`), 'utf8'));
    }
    if(this.strategy === PSEUDO_STRATEGY) {
      this.data = await getJson(this.config.uri);
      console.log(this.data)
    }
    if(this.strategy === RANDOM_STRATEGY) {
      faker.seed(config.seed);
    }
  }

  getEditorTitle() {
    switch(this.strategy) {
      case A_PRIORI_STRATEGY:
        return this.data[this.config.index].title;
      case PSEUDO_STRATEGY:
        return this.getPseudoValue('title');
      default: //aleatorio
        return faker.lorem.words(5);
    }
  }

  getEditorNaughtyTitle() {
    switch(this.strategy) {
      case A_PRIORI_STRATEGY:
        return this.data[this.config.index].titleNaughty;
      case PSEUDO_STRATEGY:
        return this.getPseudoValue('titleNaughty');
      default: //aleatorio
        return generateNaughtyPhrase();
    }
  }

  getEditorSentenceTitle() {
    switch(this.strategy) {
      case A_PRIORI_STRATEGY:
        return this.data[this.config.index].titleSentences;
      case PSEUDO_STRATEGY:
        return this.getPseudoValue('publishHourInvalid');
      default: //aleatorio
        return faker.lorem.sentence(20);
    }
  }

  getEditorInvalidPublishDate() {
    switch(this.strategy) {
      case A_PRIORI_STRATEGY:
        return this.data[this.config.index].publishDateInvalid;
      case PSEUDO_STRATEGY:
        return this.getPseudoValue('publishDateInvalid');
      default: //aleatorio
        return faker.lorem.words(1);
    }
  }

  getEditorInvalidPublishHour() {
    switch(this.strategy) {
      case A_PRIORI_STRATEGY:
        return this.data[this.config.index].publishHourInvalid;
      case PSEUDO_STRATEGY:
        return this.getPseudoValue('publishHourInvalid');
      default: //aleatorio
        return faker.lorem.words(1);
    }
  }

  getPseudoValue(key) {
    for(;;) {
      const index = getRandomInt(0, this.data.length-1);
      const value = this.data[index][key];
      if(value?.length > 1) return value;
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });

      res.on('error', (err) => {
        reject(err);
      });

    }).on("error", (err) => {
      reject(err);
    });
  });
}

function generateRandomSpecialChar() {
  const start = 0x0080; 
  const end = 0x00FF;
  const randomCharCode = Math.floor(Math.random() * (end - start + 1)) + start;
  return String.fromCharCode(randomCharCode);
}

function generateNaughtyPhrase() {
  const minLength = 10;
  const maxLength = 50;
  const count = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  let result = "";
  for (let i = 0; i < count; i++) {
      const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      let word = '';
      for (let ii = 0; ii < length; ii++) {
        word += generateRandomSpecialChar();
      }
      if(result.length > 1){
        result =+ " ";
      }
      result += word;
  }
 
  return result;
}

module.exports = { DataStrategy };