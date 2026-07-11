(function () {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const requestedTheme = new URLSearchParams(window.location.search).get("theme");
  let storedTheme = null;

  try {
    storedTheme = localStorage.getItem("portfolio-theme");
  } catch (_error) {
    storedTheme = null;
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#222b2d" : "#f4f1e9");
    }

    if (toggle) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      toggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    }
  }

  const initialTheme =
    requestedTheme === "light" || (requestedTheme !== "dark" && storedTheme === "light") ? "light" : "dark";

  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

      try {
        localStorage.setItem("portfolio-theme", nextTheme);
      } catch (_error) {
        // The theme still changes for this page when persistent storage is unavailable.
      }

      applyTheme(nextTheme);
    });
  }
})();
