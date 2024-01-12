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

// MODAL COQUILLE
const btnCoquille = document.querySelector(".btn_coquille--fs7-2");
const modalCoquille = document.querySelector("[modal-coq]");
const modalOverlay = document.querySelector(".modal_overlay");
const modalClose = document.querySelector(".modal_close_btn--bm0-1--br3");

const actionModal = function () {
  modalCoquille.classList.toggle("display-none");
  if (modalCoquille.classList.contains("display-none")) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }
};

btnCoquille.addEventListener("click", actionModal);
modalOverlay.addEventListener("click", actionModal);
modalClose.addEventListener("click", actionModal);
