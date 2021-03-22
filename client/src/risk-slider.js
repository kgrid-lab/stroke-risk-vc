let patient = {
    age: 50,
    female: false,
    chf: false,
    diabetes: false,
    hypertension: false,
    stroke: false,
    vasc: false,
}
let score = 0;

// Frontend data transfer code

document.getElementById("strokerisk").addEventListener("change",
    () => {
        let risk = getStrokeRiskFunction()(document.getElementById("strokerisk").value, score);
        document.getElementById("output").style.left = 2*risk + 'px';
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

    score = generateScore(patient)
    document.getElementById("score").innerText = "Your risk score is " + score;

}