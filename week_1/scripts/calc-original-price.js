const TAX_RATIO = 0.033; // 3.3%

const calculateOriginalPrice = function (priceWithTax) {
  return priceWithTax / (1 + TAX_RATIO);
};

console.log(calculateOriginalPrice(10000));
