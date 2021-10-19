let answers = {};
function setup() {
    document.getElementById("buttonid").addEventListener("click", openDialog), document.getElementById("fileid").addEventListener("change", submitForm);
}
function openDialog() {
    document.getElementById("fileid").click();
}
function submitForm(e) {
    var t = new FileReader();
    t.onload = function (e) {
        loadAnswers(e.target.result);
    };
    var n = document.getElementById("fileid").files[0];
    t.readAsText(n);
}
function loadAnswers(e) {
    answers = JSON.parse(e);
    let t = document.getElementsByTagName("span");
    for (let e = 0; e < t.length; e++) {
        let n = t[e].getAttribute("name"),
            o = t[e].getAttribute("id");
        "commute" == n
            ? ["pied", "bus", "covoiturage", "voiture", "metro", "tramway", "TER", "TGV"].includes(o)
                ? (t[e].innerHTML = answers[n].percents[o].toLocaleString())
                : (t[e].innerHTML = answers[n][o].toLocaleString())
            : "avion" == n
                ? ["court", "moyen", "long"].includes(o)
                    ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                    : (t[e].innerHTML = answers[n][o].toLocaleString())
                : "laptop" == n
                    ? ["choixLaptop", "dureeLaptop"].includes(o)
                        ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                        : (t[e].innerHTML = answers[n][o].toLocaleString())
                    : "pc" == n
                        ? ["choixPc", "dureePc"].includes(o)
                            ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                            : (t[e].innerHTML = answers[n][o].toLocaleString())
                        : "smartphone" == n
                            ? ["choixSmartphone", "dureeSmartphone"].includes(o)
                                ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                                : (t[e].innerHTML = answers[n][o].toLocaleString())
                            : "tablette" == n
                                ? ["choixTablette", "dureeTablette"].includes(o)
                                    ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                                    : (t[e].innerHTML = answers[n][o].toLocaleString())
                                : (t[e].innerHTML = "totalCo2" == n ? answers[n].toLocaleString() : answers[n][o].toLocaleString());
    }
}
