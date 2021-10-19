let answers = {
    commute: { answerKm: 0, percents: { pied: 0, bus: 0, covoiturage: 0, voiture: 0, metro: 0, tramway: 0, TER: 0, TGV: 0 }, co2Value: 0 },
    avion: { answers: { court: 0, moyen: 0, long: 0 }, co2Value: 0 },
    mails: { answer: 0, co2Value: 0 },
    laptop: { answers: { choixLaptop: "Aucun", dureeLaptop: 0 }, co2Value: 0 },
    pc: { answers: { choixPc: "Aucun", dureePc: 0 }, co2Value: 0 },
    smartphone: { answers: { choixSmartphone: "Non", dureeSmartphone: 0 }, co2Value: 0 },
    tablette: { answers: { choixTablette: "Non", dureeTablette: 0 }, co2Value: 0 },
    cloud: { answer: 0, co2Value: 0 },
    totalCo2: 0,
};

var laptop = [{ key: "aucun", nom: "Aucun", production: "0", utilisation: "0" },
{ key: "notebook", nom: "Notebook", production: "282000", utilisation: "2400" },
{ key: "ultrabook", nom: "Ultrabook", production: "264000", utilisation: "4400" },
{ key: "laptop-gamer", nom: "Laptop de gamer", production: "333000", utilisation: "5000" }],
    pc = [{ key: "aucun", nom: "Aucun", production: "0", utilisation: "0" },
    { key: "bureautique", nom: "Bureautique", production: "300000", utilisation: "10000" },
    { key: "pc-gamer", nom: "PC de gamer", production: "411000", utilisation: "15500" }],
    smartphone = [{ key: "non", nom: "Non", production: "0", utilisation: "0" },
    { key: "oui", nom: "Oui", production: "43680", utilisation: "500" }],
    tablette = [{ key: "non", nom: "Non", production: "0", utilisation: "0" },
    { key: "oui", nom: "Oui", production: "83000", utilisation: "1000" }]

function setAllToZero() {
    let e = document.getElementsByTagName("input");
    for (i = 0; i < e.length; i++) e[i].value = 0;
}
function bindInput(e) {
    let t = document.getElementsByName(e);
    for (let n = 0; n < t.length; n++)
        "radio" == t[0].type
            ? (t[n].onclick = function () {
                let t = calculate(e);
                answers[e] = json(this.value, t);
                var n = "reponse-" + e;
                (document.getElementById(n).innerText = t + "g de CO²"), console.log("Votre nouveau total de C02 est : ", totalCo2()), (answers.totalCo2 = totalCo2());
            })
            : "number" == t[0].type &&
            (t[n].onchange = function () {
                let t = calculate(e);
                "commute" == e
                    ? ((elements = document.getElementsByName("commute")),
                        (answers[e] = {
                            answerKm: parseIntOrZero(elements[0].value),
                            percents: {
                                pied: parseIntOrZero(elements[1].value),
                                bus: parseIntOrZero(elements[2].value),
                                covoiturage: parseIntOrZero(elements[3].value),
                                voiture: parseIntOrZero(elements[4].value),
                                metro: parseIntOrZero(elements[5].value),
                                tramway: parseIntOrZero(elements[6].value),
                                TER: parseIntOrZero(elements[7].value),
                                TGV: parseIntOrZero(elements[8].value),
                            },
                            co2Value: t,
                        }),
                        console.log("La consommation pour le trajet est : ", t),
                        console.log("Answers :", answers))
                    : "avion" == e
                        ? ((elements = document.getElementsByName("avion")),
                            (answers[e] = { answers: { court: parseIntOrZero(elements[0].value), moyen: parseIntOrZero(elements[1].value), long: parseIntOrZero(elements[2].value) }, co2Value: t }),
                            console.log("La consommation annuelle pour l'avion est : ", t),
                            console.log("Answers :", answers))
                        : "laptop" == e
                            ? ((elements = document.getElementsByName("laptop")),
                                (answers[e] = { answers: { choixLaptop: (elements[0].value), dureeLaptop: parseIntOrZero(elements[1].value) }, co2Value: t }),
                                console.log("La consommation annuelle pour le laptop est : ", t),
                                console.log("Answers :", answers))
                            : "pc" == e
                                ? ((elements = document.getElementsByName("pc")),
                                    (answers[e] = { answers: { choixPc: (elements[0].value), dureePc: parseIntOrZero(elements[1].value) }, co2Value: t }),
                                    console.log("La consommation annuelle pour le PC est : ", t),
                                    console.log("Answers :", answers))
                                : "smartphone" == e
                                    ? ((elements = document.getElementsByName("smartphone")),
                                        (answers[e] = { answers: { choixSmartphone: (elements[0].value), dureeSmartphone: parseIntOrZero(elements[1].value) }, co2Value: t }),
                                        console.log("La consommation annuelle pour le smartphone est : ", t),
                                        console.log("Answers :", answers))
                                    : "tablette" == e
                                        ? ((elements = document.getElementsByName("tablette")),
                                            (answers[e] = { answers: { choixTablette: (elements[0].value), dureeTablette: parseIntOrZero(elements[1].value) }, co2Value: t }),
                                            console.log("La consommation annuelle pour la tablette est : ", t),
                                            console.log("Answers :", answers))
                                        : ((elements = document.getElementsByName(e)), (answers[e] = json(this.value, t)), console.log("Consommation pour " + e + " : ", t), console.log("Answers : ", answers)),
                    (answers.totalCo2 = totalCo2()),
                    (labelTotal = document.getElementById("totalCo2")),
                    (labelTotal.innerHTML = (Math.round((answers.totalCo2) / 1000)).toLocaleString());
            });
}
function parseIntOrZero(e) {
    let t = parseInt(e);
    return Number.isNaN(t) && (t = 0), t;
}

