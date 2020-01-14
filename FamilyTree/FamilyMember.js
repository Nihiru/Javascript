const fs = require('fs')

let familyTreeData = "";
let familyTreeDataStrip = [];


let establishKingdom = ""
let establishKingdomDataStrip = []
let family = {}

// for every member of the family 
function Member(){
  return this.member = {
       husband: {"name" : '', "gender" :''},
       wife : {"name" : '',"gender": ''},
       children : []
   }
}

function InitSolarSystem(){
    EstablishSolarSystem()
}

function EstablishSolarSystem(){
    establishKingdom = fs.readFileSync('./Input/EstablishPlanet.txt', 'utf-8', (err, data) =>{
        if(err)
           console.log("Error Occured")
    })
    EstablishKingdomDataStrip()
}


function EstablishKingdomDataStrip(){
    // console.log(establishKingdom)
    establishKingdomDataStrip = establishKingdom.split('\n')
    PopulateKingdom()
}

function PopulateKingdom(){
    var galaxy = "", planet = "", protagonists =  [], temp = new Member();
    for(let elements of establishKingdomDataStrip){
        let  individual = (elements.split(','))

        switch(individual[0]){
            case 'ADD_GALAXY'              : galaxy = individual[1].toString().trim();
                                             break;

            case 'ADD_PLANET'              : planet = individual[1].toString().trim(); 
                                             break;

            case 'ADD_FAMILY_HEAD_EMPEROR' : temp.husband = {
                                                        "name" : individual[1].toString().trim(),
                                                        "gender" : individual[2].toString()
                                            }
                                             break;

            case 'ADD_FAMILY_HEAD_QUEEN'   : temp.wife = {
                                                        "name": individual[1].toString().trim(),
                                                        "gender": individual[2].toString()
                                            }           
                                             break;

            default                        : console.log("nothing found");
        }
    }
    
    protagonists.push(temp)
    // console.log(protagonists)
    this.family ={
        // id : "Depth-0",
        galaxy,
        planet,
        protagonists
    }
    // showoff()
    // familyLength()
    ReadFamilyData()
}


function ReadFamilyData(){
    familyTreeData =  fs.readFileSync('./Input/PopulateTree.txt','utf-8',(err,data) => {
        if(err)
            console.log("Error occured");
    })
    FamilyDataStrip()
}

function FamilyDataStrip(){
    familyTreeDataStrip = familyTreeData.split('\n') 
    PopulateTree()   
}

function PopulateTree(){
    // showoff();
    let insideProtagonists = this.family.protagonists
    let individual = []
  
    for(let currentElement of familyTreeDataStrip){
        individual = currentElement.split(",")
        if(individual.includes('ADD_CHILD'))
        {
            let criteria = AddChild(individual, insideProtagonists)
            if(criteria == -1){
            console.log("Family Member cannot be added")
            } else {
           // console.log("Children added successfully")
            }
        }

        else if(currentElement.includes('ADD_SPOUSE')){
            let criteria = AddSpouse(individual, insideProtagonists)
            if(criteria == -1){
            console.log("Family Member cannot be added")
            } else {
              //  console.log("Spouse added successfully")
            }
        }       
    }
    showoff()
}

function AddChild(searchElement, currentFamilyObject){
            currentFamilyObject.forEach(element => { // level 0
                for(let innerElement of Object.values(element)){ // level 1
                        if(innerElement instanceof Array){
                            AddChild(searchElement, innerElement)
                        }
                        else if(innerElement instanceof Object){
                            if(searchElement[1].trim() === innerElement.name.trim()){ // level 2
                                let newMember = Member() // initalizing new member dynamically
                                if(searchElement[3].trim().toLowerCase() === "male"){
                                    newMember.husband.name = searchElement[2]
                                    newMember.husband.gender = searchElement[3]
                                }
                                else {
                                    // console.log("level 2  -- else ")
                                    newMember.wife.name = searchElement[2]
                                    newMember.wife.gender = searchElement[3]
                                }
                                element.children.push(newMember)
                                return true
                            }
                        }   
                        else {
                            return -1;
                        }
                    }
            })
}

function AddSpouse(searchElement, currentFamilyObject){
    // console.log("Parent : ", currentFamilyObject)
    currentFamilyObject.forEach(element => {
        for(let innerElement of Object.values(element)){ // level 1
                if(innerElement instanceof Array){
                    // console.log("Array :", innerElement)
                    AddSpouse(searchElement, innerElement)
                }
                else if(innerElement instanceof Object){
                    // console.log(innerElement.name)
                    if(searchElement[1].trim().toLowerCase() === innerElement.name.trim().toLowerCase()){
                        if(innerElement.gender.trim() === 'male'){
                            element.wife = {
                                "name" : searchElement[2],
                                "gender" : searchElement[3]
                            }
                        }else{
                            element.husband = {
                                "name" : searchElement[2],
                                "gender" : searchElement[3]
                            }
                        }
                        // console.log(element)
                        return true             
                    }       
                }
                else{
                    return -1
                }
            }

    });
}

let FamilyTreeInstance = new InitSolarSystem()

// Utilities
function familyLength(){
    console.log(this.family.length)
}

function showoff(){
    // console.log(this.family)
    console.log(this.family.protagonists[0].children[4].children[2])
}

function getCurrentFunction(fname){
   console.log(`filename ========= >$(fname)`)
}