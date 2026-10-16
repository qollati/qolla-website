(function () {
  "use strict";
  var key = "qolla-website-theme";
  var root = document.documentElement;
  function readSaved() { try { var v = localStorage.getItem(key); return v === "day" || v === "night" ? v : null; } catch (e) { return null; } }
  function preferred() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"; }
  var saved = readSaved();
  var mode = saved || preferred();
  function apply(value) {
    root.dataset.theme = value;
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var next = value === "day" ? "Night" : "Day";
      button.textContent = "Switch to " + next + " mode";
      button.setAttribute("aria-label", "Switch to " + next + " mode");
    });
  }
  apply(mode);
  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      mode = mode === "day" ? "night" : "day";
      try { localStorage.setItem(key, mode); } catch (e) {}
      apply(mode);
    });
  });
  if (!saved && window.matchMedia) {
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    var update = function (event) { if (!readSaved()) { mode = event.matches ? "night" : "day"; apply(mode); } };
    if (mql.addEventListener) mql.addEventListener("change", update);
  }
})();