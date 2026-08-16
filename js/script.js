// ------------------------------------------------------------------
// Apoorva Bhardwaj — Developer Portfolio interactions
// ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Placeholder handling for missing images
  document.querySelectorAll(".media-slot img").forEach(function (img) {
    img.addEventListener("error", function () { img.closest(".media-slot").classList.add("missing"); });
    if (img.complete && img.naturalWidth === 0) { img.closest(".media-slot").classList.add("missing"); }
  });

  // Typewriter effect in hero
  var typeEl = document.getElementById("typewriter");
  if (typeEl) {
    var phrases = ["Fullstack Developer", "Python + Django Enthusiast", "UI Craftsman", "Problem Solver"];
    var pIndex = 0, cIndex = 0, deleting = false;
    function tick() {
      var current = phrases[pIndex];
      if (!deleting) {
        cIndex++;
        typeEl.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        cIndex--;
        typeEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }

  // Scroll reveal + skill bar fill
  var revealEls = document.querySelectorAll(".fade-in");
  var skillRows = document.querySelectorAll(".skill-row");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });

    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    skillRows.forEach(function (el) { skillObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
    skillRows.forEach(function (el) { el.classList.add("in-view"); });
  }

  // Project filter
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".project-card");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var filter = chip.getAttribute("data-filter");
      cards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(",");
        card.style.display = (filter === "all" || tags.indexOf(filter) !== -1) ? "" : "none";
      });
    });
  });

  // Custom cursor dot
  var dot = document.querySelector(".cursor-dot");
  if (dot) {
    window.addEventListener("mousemove", function (e) {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
