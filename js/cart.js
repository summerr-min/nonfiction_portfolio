// 메인과 상세 페이지의 장바구니 상태를 함께 관리합니다.
"use strict";

(function createSharedCart() {

  // 새로고침 뒤에도 장바구니를 유지하기 위한 저장소 이름입니다.
  const STORAGE_KEY = "nonfiction-demo-cart";

  const listeners = new Set();

  let items = loadItems();

  let uiController = null;

  function formatWon(number) {

    return `${new Intl.NumberFormat("ko-KR").format(number)}원`;
  }

  function clampQuantity(value, maximum = 99) {

    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      return 1;
    }

    return Math.min(Math.max(parsedValue, 1), maximum);
  }

  function loadItems() {

    try {

      const savedItems = window.localStorage.getItem(STORAGE_KEY);

      const parsedItems = savedItems ? JSON.parse(savedItems) : [];

      if (!Array.isArray(parsedItems)) {
        return [];
      }

      return parsedItems.map((item) => {

        const product = window.NonfictionCatalog?.getProduct(item.id);

        const matchedOption = product
          ? Object.entries(product.options).find(
              ([, option]) => option.label === item.size,
            )
          : null;

        return {
          ...item,

          optionId: String(
            item.optionId || matchedOption?.[0] || item.size || "default",
          ),

        };
      });
    } catch (error) {

      console.warn("저장된 장바구니를 읽지 못했습니다.", error);

      return [];
    }
  }

  function saveItems() {

    try {

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {

      console.warn("장바구니를 저장하지 못했습니다.", error);
    }

    listeners.forEach((listener) => listener(getItems()));
  }

  function getItems() {

    return items.map((item) => ({ ...item }));
  }

  function createItemKey(item) {

    const optionId = item.optionId || item.size || "default";

    const messageCard = item.messageCard || "선택 안 함";

    return `${item.id}-${optionId}-${messageCard}`;
  }

  function addItem(item) {

    const normalizedItem = {
      ...item,
      optionId: String(item.optionId || item.size || "default"),
      messageCard: item.messageCard || "선택 안 함",
      quantity: clampQuantity(item.quantity),
    };

    const key = item.key || createItemKey(normalizedItem);

    const existingIndex = items.findIndex((savedItem) => savedItem.key === key);

    if (existingIndex >= 0) {

      items[existingIndex].quantity = Math.min(
        items[existingIndex].quantity + normalizedItem.quantity,
        99,
      );
    } else {

      items.push({ ...normalizedItem, key });
    }

    saveItems();

    return key;
  }

  function changeQuantity(key, amount) {

    const itemIndex = items.findIndex((item) => item.key === key);

    if (itemIndex < 0) {
      return;
    }

    items[itemIndex].quantity += amount;

    if (items[itemIndex].quantity < 1) {

      items.splice(itemIndex, 1);
    } else {

      items[itemIndex].quantity = Math.min(items[itemIndex].quantity, 99);
    }

    saveItems();
  }

  function removeItem(key) {

    items = items.filter((item) => item.key !== key);

    saveItems();
  }

  function clear() {

    items = [];

    saveItems();
  }

  function getSummary() {

    return items.reduce(
      (summary, item) => ({
        quantity: summary.quantity + item.quantity,
        price: summary.price + item.price * item.quantity,
      }),
      { quantity: 0, price: 0 },

    );
  }

  function subscribe(listener) {

    listeners.add(listener);

    return () => listeners.delete(listener);
  }

  function escapeHtml(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function initializeCartUI() {

    if (uiController) {
      return uiController;
    }

    const elements = {
      triggers: document.querySelectorAll("[data-cart-trigger]"),

      counts: document.querySelectorAll(".cart-count"),

      dialog: document.querySelector("#cart-dialog"),

      close: document.querySelector(".cart-close"),
      items: document.querySelector("#cart-items"),
      total: document.querySelector("#cart-total"),
      clear: document.querySelector(".cart-clear"),
      checkout: document.querySelector(".cart-checkout"),
      toast: document.querySelector("#toast"),
    };

    if (!elements.dialog || !elements.items || !elements.total) {
      throw new Error("공통 장바구니 UI 요소를 찾지 못했습니다.");
    }

    let toastTimer;

    function showToast(message) {

      if (!elements.toast) {
        return;
      }

      window.clearTimeout(toastTimer);

      elements.toast.textContent = message;

      elements.toast.classList.add("is-visible");

      toastTimer = window.setTimeout(() => {
        elements.toast.classList.remove("is-visible");
      }, 2400);
    }

    function openCart() {

      if (!elements.dialog.open) {
        elements.dialog.showModal();
      }
    }

    function closeCart() {

      if (elements.dialog.open) {
        elements.dialog.close();
      }
    }

    function createCartItemMarkup(item) {

      const catalogProduct = window.NonfictionCatalog?.getProduct(item.id);

      const detailUrl = catalogProduct
        ? window.NonfictionCatalog.createDetailUrl(item.id, item.optionId)
        : "";

      const safeName = escapeHtml(item.name);
      const safeSize = escapeHtml(item.size);
      const safeMessage = escapeHtml(item.messageCard || "선택 안 함");
      const safeKey = escapeHtml(item.key);
      const safeImage = escapeHtml(item.image);

      const metadata =
        safeMessage === "선택 안 함"
          ? safeSize
          : `${safeSize} · ${safeMessage}`;

      const productName = detailUrl
        ? `<a href="${escapeHtml(detailUrl)}">${safeName}</a>`
        : safeName;

      return `
        <article class="cart-item">
          <img src="${safeImage}" alt="${safeName} ${safeSize}" width="92" height="112" />
          <div class="cart-item-info">
            <h3>${productName}</h3>
            <p class="cart-item-meta">${metadata}</p>
            <button class="cart-remove" type="button" data-cart-action="remove" data-cart-key="${safeKey}">
              삭제
            </button>
            <div class="cart-item-bottom">
              <div class="cart-item-quantity" aria-label="${safeName} ${safeSize} 수량">
                <button type="button" data-cart-action="decrease" data-cart-key="${safeKey}" aria-label="수량 줄이기">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-action="increase" data-cart-key="${safeKey}" aria-label="수량 늘리기">+</button>
              </div>
              <p class="cart-item-price">${formatWon(item.price * item.quantity)}</p>
            </div>
          </div>
        </article>
      `;
    }

    function renderCart() {

      const currentItems = getItems();

      const summary = getSummary();

      elements.items.innerHTML = currentItems.length
        ? currentItems.map(createCartItemMarkup).join("")
        : '<p class="empty-cart">장바구니가 비어 있습니다.<br />상품을 선택해 담아 보세요.</p>';

      elements.counts.forEach((count) => {

        count.textContent = summary.quantity;

        count.setAttribute(
          "aria-label",
          `장바구니 상품 ${summary.quantity}개`,
        );
      });

      elements.total.textContent = formatWon(summary.price);

      if (elements.checkout) {
        elements.checkout.disabled = currentItems.length === 0;
      }

      if (elements.clear) {
        elements.clear.disabled = currentItems.length === 0;
      }
    }

    function addItemToCart(item, options = {}) {

      addItem(item);

      showToast(options.message || `${item.name}을 장바구니에 담았습니다.`);

      if (options.open !== false) {
        openCart();
      }
    }

    elements.triggers.forEach((trigger) => {
      trigger.addEventListener("click", openCart);
    });

    elements.close?.addEventListener("click", closeCart);

    elements.dialog.addEventListener("click", (event) => {

      if (event.target === elements.dialog) {
        closeCart();
      }
    });

    elements.items.addEventListener("click", (event) => {

      const actionButton = event.target.closest("[data-cart-action]");

      if (!actionButton) {
        return;
      }

      const key = actionButton.dataset.cartKey;

      const action = actionButton.dataset.cartAction;

      if (action === "remove") {
        removeItem(key);
      } else if (action === "increase") {
        changeQuantity(key, 1);
      } else if (action === "decrease") {
        changeQuantity(key, -1);
      }
    });

    elements.clear?.addEventListener("click", () => {

      clear();

      showToast("장바구니를 비웠습니다.");
    });

    elements.checkout?.addEventListener("click", () => {
      showToast("주문서 화면은 구현 범위에서 제외한 포트폴리오 데모입니다.");
    });

    subscribe(renderCart);

    renderCart();

    uiController = {
      addItem: addItemToCart,
      close: closeCart,
      open: openCart,
      render: renderCart,
      showToast,
    };

    return uiController;
  }

  // 다른 브라우저 탭에서 장바구니가 바뀌면 현재 화면도 맞춥니다.
  window.addEventListener("storage", (event) => {

    if (event.key === STORAGE_KEY) {

      items = loadItems();

      listeners.forEach((listener) => listener(getItems()));
    }
  });

  window.NonfictionCart = {
    addItem,
    changeQuantity,
    clear,
    formatWon,
    getItems,
    getSummary,
    removeItem,
    subscribe,
  };

  window.NonfictionCartUI = {
    initialize: initializeCartUI,
  };
})();
