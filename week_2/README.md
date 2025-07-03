# 2주차 회고(사실상 3주차)

아코디언 컴포넌트를 만들어보았습니다.

## 아코디언 구조 설계

먼저 아코디언의 구조를 설계했습니다.
원래는

```js
<div class="accordion">
  <p>아이템 1</p>
  <div class="item">
    <button>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7 7L13 1"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="content">내용 1</div>
  </div>
</div>
```

이런 구조 였지만 이건 잘못된 설계였습니다.
p가 item 안쪽에 존재하고 div.content가 item 바깥으로 존재해야지
item을 flex로 구현할 때 예제와 같은 레이아웃이 나오게 됩니다.
그리고 피그마로 실행해봤는데 button을 svg에 국한시키면
안되고 그 아코디언 전체가 버튼이더라고요.
그래서 이렇게 수정했었습니다.

```js
<div class="accordion">
  <button type="button" class="item">
    <p class="title">
      텍스트 바꾸기 좋은 피그마 플러그인은 뭐가 있을까요? 추천 해주세요.
    </p>
    <img class="arrow" src="./images/arrow-down.svg" alt="열기 버튼" />
  </button>
  <div class="content">
    font replacer를 사용해 보세요. 미리보기 기능을 지원해서 편의성 짱짱짱입니다.
  </div>
</div>
```

이 구조에서는 item이 버튼으로 작동하며 title과 arrow가 flex,
space-between으로 정렬됩니다. 그리고 content는 item 바깥으로
위치해 accordion이 is-active될때 block이 되도록 설정했습니다.

## reset.css 문제

p.title의 위에 임의의 margin이 생겼고 이는 p태그의 기본값 때문입니다.
[A More Modern CSS Reset](https://piccalil.li/blog/a-more-modern-css-reset/)의 내용으로
reset.css를 수정했습니다.

## button 안에 p 태그를 span으로 변경

validate HTML을 돌리니 버튼안에 p태그를 사용을 못하게 했기에 span으로 변경했습니다.

## 접근성 문제

스크린 리더 사용자가 버튼에 접근할 때 지금 아코디언이 열려있는지 닫혀있는지 알 수 있도록 하고 싶었습니다. 이 문제는 AI에게 물어봤는데 aria-expanded와 aria-controls="[콘텐츠 ID]"를 사용하면 해결할 수 있다고 했습니다. 그리고 각 아코디언에 id를 부여하고 main.js를 바뀐 코드에 맞춰서 수정하게 했습니다.

```html
<!-- 구버전 -->
<div class="accordion">
  <button type="button" class="item">
    <span class="title">
      텍스트 바꾸기 좋은 피그마 플러그인은 뭐가 있을까요? 추천 해주세요.
    </span>
    <img class="arrow" src="./images/arrow-down.svg" alt="" />
  </button>
  <div class="content">
    font replacer를 사용해 보세요. 미리보기 기능을 지원해서 편의성 짱짱짱입니다.
  </div>
</div>

<!-- 신버전 -->
<div class="accordion">
  <button
    type="button"
    class="item"
    aria-expanded="false"
    aria-controls="accordion-panel-1"
  >
    <span class="title">
      텍스트 바꾸기 좋은 피그마 플러그인은 뭐가 있을까요? 추천 해주세요.
    </span>
    <img class="arrow" src="./images/arrow-down.svg" alt="" />
  </button>
  <div class="content" id="accordion-panel-1" role="region">
    font replacer를 사용해 보세요. 미리보기 기능을 지원해서 편의성 짱짱짱입니다.
  </div>
</div>
```

## 느낀점

조금씩 수정하던 과제였는데 여러가지 문제가 발생했고
이것을 풀어가는 과정에서 힘들었지만 뿌듯하게 풀어나갔습니다.
