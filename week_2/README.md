# 2주차 회고(사실상 3주차)

아코디언 컴포넌트를 만들어보았습니다.
금요일 밤부터 일요일까지 일정이 있어서
3주차과제는 못할 것 같습니다.
지금도 급하게 적고 있느라 내용이 부족할 수 있기에 양해 부탁드립니다.

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
reset.css에서 p태그의 margin설정이 margin-block-end 만 0으로 설정되어있었습니다.

```css
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin-block-end: 0;
}
```

그래서 margin-block-start: 0을 추가해서 임의의 공간이 없어졌습니다.

## button 안에 p 태그를 span으로 변경경
validate HTML을 돌리니 버튼안에 p태그를 사용을 못하게 했기에 span으로 변경했습니다.

## 느낀점

시간이 촉박하니 조금씩 수정하던 과제를 금요일에 거의 벼락치기 하듯이 풀어나가서
아쉬운 점도 많고 그렇습니다.