// Font Awesome lazy-loader
window.addEventListener("load", function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
});

// Hero field-reveal animation
// Text is in the DOM from page load so row heights are always correct — no reflow.
// clip-path wipes each value into view; steps() count is set via inline style
// because CSS custom properties can't be used as arguments to steps().
(function () {
  var fieldCount = 5;
  var msPerChar = 38;
  var gapMs = 150;

  // Immediately reveal everything for users who prefer reduced motion
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    for (var i = 0; i < fieldCount; i++) {
      var row = document.getElementById("hf-row-" + i);
      var val = document.getElementById("hf-val-" + i);
      if (row) row.classList.add("visible");
      if (val) val.style.clipPath = "none";
    }
    var descEl = document.getElementById("hero-desc");
    var ctaEl = document.getElementById("hero-cta");
    if (descEl) descEl.style.opacity = "1";
    if (ctaEl) ctaEl.style.opacity = "1";
    return;
  }

  function revealField(idx, onDone) {
    var row = document.getElementById("hf-row-" + idx);
    var val = document.getElementById("hf-val-" + idx);
    if (!row || !val) {
      setTimeout(onDone, gapMs);
      return;
    }

    var chars = val.textContent.trim().length || 1;
    var duration = chars * msPerChar;

    // Trigger the clip-path animation; steps() requires a static integer so
    // we set the timing function directly on the element rather than in a CSS rule.
    val.style.animationName = "hero-type";
    val.style.animationDuration = duration + "ms";
    val.style.animationTimingFunction = "steps(" + chars + ", end)";
    val.style.animationFillMode = "forwards";

    row.classList.add("visible");
    setTimeout(onDone, duration + gapMs);
  }

  function runNext(idx) {
    if (idx >= fieldCount) {
      // Append blinking cursor after the last revealed value
      var lastVal = document.getElementById("hf-val-" + (fieldCount - 1));
      if (lastVal) {
        var cursor = document.createElement("span");
        cursor.className = "hero-cursor";
        cursor.textContent = "█";
        cursor.setAttribute("aria-hidden", "true");
        lastVal.appendChild(cursor);
      }
      var desc = document.getElementById("hero-desc");
      var cta = document.getElementById("hero-cta");
      if (desc) desc.style.opacity = "1";
      setTimeout(function () {
        if (cta) cta.style.opacity = "1";
      }, 300);
      return;
    }
    revealField(idx, function () {
      runNext(idx + 1);
    });
  }

  // Smooth scroll to #about with a small offset for breathing room
  var readFileLink = document.querySelector('a[href="#about"]');
  if (readFileLink) {
    readFileLink.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.getElementById("about");
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 40,
          behavior: "smooth",
        });
      }
    });
  }

  setTimeout(function () {
    runNext(0);
  }, 400);
})();
