"use strict";

// TIPPY
tippy("[data-tippy-content]");

// AJAX MODAL POWER-UP
function goToTop() {
  window.scrollTo(0, 0);
}

window.addEventListener("DOMContentLoaded", (event) => {
  // ajaxmodal component
  function adjaxModal() {
    let lightbox = $("[tr-ajaxmodal-element='lightbox']");
    let lightboxClose = $("[tr-ajaxmodal-element='lightbox-close']").attr(
      "aria-label",
      "Close Modal"
    );
    let lightboxModal = $("[tr-ajaxmodal-element='lightbox-modal']");
    let cmsLink = "[tr-ajaxmodal-element='cms-link']";
    let cmsPageContent = "[tr-ajaxmodal-element='cms-page-content']";
    let initialPageTitle = document.title;
    let initialPageUrl = window.location.href;
    let focusedLink;

    function updatePageInfo(newTitle, newUrl) {
      lightboxModal.empty();
      document.title = newTitle;
      window.history.replaceState({}, "", newUrl);
    }

    let tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        focusedLink.focus();
        updatePageInfo(initialPageTitle, initialPageUrl);
      },
      onComplete: () => {
        lightboxClose.focus();
      },
    });
    tl.set("body", { overflow: "hidden" });
    tl.set(lightbox, {
      display: "block",
      onComplete: () => lightboxModal.scrollTop(0),
    });
    tl.from(lightbox, { opacity: 0, duration: 0.2 });
    tl.from(lightboxModal, { y: "5em", duration: 0.2 }, "<");

    function keepFocusWithinLightbox() {
      let lastFocusableChild = lightbox
        .find(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )
        .not(":disabled")
        .not("[aria-hidden=true]")
        .last();
      lastFocusableChild.on("focusout", function () {
        lightboxClose.focus();
      });
    }

    $(document).on("click", cmsLink, function (e) {
      focusedLink = $(this);
      initialPageUrl = window.location.href;
      e.preventDefault();
      let linkUrl = $(this).attr("href");
      $.ajax({
        url: linkUrl,
        success: function (response) {
          let cmsContent = $(response).find(cmsPageContent);
          let cmsTitle = $(response).filter("title").text();
          let cmsUrl = window.location.origin + linkUrl;
          updatePageInfo(cmsTitle, cmsUrl);
          lightboxModal.append(cmsContent);
          tl.play();
          keepFocusWithinLightbox();
          goToTop();
          const btnShowMore = document.querySelector("[data-show-more]");
          btnShowMore.addEventListener("click", function (btn) {
            console.log("click");
            document
              .querySelector("[data-cms-other]")
              .classList.toggle("display-none");
            this.classList.toggle("is-click");
          });
        },
      });
    });

    lightboxClose.on("click", function () {
      tl.reverse();
    });
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") tl.reverse();
    });
    $(document).on("click", lightbox, function (e) {
      if (!$(e.target).is(lightbox.find("*"))) tl.reverse();
    });
  }
  adjaxModal();
});

//////

const radioSecteur = document.querySelectorAll("[lb-radio-secteur]");
// On prend les radio Secteur
const solutionsList = document.querySelectorAll("[lb-select-solution]");
// On prend tous les blocks de solutions
const selectSolution = document.querySelector("select[lb-select-solutions]");

const selectSecteur = document.querySelector("select[lb-select-secteur]");
const selectText = document.querySelectorAll("[lb-text-select]");
const btnClearSolution = document.querySelector("[lb-clear-solution]");

// Lorsqu'au moins un radio secteur est cochÃ©
select.addEventListener("change", () => {
  // On prend le secteur qu'il a choisit
  const secteurChoisi = select.value;
  selectSolution.classList.add("display-none");
  btnClearSolution.click();
  solutionsList.forEach((solutions) => {
    // Pour chaque block de solutions
    const solutionName = solutions.getAttribute("lb-select-solution");
    // On prend leur nom de secteur
    if (secteurChoisi !== solutionName) {
      // Si le nom n'est pas le mÃªme il disparait
      solutions.style.display = "none";
    } else {
      // Si le nom est le bon, il apparaÃ®t
      selectSolution.classList.remove("display-none");
      for (let i = select.options.length - 1; i > 0; i--) {
        selectSolution.remove(i);
      }
      const solutionsText = solutions.querySelectorAll("[lb-solution-text]");
      addCMSTextContentToSelect(solutionsText, selectSolution);
    }
  });
});

const addCMSTextContentToSelect = (cmsTexts, select) => {
  cmsTexts.forEach((cmsText) => {
    const option = `<option value="${cmsText.textContent}">${cmsText.textContent}</option>`;
    select.insertAdjacentHTML("beforeend", option);
  });
};

addCMSTextContentToSelect(selectText, selectSecteur);

const selectRegion = document.querySelector("[lb-select-regions]");
const selectCMSText = document.querySelectorAll("[lb-regions-text]");

addCMSTextContentToSelect(selectCMSText, selectRegion);

// FILTER MOBILE
const btnFilterMobile = document.querySelector("[data-filter-mobile]");
const filterDiv = document.querySelector("[data-filter-div]");

btnFilterMobile.addEventListener("click", function () {
  filterDiv.classList.remove("display-none-ld");
  function goToSolution() {
    let element = document.querySelector("#solutions");
    element.scrollIntoView({ behavior: "smooth" });
  }
  goToSolution();
});
