const carousel = document.querySelector(".carousel");
const carouselControls = carousel.querySelector(".carousel__controls");
const carouselPrevButton = carouselControls.querySelector(
  ".carousel__prev__button"
);
const carouselNextButton = carouselControls.querySelector(
  ".carousel__next__button"
);
const carouselIndicator = carouselControls.querySelector(
  ".carousel__indicator"
);
const carouselIndicatorButtons = carouselIndicator.querySelectorAll("button");
const carouselBody = carousel.querySelector(".carousel__body");
const carouselContainer = carouselBody.querySelector(".carousel__container");
const carouselContents = carouselContainer.querySelector(".carousel__contents");
const carouselContent = carouselContents.querySelectorAll(".carousel__content");
const carouselContentCount = carouselContent.length;
const carouselContentWidth =
  getComputedStyle(carousel).getPropertyValue("--width");
const CLASS_SELECTED = "is-selected";
let carouselCurrentIndex = 0;

/**
 * 지정된 인덱스의 콘텐츠를 표시하도록 캐러셀을 업데이트합니다
 * @param {Number} newIndex - 표시할 캐러셀 항목의 인덱스
 */
function updateCarousel(newIndex) {
  const newTransform = -newIndex * Number.parseFloat(carouselContentWidth);
  carouselContents.style.setProperty(
    "transform",
    "translateX(" + newTransform + "px)"
  );

  carouselIndicatorButtons[carouselCurrentIndex].classList.remove(
    CLASS_SELECTED
  );
  carouselContent[carouselCurrentIndex].classList.remove(CLASS_SELECTED);
  carouselIndicatorButtons[newIndex].classList.add(CLASS_SELECTED);
  carouselContent[newIndex].classList.add(CLASS_SELECTED);

  carouselCurrentIndex = newIndex;

  carouselContent.forEach((content) => {
    const link = content.querySelector("a");
    if (content.classList.contains(CLASS_SELECTED)) {
      link.setAttribute("tabindex", "0");
    } else {
      link.setAttribute("tabindex", "-1");
    }
  });

  if (newIndex === 0) {
    carouselPrevButton.classList.add("is-unactive");
    carouselPrevButton.children[0].setAttribute(
      "src",
      "./assets/prev-button-arrow-black.svg"
    );
    carouselPrevButton.setAttribute("aria-disabled", "true");
    carouselPrevButton.setAttribute("tabindex", "-1");
  } else {
    carouselPrevButton.classList.remove("is-unactive");
    carouselPrevButton.children[0].setAttribute(
      "src",
      "./assets/prev-button-arrow-white.svg"
    );
    carouselPrevButton.setAttribute("aria-disabled", "false");
    carouselPrevButton.setAttribute("tabindex", "0");
  }

  if (newIndex >= carouselContentCount - 1) {
    carouselNextButton.classList.add("is-unactive");
    carouselNextButton.children[0].setAttribute(
      "src",
      "./assets/next-button-arrow-black.svg"
    );
    carouselNextButton.setAttribute("aria-disabled", "true");
    carouselNextButton.setAttribute("tabindex", "-1");
  } else {
    carouselNextButton.classList.remove("is-unactive");
    carouselNextButton.children[0].setAttribute(
      "src",
      "./assets/next-button-arrow-white.svg"
    );
    carouselNextButton.setAttribute("aria-disabled", "false");
    carouselNextButton.setAttribute("tabindex", "0");
  }
}

/**
 * 캐러셀을 초기화합니다
 * @param {Number} index - 초기화할 캐러셀 항목의 인덱스
 */
function init(index) {
  updateCarousel(index);

  carouselPrevButton.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("is-unactive")) {
      return;
    }
    updateCarousel(carouselCurrentIndex - 1);
  });

  carouselNextButton.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("is-unactive")) {
      return;
    }
    updateCarousel(carouselCurrentIndex + 1);
  });

  carouselIndicatorButtons.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("is-selected")) {
        return;
      }
      updateCarousel(index);
    });
  });
}
