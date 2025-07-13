function init(
  calculator,
  memoObject = {
    firstValue: "",
    operator: "",
    isNewNumber: true,
    previousKeyButtonType: "",
  }
) {
  const display = calculator.querySelector(".calculator__display");
  const keys = calculator.querySelector(".calculator__keys");

  keys.addEventListener("click", (event) => {
    const key = event.target.closest("button");
    if (!key) {
      return;
    }

    const keyType = key.dataset.key;
    const keyButtonType = key.dataset.buttonType;
    const lookupTableButtonType = {
      number: () => {
        const previousKeyIsEqual = memoObject.previousKeyButtonType === "equal";
        if (
          memoObject.isNewNumber ||
          display.textContent === "0" ||
          previousKeyIsEqual
        ) {
          display.textContent = keyType;
        } else {
          display.textContent += keyType;
        }
        memoObject.isNewNumber = false;

        if (!memoObject.operator || previousKeyIsEqual) {
          memoObject.firstValue = display.textContent;
        }
      },
      decimal: () => {
        if (!display.textContent.includes(".")) {
          display.textContent += ".";
        }

        if (!memoObject.operator) {
          memoObject.firstValue = display.textContent;
        }
      },
      operator: () => {
        memoObject.operator = keyType;
        memoObject.isNewNumber = true;
      },
      clear: () => {
        memoObject.firstValue = "0";
        memoObject.operator = "";
        memoObject.isNewNumber = true;
        updateDisplay(display, memoObject);
      },
      equal: () => {
        if (!memoObject.operator) {
          return;
        }
        const result = calculate(
          memoObject.operator,
          memoObject.firstValue,
          display.textContent
        );

        memoObject.firstValue = result;
        memoObject.operator = "";
        memoObject.isNewNumber = true;
        updateDisplay(display, memoObject);
      },
    };

    lookupTableButtonType[keyButtonType]();
    memoObject.previousKeyButtonType = keyButtonType;
  });

  return memoObject;
}



function updateDisplay(display, memoObject) {
  display.textContent = memoObject.firstValue;
}

function calculate(operator, num1, num2) {
  const floatNum1 = parseFloat(num1);
  const floatNum2 = parseFloat(num2);
  const lookupTable = {
    plus: (num1, num2) => num1 + num2,
    minus: (num1, num2) => num1 - num2,
    times: (num1, num2) => num1 * num2,
    divide: (num1, num2) => {
      if (num2 === 0) {
        return "Error";
      }
      return num1 / num2;
    },
  };

  return lookupTable[operator](floatNum1, floatNum2);
}
