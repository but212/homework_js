# 5주차

## 계산기 구현

원래는 직접 아이디어를 짜고 구현하는 것이 목적이었는데,
아이디어가 잘 생각이 나지 않아서 계산기 예제를 참고하여 구현하는 것으로
방향을 잡았습니다.

## 구현 계획

계산기 앱을 딱 봤을 때 느낀 것은 각각의 책임을 분리하는 것이 중요하다는 것입니다.
이벤트 핸들링, 계산, 상태 관리를 각각의 함수로 분리해서 처리하도록 하는 것이 목표입니다.

## 구현

### 계산

calculate 함수로 처리하며 룩업 테이블을 사용하여 처리합니다.

```js
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
```

이는 0로 나누는 것을 방지하며 룩업테이블을 통해서 분기 처리를 불리언 연산에서
문자열을 통한 접근연산으로 처리하면서 코드의 가독성을 높였습니다.

### memoObject

이 모듈이 계산기의 상태를 관리하는 역할을 합니다. 이걸 통해 한 페이지에 여러개의 계산기가 있어도
따로관리 할 수 있습니다. 이걸 전역으로 하면 상태관리가 간단해지기는 하지만 한 페이지에 여러개의 계산기가
있는게 따로 코드를 작성하지 않는 이상 힘들기 때문에 변수를 통한 상태관리를 선택했습니다.
그리고 JS의 객체는 레퍼런스 타입이기 때문에 함수 내에서 객체를 변경할 때 함수 외부에서도 변경이
발생합니다. 이제 이벤트 리스너와 연결하면 그 변수는 함수 밖을 벗어나도 계속 이벤트 발생에 의해
변경할 수 있습니다.

계산기의 상태는 다음과 같습니다.

- firstValue: 첫번째 값
- operator: 연산자
- isNewNumber: 새로운 숫자

## 문제점

### 이전에 무슨 키를 눌렀는지 알아야 합니다

계산을 진행해보면 memoObject에 처리에 있어서 사용자가 이전에 어떤 키를 눌렀는지 알아야지
memoObject의 firstValue를 처리함에 있어서 이점이 생깁니다. 만약 이걸 안했을 시 firstValue를
처리함에 있어서 애로사항이 많은데 역시 프로젝트를 만들면 좀 써보면서 이것저것 기능들을
가장 말이 안되는 상황에까지 써봐야 개선점이 보이는것 같습니다. 결론적으로 memoObject에는
previousKeyButtonType를 추가하여 바운더리 케이스에 대한 보강을 해야 합니다.

#### 이걸 통해 해결한 바운더리 케이스

- 연산자가 연속 눌리는 경우 업데이트만

```js
// 메모 오브젝트 전체를 업데이트해서 중복연산이 됨
operator: () => {
  updateMemoObject(memoObject, keyType, keyButtonType);
},

// 이전에 operator를 눌렀다면 operator만 업데이트
operator: () => {
  if (memoObject.previousKeyButtonType === "operator") {
    memoObject.operator = keyType;
    return;
  }
  updateMemoObject(memoObject, keyType, keyButtonType);
},
```

- number일때 첫 값을 초기화할 때도 equal 이후라면 덮어쓰기

```js
// 해당 코드는 equal이후에 지속적으로 number를 눌렀을 때 이전의 firstValue에 숫자가 추가됩니다.
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

// 이를 previousKeyButtonType에 대한 조건만 추가하면 해결할 수 있습니다.
number: () => {
  const previousKeyIsEqual = memoObject.previousKeyButtonType === "equal";
  const previousKeyIsDecimal = memoObject.previousKeyButtonType === "decimal";
  if (
    (memoObject.isNewNumber ||
      display.textContent === "0" ||
      previousKeyIsEqual) &&
    !previousKeyIsDecimal // decimal이면 초기화하지 않음
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
```

### 타입 문제(calculate 함수)

```js
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
```

이 함수를 보면 num1과 num2가 number 타입이어야 한다는 것을 알 수 있습니다.
그러나 memoObject.firstValue와 memoObject.secondValue는 string 타입이기 때문에
연산자가 제가 생각했던 것과는 다르게 작동합니다.

```js
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
```

이렇게 수정하면 연산자가 제대로 작동합니다.

### 연산자 연속 입력

연산자 연속 입력을 처리하기 위해 연산자가 눌렸을 때 firstValue가 0이 아니라면 연산을 수행하도록 수정했습니다.

```js
// 처음에는 memoObject.operator에 keyType을 할당만 하는 것이었지만
operator: () => {
  memoObject.operator = keyType;
  memoObject.isNewNumber = true;
},

// 이전에 누른 키가 숫자인 경우에만 계산을 수행하도록 수정
operator: () => {
  const previousKeyIsOperator =
    memoObject.previousKeyButtonType === "operator";

  if (memoObject.firstValue && memoObject.operator && !previousKeyIsOperator) {
    const result = calculate(
      memoObject.operator,
      memoObject.firstValue,
      display.textContent
    );
    memoObject.firstValue = result;
    updateDisplay(display, memoObject);
  }

  memoObject.operator = keyType;
  memoObject.isNewNumber = true;
},
```

### -는 초기 상태일 때만 음수를 나타내도록 수정

```js
// lookupTableButtonType.number에 추가
if (
  (memoObject.isNewNumber ||
    display.textContent === "0" ||
    previousKeyIsEqual) &&
  !previousKeyIsDecimal &&
  display.textContent !== "-" // 추가
) {
  display.textContent = keyType;
} else {
  display.textContent += keyType;
}

// lookupTableButtonType.operator에 추가
if (display.textContent === "0" && keyType === "minus") {
  display.textContent = "-";
  return;
}
```

## 느낀점

직접 써보면서 많은 것을 알 수 있다는 것을 알았고
사용 케이스에 대한 패턴화를 통해 코드를 작성하는 것이 중요하다는 것을 알았습니다.
14일 부터 17일 까지 예비군을 갑니다. 금요일에 뵙겠습니다.
