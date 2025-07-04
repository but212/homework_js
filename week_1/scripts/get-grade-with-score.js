function getGradeWithScore(score) {
  if (score < 0 || score > 100 || typeof score !== "number") {
    return {
      score: score,
      grade: null,
      description: "유효하지 않은 점수입니다.",
    };
  }

  const GRADE_TABLE = {
    A: "매우 우수",
    B: "우수",
    C: "보통",
    D: "미달, 통과 기준 근접",
    F: "낙제",
  };

  let currentGrade;

  if (score >= 90) {
    currentGrade = "A";
  } else if (score >= 80) {
    currentGrade = "B";
  } else if (score >= 70) {
    currentGrade = "C";
  } else if (score >= 60) {
    currentGrade = "D";
  } else {
    currentGrade = "F";
  }

  return {
    score: score,
    grade: currentGrade,
    description: GRADE_TABLE[currentGrade],
  };
}

console.log(getGradeWithScore(87));
console.log(getGradeWithScore(100));
console.log(getGradeWithScore(50));
console.log(getGradeWithScore(101));
console.log(getGradeWithScore(-1));
console.log(getGradeWithScore("100"));
