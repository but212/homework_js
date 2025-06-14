const jaeyeong = {
  regName: "재영",
  age: 18,
};

const jia = {
  regName: "지아",
  age: 19,
};

const canSellAlcohol = (registrationCard) => registrationCard.age >= 19;

function printCanBuyAlcohol(registrationCard) {
  console.log(
    registrationCard.age +
      "살 " +
      registrationCard.regName +
      "(이)는 술을 살 수 있을까?: ",
    canSellAlcohol(registrationCard)
  );
}

printCanBuyAlcohol(jaeyeong);
printCanBuyAlcohol(jia);
