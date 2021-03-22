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