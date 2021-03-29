let patient = {
    age: 50,
    female: false,
    chf: false,
    diabetes: false,
    hypertension: false,
    stroke: false,
    vasc: false
}
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

    let score = generateScore(patient)
    document.getElementById("score").innerText = "Your risk score is " + score;

    // Send the score to the two widgets by changing their 'score' attribute
    document.getElementById("vc-slider").setAttribute("score", score);
    document.getElementById("vc-slider2").setAttribute("score", score);
}

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
