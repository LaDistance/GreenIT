let answers = {};
function setup() {
    document.getElementById('buttonid').addEventListener('click', openDialog);
    var fileInput = document.getElementById('fileid');
    fileInput.addEventListener('change', submitForm);
    
}

function openDialog() {
    document.getElementById('fileid').click();
}
function submitForm(event) {
    var reader = new FileReader();
    reader.onload = function(event){
        console.log("Text : ", reader.result);
        loadAnswers(event.target.result);
        
    }
    var file = document.getElementById('fileid').files[0];
    console.log("File : ", file);
    reader.readAsText(file);
    
}
function loadAnswers(jsonString){
    answers = JSON.parse(jsonString);
    let spans = document.getElementsByTagName("span");
    console.log("spans : ", spans);
    logAnswers();
    for(let i=0; i<spans.length; i++){

        let name = spans[i].getAttribute("name");
        let id = spans[i].getAttribute("id");

        if(name=="commute"){
            console.log("Span element -- name : " + name + " || id : " + id);
            if(["pied", "bus", "covoiturage", "voiture", "metro", "tramway", "TER", "TGV"].includes(id)){
                console.log("id in percents list");
                spans[i].innerHTML = answers[name]["percents"][id];
                console.log("Changed span with id : " + id + " to : ", answers[name]["percents"][id]);
            }
            else{
                spans[i].innerHTML = answers[name][id];
                console.log("Changed span with id : " + id + " to : ", answers[name][id]);
            }
        }
        else if(name=="avion"){
            if(["court", "moyen", "long"].includes(id)){
                console.log("id in categories list");
                spans[i].innerHTML = answers[name]["answers"][id];
                console.log("Changed span with id : " + id + " to : ", answers[name]["answers"][id]);
            }
            else{
                spans[i].innerHTML = answers[name][id];
                console.log("Changed span with id : " + id + " to : ", answers[name][id]);
            }
        }
        else if(name=="totalCo2"){
            spans[i].innerHTML = answers[name];
            console.log("Changed span with name : " + name + " to : ", answers[name]);
        }
        else{
            spans[i].innerHTML = answers[name][id];
            console.log("Changed span with id : " + id + " to : ", answers[name][id]);
        }

    }
}

function logAnswers(){
    console.log("Answers : ", answers);
}