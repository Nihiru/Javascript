const fs = require('fs')

// structure definition
const kingdoms = {
   'SPACE': {
        emblem:  getSpaceEmblem(),
        encrypt: getSpaceEmblemEncrypted()
    },
  'WATER' : {
        emblem: getWaterEmblem(),
        encrypt: getWaterEmblemEncrypted()
    },
    'ICE':{
        emblem: getIceEmblem(),
        encrypt: getIceEmblemEncrypted()
    },
   'LAND': {
        emblem: getLandEmblem(),
        encrypt: getLandEmblemEncrypted()
    },
   'AIR': {
        emblem: getAirEmblem(),
        encrypt: getAirEmblemEncrypted()
    },
    'FIRE':{
        emblem: getFireEmblem(),
        encrypt: getFireEmblemEncrypted()
    }
}

// Retrieving EMBLEMS
function getSpaceEmblem() {
   return 'GORILLA'
}

function getWaterEmblem(){
    return 'OCTOPUS'
}

function getAirEmblem(){
    return 'OWL'
}

function getIceEmblem(){
    return 'MAMMOTH'
}

function getFireEmblem(){
    return 'DRAGON'
}

function getLandEmblem(){
    return 'PANDA'
}

// Retrieving EMBLEM encrypted
function getSpaceEmblemEncrypted(){
    return 'NVYPSSH'
}

function getIceEmblemEncrypted(){
    return 'THTTVAO'
}

function getAirEmblemEncrypted(){
    return 'RZO'
}

function getLandEmblemEncrypted(){
    return 'UFSIF'
}

function getFireEmblemEncrypted(){
    return 'JXGMUT'
}

function getWaterEmblemEncrypted(){
    return 'VJAVWBZ'
}

// function to store kingdom and the encrypted message
function kingdom(kingdom, enMessage){
    this.kingdom = kingdom
    this.enMessage = enMessage
}

// Read input from files
// using node



// let dataArray = content.split("\n");
var content;
var kingdomData = [];
var messages = [];
var temp;
function readFile(){
    content =  fs.readFileSync('Input2.txt','utf-8',(err,data) => {
        if(err)
            console.log("Error occured");
    })
}
function dataConversion(){
    kingdomData = content.split('\n')
    for(let i=0; i<kingdomData.length ; i++){    
        temp = kingdomData[i].split(" ")
        messages.push({'Kingdom' : temp.shift(), 'Encypted' : temp.join(" ") })
    }   
}

function operation(){
    for(let obj of Object.values(messages)){
        //console.log(obj.Kingdom)
        if(kingdoms.hasOwnProperty(obj.Kingdom)){
            let currentEmblem = kingdoms[obj.Kingdom]
            //console.log(currentEmblem.emblem.split('')).filter((a) => a.includes(['A', 'E', 'I', 'O', 'U'])))
            // get the length of each emblem
            let emblemLength = currentEmblem.emblem.length
            // console.log(emblemLength)

            // split the emblem into individual characters
            let emblemCharacters =  currentEmblem.emblem.split('')
            // console.log(emblemCharacters)
            
            populateVowelCount(emblemCharacters)
            // let character = emblemCharacters.filter(ele => ele.includes('A') || ele.includes('E') || ele.includes('I') || ele.includes('O') || ele.includes('U'))
            // let individualEncryption = character.map
        }
        else
            console.log("Kingdom not found")
    }
}

function populateVowelCount(emblemString){

    // console.log(emblemString)
    let vowels = 0, consonants = 0;
    if(emblemString.filter(ele => ele.includes('A') || ele.includes('E') || ele.includes('I') || ele.includes('O') || ele.includes('U')))
        vowels++;
    else 
        consonants++;
    console.log(vowels);
    console.log(consonants)
    
    /**
     * Check for vowels
     * Add length to character
     * make comparison 
     * Verify that vowels is repeated more than twice and consonants at least once 
     * print the output
     * 
     *  */        
}
readFile();
dataConversion();
operation();

function arraytoObject(...temp){
    console.log(temp)
    return ({...temp})
}

// console.log(messages)


// const re = new FileReader()
//using JS
// let file = 'Input1.txt'
// let reader = new FileReader();

// reader.onload  = (()=> console.log(reader.result))
// reader.readAsText(file);


// reader.onerror = (() => console.log(reader.error))



// console.log(kingdoms.Air)
