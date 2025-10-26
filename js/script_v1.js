
document.addEventListener("DOMContentLoaded", function () {
  // =========================================================
  // ① カテゴリーヘッダー出力
  // =========================================================
  const titleEl = document.querySelector(".category-title");
  const subListEl = document.querySelector(".subcategory-list");
  const currentUrl = window.location.pathname.replace(/\/$/, "");

  if (titleEl && subListEl) {
    const allLinks = Array.from(document.querySelectorAll("#appsItemCategoryTag a"));
    const currentLink = allLinks.find(a => a.getAttribute("href")?.includes(currentUrl));

    if (currentLink) {
      titleEl.textContent = currentLink.textContent.trim();
      const currentLi = currentLink.closest("li");
      const lowerChild = currentLi?.querySelector(".appsItemCategoryTag_lowerchild");

      // ✅ 第一階層 or 第二階層を判定
      const isParentCategory = currentLink.closest("#appsItemCategoryTag > .appsItemCategoryTag_child");
      const isChildCategory = currentLink.closest(".appsItemCategoryTag_lowerchild");

      if (isParentCategory && lowerChild && lowerChild.querySelectorAll("li").length > 0) {
        // ✅ 第一階層（親）の場合のみ子カテゴリを表示
        const clone = lowerChild.cloneNode(true);
        subListEl.replaceWith(clone);
        clone.classList.add("subcategory-list");
      } else if (isChildCategory) {
        // ✅ 第二階層（子）の場合は ul を削除（タイトルだけ）
        subListEl.remove();
      } else {
        // ✅ その他（親でも子でもない）はデフォルト処理
        const parentLower = currentLi?.closest(".appsItemCategoryTag_lowerchild");
        const parentUl = parentLower?.closest(".appsItemCategoryTag_child")?.querySelector(".appsItemCategoryTag_lowerchild");

        if (parentUl && parentUl.querySelectorAll("li").length > 0) {
          const clone = parentUl.cloneNode(true);
          subListEl.replaceWith(clone);
          clone.classList.add("subcategory-list");
        } else {
          subListEl.remove();
        }
      }
    }
  }

  // =========================================================
  // ② ドロップダウンメニュー制御（PC + SP両対応）
  // =========================================================

  function setupDropdowns(scopeSelector) {
    const scope = document.querySelector(scopeSelector);
    if (!scope) return;

    const parents = scope.querySelectorAll(":scope > .appsItemCategoryTag_child");

    parents.forEach(parent => {
      const link = parent.querySelector(":scope > a");
      const submenu = parent.querySelector(":scope > .appsItemCategoryTag_lowerchild");

      if (submenu && link && !link.querySelector(".dropdown-arrow")) {
        // ▼追加
        const arrow = document.createElement("span");
        arrow.textContent = " ▼";
        arrow.classList.add("dropdown-arrow");
        link.appendChild(arrow);

        // ▼クリックで開閉
        arrow.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          submenu.classList.toggle("open");
          parent.classList.toggle("open");
        });
      }
    });
  }

  // --- PC用ナビに実行
  setupDropdowns("header #appsItemCategoryTag");

  // --- SPナビ（非表示→動的表示）にも対応
  setupDropdowns(".sp-nav #appsItemCategoryTag");

  // --- スマホメニュー開閉を監視（開かれた瞬間にも再実行）
  const observer = new MutationObserver(() => {
    setupDropdowns(".sp-nav #appsItemCategoryTag");
  });

  const spNav = document.querySelector(".sp-nav");
  if (spNav) {
    observer.observe(spNav, { childList: true, subtree: true });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".sp-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      menuBtn.classList.toggle("active");
    });
  }
});


$(window).on("load", function () {
  const $main = $(".slider-for");
  const $nav = $(".slider-nav");

  $main.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    centerMode: true,
    centerPadding: "10%",
    asNavFor: ".slider-nav",
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false, // 両端見せない
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  });

  $nav.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    focusOnSelect: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  });

  $nav.on("setPosition", function () {
    const $track = $nav.find(".slick-track");
    $track.css({
      transform: "translate3d(0, 0, 0)",
      justifyContent: "center",
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const parents = document.querySelectorAll("#appsItemCategoryTag > .appsItemCategoryTag_child");

  parents.forEach(parent => {
    const link = parent.querySelector("a");
    const submenu = parent.querySelector(".appsItemCategoryTag_lowerchild");

    if (submenu && link) {
      // ▼（開閉ボタン）を追加
      const arrow = document.createElement("span");
      arrow.textContent = " ▼";
      arrow.classList.add("dropdown-arrow");
      link.appendChild(arrow);

      // ▼クリック時
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        submenu.classList.toggle("open");
      });

      // 親リンククリック
      link.addEventListener("click", (e) => {
        if (e.target === arrow) return;
      });
    }
  });
});
