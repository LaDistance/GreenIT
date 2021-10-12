// Structure de données des réponses.
let answers = {
    "commute" : {
        "answer" : "",
        "co2Value" : 0,
    },
};

function bindInput(inputName){
    let radios = document.getElementsByName(inputName);
    
    for(let i = 0; i < radios.length; i++){
        radios[i].onclick = function(){
            let co2value = calculate(inputName);
            // On pousse la réponse dans le JSON des réponses
            answers[inputName] = json(this.value, co2value);

            // On update la valeur du résultat de la question
            var labelReponse = "reponse-"+inputName;
            document.getElementById(labelReponse).innerText = co2value + "g de CO²";
            console.log("Votre nouveau total de C02 est : ", totalCo2());
        }
    }
}

function calculate(questionName){
    let value = 0;
    let radios = document.getElementsByName(questionName);
    let answer = document.querySelector('input[name="'+ questionName + '"]:checked').value;
    switch(questionName){
        case 'commute':
            // Formule à remplir... Calcul de la valeur en co² de la réponse
            // UN EXEMPLE DE CALCUL DE CO2 POUR UNE QUESTION : A REMPLIR POUR LES AUTRES (valeurs bidons)
            switch(answer){
                case 'pied':
                    value = 0;
                    break;
                case 'commun':
                    value = 10;
                    break;
                case 'covoiturage':
                    value = 20;
                    break;
                case 'voiture':
                    value = 50;
                    break;
            }
            break;

        case '2equestion':
            // Formule à remplir... Calcul de la valeur en co² de la réponse
            value = 0;
            break;
    }
    return value;
}


function json(answer, value){
    return {"answer" : answer, "value" : value};
}


function totalCo2(){
    let total = 0;
    for(var key of Object.keys(answers)){
        total += calculate(key);
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
    var content = {"test" : "test"}; // my results object, #TODO : merge answers & conclusion for final results
    var file = new Blob([JSON.stringify(content)], {type: "application/json"});
    
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

