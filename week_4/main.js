document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  tl.from(".banner__title", { y: -80 })
    .from(".banner__description", { opacity: 0, y: 20 }, "<-0.2")
    .from(".banner__link", { opacity: 0, y: 20 }, "<-0.2")
    .from(".banner__image", { opacity: 0, y: 20, stagger: 0.2 }, "<-0.2");
});