function getDiscountedPrice(originalPrice, discountPercent) {
  if (typeof discountPercent === "string") {
    discountPercent = parseInt(discountPercent);
  }

  return originalPrice * (1 - discountPercent / 100);
}

const originalPrice = 18700;
const discountPercent = "20%";

console.log("판매가: " + originalPrice);
console.log("할인율: " + discountPercent);
console.log("최종가: " + getDiscountedPrice(originalPrice, discountPercent));
