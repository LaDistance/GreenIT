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
                    ? ["choixLaptop", "duree"].includes(o)
                        ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                        : (t[e].innerHTML = answers[n][o].toLocaleString())
                    : "pc" == n
                        ? ["choixPc", "duree"].includes(o)
                            ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                            : (t[e].innerHTML = answers[n][o].toLocaleString())
                        : "smartphone" == n
                            ? ["choixSmartphone", "duree"].includes(o)
                                ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                                : (t[e].innerHTML = answers[n][o].toLocaleString())
                            : "tablette" == n
                                ? ["choixTablette", "duree"].includes(o)
                                    ? (t[e].innerHTML = answers[n].answers[o].toLocaleString())
                                    : (t[e].innerHTML = answers[n][o].toLocaleString())
                                : (t[e].innerHTML = "totalCo2" == n ? Math.round((answers[n])/1000).toLocaleString() : answers[n][o].toLocaleString());
    }
}
