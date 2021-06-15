import firebase from "../../../firebase/init";

const characters = require("./json/characters.json");
const commonMaterials = require("./json/commonMaterials.json");
const eliteMaterials = require("./json/eliteMaterials.json");
const db = firebase.firestore();

function camelCase(str) {
  return str
      .replace(/\s(.)/g, function(a) {
          return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function(b) {
          return b.toLowerCase();
      });
}

async function addCharacter(character) {
  try {
    let data = await db.collection('characters').doc(camelCase(character.name)).set({
      name: character.name,
      alias: character.alias,
      rarity: character.rarity,
      constellation: character.constellation,
      sex: character.sex,
      weapon: character.weapon,
      element: character.element,
      region: character.region
    });
    console.log(`Character: ${character.name} written.`);
  } catch (error) {
    console.log(error);
  }
}

async function addCharacterMaterials(character) {
  try {
    const subCollectionRef = db.collection('characters').doc(camelCase(character.name)).collection('materials');
    let data = await subCollectionRef.doc('ascension').set({
      commonMaterial: character.commonMaterial,
      localSpecialties: character.localSpecialties,
      normalBossMaterial: character.normalBossMaterial
    });
    console.log(`Character: ${character.name}'s ascension materials written.`);
    data = await subCollectionRef.doc('talent').set({
      commonMaterial: character.commonMaterial,
      talentMaterial: character.talentMaterial,
      weeklyBossMaterial: character.weeklyBossMaterial
    });
    console.log(`Character: ${character.name}'s talent materials written.`);
  } catch (error) {
    console.log(error);
  }
}

function addCharactersMaterials() {
  characters.forEach(character => {
    addCharacterMaterials(character)
  });
}

function addCharacters() {
  characters.forEach(character => {
    addCharacter(character)
  });
}

function addCommonMaterials() {
  commonMaterials.forEach( async(material) => {
    try {
      let data = await db.collection('commonMaterials').doc(camelCase(material.name)).set({
        droppedBy: [material.droppedBy],
        name: material.name,
        rarity: material.rarity,
        series: material.series,
        img: material.img
      });
      console.log(`Material: ${material.name} written.`);
    } catch (error) {
      console.log(error);
    }
  });
}

function addEliteMaterials() {
  eliteMaterials.forEach( async(material) => {
    try {
      let data = await db.collection('eliteMaterials').doc(camelCase(material.name)).set({
        droppedBy: [material.droppedBy],
        name: material.name,
        rarity: material.rarity,
        series: material.series,
        img: material.img
      });
      console.log(`Material: ${material.name} written.`);
    } catch (error) {
      console.log(error);
    }
  });
}

// addCharacters();
// addCharactersMaterials();
// addCommonMaterials();
// addEliteMaterials();

async function getXiao() {
  let xiao = await db.collection('characters').doc('xiao').get();
  xiao = xiao.data();
  return xiao;
}

export default async (req, res) => {
  // let xiao = await getXiao();
  res.status(200).json(characters);
}