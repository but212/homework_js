document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    // 타임라인에 포함된 트윈 애니메이션 공통 설정
    defaults: { opacity: 0, y: 20, duration: 0.4 },
  });

  tl.from(".banner__title", { y: -80, duration: 0.8 })
    .from(".banner__description", {}, "-=0.3")
    .from(".banner__link", {}, "-=0.3")
    .from(".banner__image", { stagger: 0.1 }, "-=0.3");
});
