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
        if (memoObject.isNewNumber || display.textContent === "0") {
          display.textContent = keyType;
          memoObject.isNewNumber = false;
        } else {
          display.textContent += keyType;
        }

        if (!memoObject.operator) {
          updateMemoObject(memoObject, keyType, keyButtonType);
        }
      },
      decimal: () => {
        updateMemoObject(memoObject, keyType, keyButtonType);
        if (
          !isNaN(parseFloat(display.textContent)) &&
          !display.textContent.includes(".")
        ) {
          display.textContent += ".";
          memoObject.isNewNumber = false;
        }
      },
      operator: () => {
        updateMemoObject(memoObject, keyType, keyButtonType);
      },
      clear: () => {
        updateMemoObject(memoObject, keyType, keyButtonType);
        display.textContent = "0";
        memoObject.isNewNumber = true;
        memoObject.operator = "";
        memoObject.firstValue = "";
      },
      equal: () => {
        if (!memoObject.operator) {
          return;
        }
        display.textContent = calculate(
          memoObject.operator,
          memoObject.firstValue,
          display.textContent
        );
        memoObject.isNewNumber = true;
        memoObject.operator = "";
        memoObject.firstValue = display.textContent;
      },
    };

    lookupTableButtonType[keyButtonType]();
    memoObject.previousKeyButtonType = keyButtonType;
  });

  return memoObject;
}

function updateMemoObject(memoObject, keyType, keyButtonType) {
  const lookupTable = {
    number: () => {
      if (memoObject.isNewNumber) {
        memoObject.firstValue = keyType;
        memoObject.isNewNumber = false;
      } else {
        memoObject.firstValue += keyType;
      }
    },
    operator: () => {
      memoObject.operator = keyType;
      memoObject.isNewNumber = true;
    },
    decimal: () => {
      if (!memoObject.firstValue.includes(".")) {
        memoObject.firstValue += ".";
        memoObject.isNewNumber = false;
      }
    },
    clear: () => {
      memoObject.firstValue = "0";
      memoObject.operator = "";
      memoObject.isNewNumber = true;
    },
    "": () => {},
  };

  lookupTable[keyButtonType]();
}

function updateDisplay(display, memoObject) {
  display.textContent = memoObject.firstValue;
}

function calculate(operator, num1, num2) {
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

  return lookupTable[operator](num1, num2);
}
