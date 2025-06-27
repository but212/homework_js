const accordionItems = document.querySelectorAll(".accordion .item");
const CLASS_ACTIVE = "is-active";

accordionItems.forEach((clickedItem) => {
  clickedItem.addEventListener("click", () => {
    const parentAccordion = clickedItem.parentElement;
    const content = clickedItem.nextElementSibling;
    const isCurrentlyExpanded =
      clickedItem.getAttribute("aria-expanded") === "true";

    accordionItems.forEach((item) => {
      if (item !== clickedItem) {
        item.setAttribute("aria-expanded", "false");
        item.parentElement.classList.remove(CLASS_ACTIVE);
        item.nextElementSibling.style.maxHeight = null;
      }
    });

    if (!isCurrentlyExpanded) {
      clickedItem.setAttribute("aria-expanded", "true");
      parentAccordion.classList.add(CLASS_ACTIVE);
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      clickedItem.setAttribute("aria-expanded", "false");
      parentAccordion.classList.remove(CLASS_ACTIVE);
      content.style.maxHeight = null;
    }
  });
});
