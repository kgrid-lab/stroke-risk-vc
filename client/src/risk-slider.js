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

// Ko below vvv

function generateScore(patient) {
    let score = 0;
    if(patient.age > 65 && patient.age < 75){
        score += 1;
    } else if (patient.age >= 75) {
        score += 2;
    }
    if (patient.female) {
        score += 1;
    }
    if (patient.chf) {
        score += 1;
    }
    if (patient.diabetes) {
        score += 1;
    }
    if (patient.hypertension) {
        score += 1;
    }
    if (patient.stroke) {
        score += 2;
    }
    if (patient.vasc) {
        score += 1;
    }
    return score;
}

function getRiskCoefficient(score) {
    if (score < 3) {
        return 1;
    } else {
        return 2;
    }
}

function getRiskConstant(score) {
    if (score < 5) {
        return 0;
    } else {
        return 50;
    }
}

function getStrokeRiskFunction() {
    return (preference, score) => preference * getRiskCoefficient(score) + parseInt(getRiskConstant(score), 10);
}