function changeHiddenInput(hiddenInputId, selectId) {
    const g = document.getElementById(selectId);
    const h = document.getElementById(hiddenInputId);
    h.value = g.value;
    console.log("Changed hidden input : " + hiddenInputId + " to value : " + g.value); 
    console.log("Hidden input name : ", h.name);
    var elements = document.getElementsByName(h.name);
    switch(h.name){
        case 'laptop':
            console.log(elements);
            answers["laptop"] = { answers: { choixLaptop: (elements[0].value), duree: parseIntOrZero(elements[1].value) }, co2Value: calculate("laptop") }
        case 'pc': 
            console.log(elements);
            answers["pc"] = { answers: { choixPc: (elements[0].value), duree: parseIntOrZero(elements[1].value) }, co2Value: calculate("pc") }
        case 'smartphone':
            console.log(elements);
            answers["smartphone"] = { answers: { choixSmartphone: (elements[0].value), duree: parseIntOrZero(elements[1].value) }, co2Value: calculate("smartphone") }
        case 'tablette':
            console.log(elements);
            answers["tablette"] = { answers: { choixTablette: (elements[0].value), duree: parseIntOrZero(elements[1].value) }, co2Value: calculate("tablette") }
    }
    answers["totalCo2"] = totalCo2();
    (labelTotal = document.getElementById("totalCo2")),
    (labelTotal.innerHTML = (Math.round((answers.totalCo2) / 1000)).toLocaleString());
}

function calculate(e) {
    let t = 0;
    console.log("Calculating for : ", document.getElementsByName(e));
    switch (((elements = document.getElementsByName(e)), e)) {
        case "commute":
            let n = parseIntOrZero(elements[0].value);
            console.log(n),
                (t =
                    502 *
                    n *
                    ((parseIntOrZero(elements[1].value) / 100) * 0 +
                        (parseIntOrZero(elements[2].value) / 100) * 104 +
                        (parseIntOrZero(elements[3].value) / 100) * 46 +
                        (parseIntOrZero(elements[4].value) / 100) * 138 +
                        (parseIntOrZero(elements[5].value) / 100) * 2.5 +
                        (parseIntOrZero(elements[6].value) / 100) * 2.2 +
                        (parseIntOrZero(elements[7].value) / 100) * 24.81 +
                        (parseIntOrZero(elements[8].value) / 100) * 1.73)),
                (t = parseInt(t));
            break;
        case "avion":
            t = 258 * parseIntOrZero(elements[0].value) + 187 * parseIntOrZero(elements[1].value) + 152 * parseIntOrZero(elements[2].value);
            break;
        case "mails":
            t = 4 * parseIntOrZero(elements[0].value) * 251;
            break;
        case "cloud":
            t = 2e3 * parseIntOrZero(elements[0].value);
        case "laptop":
            if (elements[0].value == "aucun") {
                t = 0;
                break;
            } 
            else if(elements[0].value == "notebook"){
                t = 282000 + 2400 * parseIntOrZero(elements[1].value);
                break;
            }
            else if(elements[0].value == "ultrabook"){
                t = 264000 + 4400 * parseIntOrZero(elements[1].value);
                break;
            }
            else if(elements[0].value == "laptop-gamer"){
                t = 333000 + 5000 * parseIntOrZero(elements[1].value);
                break;
            }
        case "pc":
            if (elements[0].value == "aucun") {
                t = 0;
                break;
            } 
            else if(elements[0].value == "bureautique"){
                t = 300000 + 10000 * parseIntOrZero(elements[1].value);
                break;
            }
            else if(elements[0].value == "pc-gamer"){
                t = 411000 + 15500 * parseIntOrZero(elements[1].value);
                break;
            }
        case "smartphone":
            if (elements[0].value == "non") {
                t = 0;
                break;
            } 
            else if(elements[0].value == "oui"){
                t = 43680 + 500 * parseIntOrZero(elements[1].value);
                break;
            }
        case "tablette":
            if (elements[0].value == "non") {
                t = 0;
                break;
            } 
            else if(elements[0].value == "oui"){
                t = 83000 + 1000 * parseIntOrZero(elements[1].value);
                break;
            }
    }
    console.log("Returning : ", t);
    return t;
}
function json(e, t) {
    return { answer: e, co2Value: parseInt(t) };
}
function totalCo2() {
    let e = 0;
    for (var t of Object.keys(answers)) e += parseIntOrZero(answers[t].co2Value);
    return e;
}
function getAllUniqueInputNames() {
    var e;
    (inputs = document.getElementsByTagName("input")), (e = []);
    for (var t = 0; t < inputs.length; t++) e.push(inputs[t].name);
    return [...new Set(e)];
}
function writeResultsToFile() {
    console.log(answers);
    var e = new Blob([JSON.stringify(answers)], { type: "text/plain" }),
       t = document.createElement("a");
    (t.style.display = "none"), (t.download = "results.json"), (t.href = URL.createObjectURL(e)), t.click();
}
function bindInputs(e) {
    for (var t of e) bindInput(t), console.log("Bound input : ", t);
}
bindInputs(getAllUniqueInputNames());
