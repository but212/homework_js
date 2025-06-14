# 1주차 과제

`변수, 상수 작성`, `함수 작성` 과제를 하게 되었습니다.

## 목차

1. [변수, 상수 작성](#변수-상수-작성)
2. [함수 작성](#함수-작성)
   - [인사말 메시지](#인사말-메시지)
   - [원가 계산](#원가-계산)
   - [술 판매 가능 여부](#술-판매-가능-여부)
   - [할인가 계산](#할인가-계산)
   - [등급 판단](#등급-판단)
3. [과제 후 생각](#과제-후-생각)

## 변수, 상수 작성

![변수, 상수 작성 소스 코드](./scripts/write-const-var.js)

### 분석

변수, 상수 작성은 let과 const로 작성했으며 고유의 컨벤션을 가져야합니다.
자바스크립트에서 관습적으로 따르는 컨벤션을 따르는 것이 좋다고 판단했습니다.

### 변수 작성

변수는 let으로 쓰이며 카멜 케이스로 작성되었습니다.
var는 권장되지 않습니다.

```javascript
let myName = "석정일";
let isLoggedIn = false;
let userAge = 25;
let productPrice = "39,900원";
let commentCount = 12;
let currentPageNumber = 3;
let membershipLevel = "골드";
let isButtonClicked = true;
```

#### 느낀점

변수를 선언하고 사용하는 것은 어렵지 않지만 네이밍 컨벤션은
일반적인 JS 코드와 일치하면 좋기에 따랐습니다. 하지만 개인적으로는
스네이크 케이스가 검색용이성이 더 좋기에 선호해요.

### 상수 작성

상수는 const로 쓰이며 대문자와 언더스코어로 작성되었습니다.

```javascript
const ABSOLUTE_ZERO = "-273.15°C";
const BACKGROUND_COLOR = "#eeeeee";
```

#### 느낀점

상수의 이름이 대문자로 눈에 확 띄어서 아 이거 상수구나 하는 느낌을 받았습니다.
제가 주로 쓰던 rust언어의 상수 네이밍 컨벤션과 비슷하네요.

## 함수 작성

### 분석

함수는 프로그래밍에서 중복되는 코드 조각을 따로 정의해둔 것,
그 이상도 이하도 아니라고 생각합니다. 일반적인 자바스크립트 컨벤션에 맞게
함수명은 카멜케이스 입니다. 분석해서 논리적인 에러는 처리하는 것을 목표로
했습니다

### 인사말 메시지

![인사말 메시지 소스 코드](./scripts/greet-user.js)

#### 분석

유저 네임을 받아 인사말을 뱉는 함수이며 return을 통해 문자열이 반환되도록
구현될 수 있습니다.

#### 구현 결과

```javascript
function greetUser(username) {
  return "안녕하세요 " + username + "님. 좋은 하루되세요!";
}
```

#### 느낀점

사실 이것이 함수의 본질이라고 생각합니다. 적절한 인수를 받아서 적절하게
처리하는 것이 본질이며 간단한 함수라도 이 본질은 가지고 있다고 생각합니다.

### 원가 계산

![원가 계산 소스 코드](./scripts/calc-original-price.js)

#### 분석

세율 3.3%의 세후 가격을 활용해서 세전가격을 리턴하는 함수를
함수 표현식으로 작성해야 합니다.
세율은 입력받을 것이 아니기에 계산이 용이하게 const 실수(real number)로
하드코딩되며 이를 활용해서 세후가격에서 세전가격을 추출해야 합니다.
priceWithTax를 1.033으로 나누면 세전가격이 나올 것입니다.

#### 구현 결과

```javascript
const TAX_RATIO = 0.033; // 3.3%

const calculateOriginalPrice = function (priceWithTax) {
  return priceWithTax / (1 + TAX_RATIO);
};
```

#### 느낀점

이것 또한 너무 간단한 식이지만 TAX_RATIO는 직관적으로 바로
3.3%라고 생각될 수 없기에 주석을 통해 3.3%임을 알리는 것이 좋다고
판단했습니다.

### 술 판매 가능 여부

![술 판매 가능 여부 소스 코드](./scripts/can-sell-alcohol.js)

#### 분석

19세 이상이면 true, 미만이면 false를 반환하는 함수를
화살표 함수로 작성해야 합니다.
if문을 활용하여 19세 미만이면 false를 early return, 그렇지 않은 경우
기본 리턴으로 true가 반환되도록 설정해야 합니다.

#### 구현 결과

```javascript
const canSellAlcohol = (registrationCard) => {
  if (registrationCard < 19) {
    return false;
  }

  return true;
};
```

#### 느낀점

분기문을 사용한 간단한 함수이며 누구나 프로그래밍을 배웠다면
이 정도는 쉽게 만들 수 있을 것입니다.

### 할인가 계산

![할인가 계산 소스 코드](./scripts/get-discounted-price.js)

#### 분석

원래 가격과 할인율을 입력받아 할인된 가격을 반환하는 함수를 만들어야 합니다.
함수 사용자가 할인율을 20으로 쓸지 "20%"로 쓸지 알 수 없기 때문에 이 부분에 대한
처리를 해야합니다. 할인율이 문자열로 들어오면 parseInt를 통해 숫자로 변환하고,
원래 가격에서 할인율을 계산하여 최종 가격을 반환해야 합니다.

#### 구현 결과

```javascript
function getDiscountedPrice(originalPrice, discountPercent) {
  if (typeof discountPercent === "string") {
    discountPercent = parseInt(discountPercent);
  }

  return originalPrice * (1 - discountPercent / 100);
}
```

#### 느낀점

원가격에 할인하는 개념이기에 세전 가격을 반환하는 함수와 계산식이 살짝 달라졌는데
처음에는 조금 헷갈렸습니다. 처음 과제를 보자마자 string 매개변수가 쓰일 수 있다는 것이
먼저 보여서 이것을 처리하는 코드를 넣었습니다.

### 등급 판단

![등급 판단 소스 코드](./scripts/get-grade-with-score.js)

#### 분석

점수를 매개변수로 받아 해당하는 등급과 설명을 반환하는 함수입니다.
87을 매개변수로 전달했다면 아래와 같은 구조체로 반환해야 합니다.

```javascript
{ score: 87, grade: 'B', description: '우수' }
```

100을 초과 0미만의 유효하지 않은 점수를 처리할 수 있어야 합니다.
등급에 해당하는 설명이 미리 정해져 있기에 이를 테이블로 처리해야 합니다.

| 등급 | 설명                 |
| ---- | -------------------- |
| A    | 매우 우수            |
| B    | 우수                 |
| C    | 보통                 |
| D    | 미달, 통과 기준 근접 |
| F    | 낙제                 |

#### 구현 결과

```javascript
function getGradeWithScore(score) {
  if (score < 0 || score > 100) {
    return {
      score: score,
      grade: null,
      description: "유효하지 않은 점수입니다.",
    };
  }

  let currentGrade = "";

  const GRADE_TABLE = {
    A: "매우 우수",
    B: "우수",
    C: "보통",
    D: "미달, 통과 기준 근접",
    F: "낙제",
  };

  if (score >= 90) {
    currentGrade = "A";
  } else if (score >= 80) {
    currentGrade = "B";
  } else if (score >= 70) {
    currentGrade = "C";
  } else if (score >= 60) {
    currentGrade = "D";
  } else if (score >= 0) {
    currentGrade = "F";
  }

  return {
    score: score,
    grade: currentGrade,
    description: GRADE_TABLE[currentGrade],
  };
}
```

#### 느낀점

먼저 유효하지 않은 점수를 똑같은 형식의 객체로 리턴했는데
값의 일관성을 통해 예측가능하고 더욱 안전한 코드를 만들 수 있다고
생각했습니다. 그리고 객체를 테이블로 만들었는데 객체를 문자열로
접근하는 것이 내부적으로 어떻게 작동하는지 모르겠지만 해쉬 테이블과
비슷하다고 느껴져 해쉬 테이블을 사용하듯 등급과 설명을 매칭했습니다.
그리고 점수에 따라 currentGrade에 대입하고 마지막에 리턴하는 식으로
만들었는데 if문 내에서의 early return 보다는 성능이 안좋을 수 있지만
더욱 가독성이 높다고 생각해서 그렇게 작성했습니다.

## 과제 후 생각

다른 언어에서의 기반이 있다보니까 패턴을 익히는데는 어렵지 않았지만
자바스크립트가 아직은 생경하다보니 어색한 점이 많아요. 그래도 HTML을 배울 때보단
더 익숙한 문법과 환경이니까 좀 빠르게 배울 수 있는 것 같아요.
앞으로 배울 것들이 기대가 됩니다. 다음주에 뵙겠습니다~!
