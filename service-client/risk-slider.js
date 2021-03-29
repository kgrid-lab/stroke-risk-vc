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

function calculateStrokeRisk() {
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


    // Communicate with the object's code running in the knowledge grid to get the patient's risk score
    // and determine if they fall outside the bounds of needed values clarification
    let req = new XMLHttpRequest();
    let scoreFuncUrl = "https://activator-playground.herokuapp.com/chadsvasc/ds/1.0/score";
    req.open("POST", scoreFuncUrl);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
        score = JSON.parse(req.responseText).result;
        document.getElementById("score").innerText = "Your risk score is " + score;
        let req2 = new XMLHttpRequest();
        let needsVCUrl = "https://activator-playground.herokuapp.com/chadsvasc/ds/1.0/needsAc";
        req2.open("POST", needsVCUrl);
        req2.setRequestHeader("Content-Type", "application/json");
        req2.onload = () => {
            let riskCategory = JSON.parse(req2.responseText).result;
            if(riskCategory === "NO") {
                document.getElementById("vc-slider").style.display = "none";
                document.getElementById("recommend-none").style.display = "block";
                document.getElementById("recommend-always").style.display = "none";
            } else if(riskCategory === "YES") {
                document.getElementById("vc-slider").style.display = "none";
                document.getElementById("recommend-none").style.display = "none";
                document.getElementById("recommend-always").style.display = "block";
            } else {
                document.getElementById("vc-slider").style.display = "block";
                document.getElementById("recommend-none").style.display = "none";
                document.getElementById("recommend-always").style.display = "none";
            }
        }
        req2.send(score)
    }
    req.send(JSON.stringify(patient))
}

// Get the final bleeding vs stroke risk value that is used to move the arrow using the slider input
document.getElementById("strokerisk").addEventListener("change",
    () => {
        let patientPref = document.getElementById("strokerisk").value;
        let risk = 50;
        let req = new XMLHttpRequest();
        let riskFuncUrl = "https://activator-playground.herokuapp.com/chadsvasc/ds/1.0/risk";
        req.open("POST", riskFuncUrl);
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = () => {
            risk = JSON.parse(req.responseText).result;
            document.getElementById("output").style.left = 2*risk + 'px';
        }
        req.send("{\"preference\": " + patientPref + ", \"score\": " + score + "}");
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
