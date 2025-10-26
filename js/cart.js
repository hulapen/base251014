document.addEventListener('DOMContentLoaded', function () {
  const ulMain  = document.querySelector('#slideImg');        // メインUL（既存）
  const ulThumb = document.querySelector('#slideImgPager');   // サムネUL（既存）
  if (!ulMain || !ulThumb) return;

  // 既存<li style="display:none">解除
  ulMain.querySelectorAll('li[style]').forEach(li => li.removeAttribute('style'));

  // ===== メイン側を Swiper 化 =====
  // <div class="swiper swiper-main"><div class="swiper-wrapper">…</div></div> に仕立てる
  ulMain.classList.add('swiper-wrapper');
  ulMain.querySelectorAll('li').forEach(li => li.classList.add('swiper-slide'));
  const mainWrap = document.createElement('div');
  mainWrap.className = 'swiper swiper-main';
  ulMain.parentNode.insertBefore(mainWrap, ulMain);
  mainWrap.appendChild(ulMain);

  // ===== サムネ側を Swiper 化 =====
  ulThumb.classList.add('swiper-wrapper');
  ulThumb.querySelectorAll('li').forEach(li => li.classList.add('swiper-slide'));
  // a href="" の既定クリックを殺す（ページトップに飛ぶのを防止）
  ulThumb.querySelectorAll('a').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  const thumbsWrap = document.createElement('div');
  thumbsWrap.className = 'swiper swiper-thumbs';
  ulThumb.parentNode.insertBefore(thumbsWrap, ulThumb);
  thumbsWrap.appendChild(ulThumb);

  // ===== Swiper 初期化（同期）=====
  const thumbs = new Swiper('.swiper-thumbs', {
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: { slidesPerView: 6 },
    },
  });

  const main = new Swiper('.swiper-main', {
    spaceBetween: 10,
    loop: true,
    thumbs: { swiper: thumbs },
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const footCart = document.querySelector(".foot_cart");
  if (!footCart) return;
  if (!location.pathname.includes("/items/")) return;

  // 実際にスクロールしている要素を取得
  const scrollEl = document.scrollingElement || document.documentElement;
  let lastY = scrollEl.scrollTop;

  function getScrollY() {
    return scrollEl.scrollTop;
  }

  function getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
  }

  window.addEventListener(
    "scroll",
    function () {
      const y = getScrollY();
      const scrollHeight = getDocumentHeight();
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (y + clientHeight);

      // --- デバイス別最下部判定
      const width = window.innerWidth;
      let nearBottom = false;
      if (width <= 480) {
        nearBottom = distanceFromBottom < 600; // スマホ
      } else if (width <= 1024) {
        nearBottom = distanceFromBottom < 600; // タブレット
      } else {
        nearBottom = distanceFromBottom < 120; // PC
      }

      const nearTop = y < 100;
      const scrollingDown = y > lastY;

      // --- 最上部は完全非表示
      if (nearTop) {
        footCart.classList.remove("show", "at-bottom", "peek");
        footCart.style.bottom = ""; // ← これ重要：bottom残り防止
        lastY = y;
        return;
      }

      // --- 通常表示
      footCart.classList.add("show");

      // --- ページ最下部（フッターかぶり防止）
      if (nearBottom) {
        footCart.classList.add("at-bottom");
        footCart.classList.remove("peek");
      } else {
        footCart.classList.remove("at-bottom");

        // --- 上スクロールで「ふわっ」
        if (!scrollingDown) {
          footCart.classList.remove("peek");
          void footCart.offsetHeight; // reflow
          footCart.classList.add("peek");
        } else {
          footCart.classList.remove("peek");
        }
      }

      lastY = y;
    },
    { passive: true }
  );
});