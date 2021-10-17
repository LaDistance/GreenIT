// Structure de données des réponses.
let answers = {
    "commute" : {
        "answerKm" : 0,
        "percents" : {
            "pied": 0,
            "bus": 0,
            "covoiturage" : 0,
            "voiture" : 0,
            "metro" : 0,
            "tramway" : 0,
            "TER" : 0,
            "TGV" : 0,
        },
        "co2Value" : 0,
    },
    "avion" : {
        "answers":{
            "court" : 0,
            "moyen" : 0,
            "long" : 0,
        },
        "co2Value": 0,
    },
    "mails":{
        "answer":0,
        "co2Value":0,
    },
    "cloud":{
        "answer":0,
        "co2Value":0,
    },
    "totalCo2" : 0,
};
function setAllToZero(){
    let elements = document.getElementsByTagName("input");
    for(i = 0; i<elements.length; i++){
        elements[i].value = 0;
    }
}
function bindInput(inputName){
    let inputs = document.getElementsByName(inputName);
    
    for(let i = 0; i < inputs.length; i++){
        if(inputs[0].type == "radio"){
            inputs[i].onclick = function(){
                let co2Value = calculate(inputName);
                // On pousse la réponse dans le JSON des réponses
                answers[inputName] = json(this.value, co2Value);
    
                // On update la valeur du résultat de la question
                var labelReponse = "reponse-"+inputName;
                document.getElementById(labelReponse).innerText = co2Value + "g de CO²";
                console.log("Votre nouveau total de C02 est : ", totalCo2());
                answers["totalCo2"] = totalCo2();
            }
        }
        else if(inputs[0].type == "number"){
            inputs[i].onchange = function(){
                let co2Value = calculate(inputName);
                // On pousse la réponse dans le JSON des réponses
                if(inputName == "commute"){
                    elements = document.getElementsByName("commute");
                    answers[inputName] = {
                        "answerKm" : parseIntOrZero(elements[0].value),
                        "percents" : {
                            "pied": parseIntOrZero(elements[1].value),
                            "bus": parseIntOrZero(elements[2].value),
                            "covoiturage" : parseIntOrZero(elements[3].value),
                            "voiture" : parseIntOrZero(elements[4].value),
                            "metro" : parseIntOrZero(elements[5].value),
                            "tramway" : parseIntOrZero(elements[6].value),
                            "TER" : parseIntOrZero(elements[7].value),
                            "TGV" : parseIntOrZero(elements[8].value),
                        },
                        "co2Value" : co2Value,
                    };
                    console.log("La consommation pour le trajet est : ", co2Value);
                    console.log("Answers :",answers);
                }
                else if(inputName=="avion"){
                    elements = document.getElementsByName("avion");
                    answers[inputName]= {
                            "answers":{
                                "court" : parseIntOrZero(elements[0].value),
                                "moyen" : parseIntOrZero(elements[1].value),
                                "long" : parseIntOrZero(elements[2].value),
                            },
                            "co2Value":co2Value,
                        }
                    console.log("La consommation annuelle pour l'avion est : ", co2Value);
                    console.log("Answers :",answers);
                }
                else{
                    elements = document.getElementsByName(inputName);
                    answers[inputName] = json(this.value, co2Value);
                    console.log("Consommation pour " + inputName + " : ", co2Value);
                    console.log("Answers : ",answers);
                }
                answers["totalCo2"] = totalCo2();
            }
        }
        
   }
}

function parseIntOrZero(string){
    let value = parseInt(string);
    if(Number.isNaN(value)){
        value = 0;
    }
    return value;
}
function calculate(questionName){
    let value = 0;
    let radios = document.getElementsByName(questionName);
    elements = document.getElementsByName(questionName);
    switch(questionName){
        case 'commute':
            // Formule à remplir... Calcul de la valeur en co² de la réponse
            // UN EXEMPLE DE CALCUL DE CO2 POUR UNE QUESTION : A REMPLIR POUR LES AUTRES (valeurs bidons)
            
            
            // structure : [nbKm, pied, bus, covoiturage, voiture, metro, tramway, TER]
            
            let nbKm = parseIntOrZero(elements[0].value);
            console.log(nbKm);
            value = 251 * 2 * nbKm * ((parseIntOrZero(elements[1].value) / 100 * 0) + (parseIntOrZero(elements[2].value) / 100 * 104) + (parseIntOrZero(elements[3].value) / 100 * 46) + (parseIntOrZero(elements[4].value) / 100 * 138) + (parseIntOrZero(elements[5].value) / 100 * 2.5) + (parseIntOrZero(elements[6].value) / 100 * 2.2) + (parseIntOrZero(elements[7].value) / 100 * 24.81) + (parseIntOrZero(elements[8].value) / 100 * 1.73));
            value = parseInt(value);
            break;

        case 'avion':
            // Formule à remplir... Calcul de la valeur en co² de la réponse
            value = (parseIntOrZero(elements[0].value) * 258) + (parseIntOrZero(elements[1].value) * 187) + (parseIntOrZero(elements[2].value) * 152);
            break;
        
        case 'mails' :
            value = 251 * (parseIntOrZero(elements[0].value) * 4);
            break;
        case 'cloud':
            value = (parseIntOrZero(elements[0].value) * 2000);
    }
    return value;
}


function json(answer, value){
    return {"answer" : answer, "co2Value" : parseInt(value)};
}


function totalCo2(){
    let total = 0;
    for(var key of Object.keys(answers)){
        total += parseIntOrZero(answers[key]["co2Value"]);
    }
    return total;
}

function getAllUniqueInputNames() {
    var arrayOfInputNames,elmts,L;

    inputs = document.getElementsByTagName("input");
    arrayOfInputNames = [];
    
    for (var i = 0; i < inputs.length; i++) {
        arrayOfInputNames.push(inputs[i].name);
    }
    return [...new Set(arrayOfInputNames)];
}

function writeResultsToFile(){
    // my results object, #TODO : merge answers & conclusion for final results
    var file = new Blob([JSON.stringify(answers)], {type: "text/plain"});
    
    console.log(content);
    
    var hiddenLink = document.createElement('a');
    hiddenLink.style.display = 'none';
    hiddenLink.download = 'results.json';
    hiddenLink.href = URL.createObjectURL(file);
    hiddenLink.click(); 
}

function bindInputs(inputNamesArray){
    for(var name of inputNamesArray){
        bindInput(name);
        console.log("Bound input : ", name);
    }
}

// Main code        

bindInputs(getAllUniqueInputNames());

