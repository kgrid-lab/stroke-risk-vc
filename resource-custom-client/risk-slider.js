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

// Frontend code

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
    document.getElementById("vc-slider").setAttribute("score", score);
    document.getElementById("score").innerText = "Your risk score is " + score;
    if(needsAc(score) === "NO") {
        document.getElementById("vc-slider").style.display = "none";
        document.getElementById("recommend-none").style.display = "block";
        document.getElementById("recommend-always").style.display = "none";
    } else if(needsAc(score) === "YES") {
        document.getElementById("vc-slider").style.display = "none";
        document.getElementById("recommend-none").style.display = "none";
        document.getElementById("recommend-always").style.display = "block";
    } else {
        document.getElementById("vc-slider").style.display = "block";
        document.getElementById("recommend-none").style.display = "none";
        document.getElementById("recommend-always").style.display = "none";
    }

}

// Get the final bleeding vs stroke risk value that is used to move the arrow using the slider input
document.getElementById("strokerisk").addEventListener("change",
    () => {
        let patientPref = document.getElementById("strokerisk").value;
        let risk = getRiskFunction()(patientPref, score);
        document.getElementById("output").style.left = 2*risk + 'px';
    });


// Fancy info showing
function showInfo() {
    let infoButton = document.getElementById('info-button');
    let infoBox = document.getElementsByClassName('info')[0];
    if(infoButton.getAttribute('value') === 'Info') {
        infoBox.classList.add('slidein');
        infoBox.classList.remove('slideout');
        infoButton.setAttribute('value', 'Hide Info');
    } else {
        infoBox.classList.add('slideout');
        infoBox.classList.remove('slidein');
        infoButton.setAttribute('value', 'Info');
    }
}