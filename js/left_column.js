document.addEventListener("DOMContentLoaded", function () {
  const leftCol = document.querySelector(".left_column");
  if (!leftCol) return;

  const startY =
    leftCol.getBoundingClientRect().top +
    window.pageYOffset -
    document.documentElement.clientTop;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= startY) {
      leftCol.classList.add("is-fixed");
    } else {
      leftCol.classList.remove("is-fixed");
    }
  });
});