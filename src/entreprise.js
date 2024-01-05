"use strict";

function goToTop() {
  window.scrollTo(0, 0);
}

document
  .querySelectorAll('a[tr-ajaxmodal-element="cms-link"]')
  .forEach(function (element) {
    element.addEventListener("click", function () {
      goToTop();
    });
  });

const btnShowMore = document.querySelector("[data-show-more]");
btnShowMore.addEventListener("click", function (btn) {
  console.log("click");
  document.querySelector("[data-cms-other]").classList.toggle("display-none");
  this.classList.toggle("is-click");
});

// TIPPY
tippy("[data-tippy-content]", {
  theme: "dark",
});
