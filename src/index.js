"use strict";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  // Grabbing effect
  var $draggableElement = $("[draggable]"); // replace this selector with your own
  if (window.matchMedia("(pointer: fine)").matches) {
    $draggableElement.on("mousedown", function () {
      $(this).css("cursor", "grabbing");
    });

    // Apply draggable() method to the target element
    $draggableElement.draggable();

    $draggableElement.on("mouseup", function () {
      $(this).css("cursor", "grab");
    });
  }

  // Wrapper les mots dans les textes
  $(".span_wrapper").each(function (index) {
    let relatedEl = $(".span_element").eq(index);
    relatedEl.appendTo($(this));
  });

  function voirPlus() {
    $("[tag-target]").each(function (index) {
      let relatedEl = $("[project-target]").eq(index);
      relatedEl.appendTo($(this));
    });
  }

  voirPlus();

  $("[projet-voir-plus]").on("click", function () {
    voirPlus();
  });

  const matchMediaDesktop = window.matchMedia("(min-width: 767px)");

  function checkBreakpoint(x) {
    if (x.matches) {
      // desktop code here
    } else {
      const swiper = new Swiper(".swiper", {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 1,
        effect: "cards",
      });
    }
  }

  matchMediaDesktop.addListener(checkBreakpoint);
  checkBreakpoint(matchMediaDesktop);
});

$(document).ready(function () {
  // Enregistrez GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Créez une fonction pour l'animation des éléments .item
  function animateItems() {
    // Sélectionnez tous les éléments .item à l'intérieur de la section
    const items = $(".cta_logo_wrap--br1-cm0-2");

    // Sélectionnez la section
    const section = items.closest("section");

    // Masquez les éléments au départ
    gsap.set(items, { scale: 0, opacity: 0 });

    // Créez une timeline pour les animations
    const timeline = gsap.timeline();

    // Ajoutez les animations à la timeline
    timeline.staggerTo(
      items,
      0.2,
      { scale: 1, opacity: 1, ease: "power2.out" },
      0.2
    );
    timeline.pause();

    // Créez un déclencheur de défilement pour la section
    ScrollTrigger.create({
      trigger: section[0], // Utilisez section[0] pour obtenir l'élément DOM réel
      markers: false,
      start: "20% 80%",
      onEnter: () => {
        timeline.play();
      },
      onLeaveBack: () => {
        //
      },
    });
  }

  // Appelez la fonction animateItems pour initialiser l'animation
  animateItems();

  // Créez une fonction pour l'animation des éléments .item
  function animateCollectif() {
    // Sélectionnez tous les éléments .item à l'intérieur de la section
    const items = $("[collectif-photo]");

    // Sélectionnez la section
    const section = items.closest("section");

    // Créez une timeline pour les animations
    const timeline = gsap.timeline();

    // Ajoutez les animations à la timeline
    timeline.staggerFrom(
      items,
      0.2,
      { scale: 0, opacity: 0, ease: "power2.out" },
      0.2
    );
    timeline.pause();

    // Créez un déclencheur de défilement pour la section
    ScrollTrigger.create({
      trigger: section[0], // Utilisez section[0] pour obtenir l'élément DOM réel
      markers: false,
      start: "top center",
      onEnter: () => {
        timeline.play();
      },
    });
  }
  // Appelez la fonction animateItems pour initialiser l'animation
  animateCollectif();

  // Créez une fonction pour l'animation des éléments .item
  function animateOurs() {
    // Sélectionnez tous les éléments .item à l'intérieur de la section
    const items = $("[cta-ours]");

    // Sélectionnez la section
    const section = items.closest("section");

    // Créez une timeline pour les animations
    const timeline = gsap.timeline();

    // Ajoutez les animations à la timeline
    timeline.staggerFrom(
      items,
      0.2,
      { y: "100%", opacity: 1, ease: "power2.out" },
      0.2
    );
    timeline.pause();

    // Créez un déclencheur de défilement pour la section
    ScrollTrigger.create({
      trigger: section[0], // Utilisez section[0] pour obtenir l'élément DOM réel
      markers: false,
      start: "60% 80%",
      onEnter: () => {
        timeline.play();
      },
      onLeaveBack: () => {
        timeline.reverse();
      },
    });
  }
  // Appelez la fonction animateItems pour initialiser l'animation
  animateOurs();
});

$(document).ready(function () {
  $(".w-pagination-previous").hide();
});
