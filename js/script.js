// Simpleテーマの基本スクリプト（拡張用）

document.addEventListener("DOMContentLoaded", () => {
  console.log("BASE Simple Theme loaded");

  // ハンバーガーメニュー（SP用）などを追加する場合はここに記述
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }
});
