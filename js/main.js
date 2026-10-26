// 상품 데이터로 메인 목록을 만들고 카드 동작을 연결합니다.
"use strict";

(function initializeMainProducts() {

  const catalog = window.NonfictionCatalog;

  const cartUI = window.NonfictionCartUI.initialize();

  function createProductCard(productId, optionId) {

    const product = catalog.getProduct(productId);

    const option = catalog.getOption(product, optionId);

    if (!product || !option) {
      return "";
    }

    const detailUrl = catalog.createDetailUrl(product.id, optionId);

    const hoverImage = option.hoverImage
      ? `<img src="${option.hoverImage}" class="hover-img" alt="" width="2438" height="2438" loading="lazy" />`
      : "";

    return `
      <article class="product-item" data-product-id="${product.id}" data-option-id="${optionId}">
        <div class="img-box">
          <a class="product-image-link" href="${detailUrl}" aria-label="${product.name} ${option.label} 상세보기">
            <img
              src="${option.image}"
              class="default-img"
              alt="${product.name} ${option.label}"
              width="2438"
              height="2438"
              loading="lazy"
            />
            ${hoverImage}
          </a>
          <button class="btn-like" type="button" aria-label="${product.name} 관심 상품에 추가" aria-pressed="false">
            <img src="images/icons/icon_heart.png" alt="" aria-hidden="true" width="15" height="15" />
          </button>
          <button class="btn-cart" type="button" data-add-to-cart>장바구니 담기</button>
        </div>
        <div class="info-box">
          <a class="name" href="${detailUrl}">${product.name}</a>
          <div class="desc">${product.keywords}</div>
          <div class="capacity">${option.label}</div>
          <div class="price">${window.NonfictionCart.formatWon(option.price)}</div>
        </div>
      </article>
    `;
  }

  function renderCollection(containerId, entries) {

    const container = document.querySelector(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = entries
      .map(([productId, optionId]) => createProductCard(productId, optionId))
      .join("");
  }

  renderCollection("#new-product-grid", catalog.collections.newProducts);

  renderCollection("#perfume-product-grid", catalog.collections.perfumes);

  document.addEventListener("click", (event) => {

    const addButton = event.target.closest("[data-add-to-cart]");

    if (addButton) {

      const card = addButton.closest(".product-item");

      const product = catalog.getProduct(card.dataset.productId);

      const optionId = card.dataset.optionId;

      const option = catalog.getOption(product, optionId);

      cartUI.addItem({
        id: product.id,
        name: product.name,
        optionId,
        size: option.label,
        price: option.price,
        image: option.image,
        messageCard: "선택 안 함",
        quantity: 1,
      });

      return;
    }

    const likeButton = event.target.closest(".btn-like");

    if (!likeButton) {
      return;
    }

    const isPressed = likeButton.getAttribute("aria-pressed") === "true";

    const card = likeButton.closest(".product-item");

    const product = catalog.getProduct(card.dataset.productId);

    likeButton.setAttribute("aria-pressed", String(!isPressed));

    likeButton.setAttribute(
      "aria-label",
      `${product.name} ${isPressed ? "관심 상품에 추가" : "관심 상품에서 제거"}`,
    );

    likeButton.classList.toggle("is-active", !isPressed);
  });
})();
