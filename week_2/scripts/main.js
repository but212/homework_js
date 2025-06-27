const accordionItems = document.querySelectorAll('.accordion .item');

accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    const accordion = item.parentElement;

    document.querySelectorAll('.accordion').forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.classList.remove('is-active');
      }
    });

    accordion.classList.toggle('is-active');
  });
});
