let patient = {
    age: 50,
    female: false,
    chf: false,
    diabetes: false,
    hypertension: false,
    stroke: false,
    vasc: false
}
let score = 0;

// Frontend data transfer code

document.getElementById("strokerisk").addEventListener("change",
    () => {
        let patientPref = document.getElementById("strokerisk").value;
        let risk = 50;
        let req = new XMLHttpRequest();
        let riskFuncUrl = "https://activator-playground.herokuapp.com/chadsvasc/ds/1.0/getRisk";
        req.open("POST", riskFuncUrl);
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = () => {
            risk = JSON.parse(req.responseText).result;
            document.getElementById("output").style.left = 2*risk + 'px';
        }
        req.send("{\"preference\": " + patientPref + ", \"score\": " + score + "}");


    });

function generatePatientProfile() {

    if(document.querySelector("#over65to74").checked) {
        patient.age = 70;
    } else if (document.querySelector("#over74").checked) {
        patient.age = 75;
    } else {
        patient.age = 60;
    }
    patient.female = document.querySelector("#female").checked;
    patient.chf = document.querySelector("#chf").checked;
    patient.diabetes = document.querySelector("#diabetes").checked;
    patient.hypertension = document.querySelector("#hypertension").checked;
    patient.stroke = document.querySelector("#stroke").checked;
    patient.vasc = document.querySelector("#vasc").checked;

    let req = new XMLHttpRequest();
    let scoreFuncUrl = "https://activator-playground.herokuapp.com/chadsvasc/ds/1.0/getScore";
    req.open("POST", scoreFuncUrl);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
        score = JSON.parse(req.responseText).result;
        document.getElementById("score").innerText = "Your risk score is " + score;
    }
    req.send(JSON.stringify(patient))



}