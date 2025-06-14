const canSellAlcohol = (registrationCard) => {
  if (registrationCard < 19) {
    return false;
  }

  return true;
};

console.log("18살 고등학생 재영이는 술을 살 수 있을까: ", canSellAlcohol(18));
console.log("19살 대학새내기 지아는 술을 살 수 있을까: ", canSellAlcohol(19));
