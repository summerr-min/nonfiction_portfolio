// 주소의 상품 정보를 읽어 하나의 상세 페이지에 표시합니다.
"use strict";

const catalog = window.NonfictionCatalog;

const cartUI = window.NonfictionCartUI.initialize();

const searchParams = new URLSearchParams(window.location.search);

const requestedProductId = searchParams.get("product") || "tears-in-rain";

const product =
  catalog.getProduct(requestedProductId) || catalog.getProduct("tears-in-rain");

const requestedOption = searchParams.get("option") || searchParams.get("size");

const initialOption = product.options[requestedOption]
  ? requestedOption
  : product.defaultOption;

const state = {
  optionId: initialOption,
  quantity: 1,
};

const elements = {
  pageDescription: document.querySelector("#page-description"),
  breadcrumbCategory: document.querySelector("#breadcrumb-category"),
  breadcrumbProduct: document.querySelector("#breadcrumb-product"),
  productType: document.querySelector("#product-type"),
  productTitle: document.querySelector("#product-title"),
  productImage: document.querySelector("#product-image"),
  imageLabel: document.querySelector("#image-label"),
  galleryCaption: document.querySelector(".gallery-caption"),
  productPrice: document.querySelector("#product-price"),
  productKeywords: document.querySelector("#product-keywords"),
  scentNotes: document.querySelector("#scent-notes"),
  productDescription: document.querySelector("#product-description"),
  optionLegend: document.querySelector("#option-legend"),
  sizeOptions: document.querySelector("#size-options"),
  totalPrice: document.querySelector("#total-price"),
  quantityInput: document.querySelector("#quantity"),
  quantityButtons: document.querySelectorAll(".quantity-button"),
  purchaseForm: document.querySelector("#purchase-form"),
  messageCard: document.querySelector("#message-card"),
  wishButton: document.querySelector(".wish-button"),
  demoBuy: document.querySelector("#demo-buy"),
  mobileOption: document.querySelector("#mobile-option"),
  mobileTotal: document.querySelector("#mobile-total"),
  mobileAddToCart: document.querySelector("#mobile-add-to-cart"),
  productInfo: document.querySelector("#product-info-copy"),
  productUsage: document.querySelector("#product-usage-copy"),
  productShipping: document.querySelector("#product-shipping-copy"),
  accordions: document.querySelectorAll(".product-accordions details"),
  storySection: document.querySelector("#product-story"),
  storyNavLink: document.querySelector("#story-nav-link"),
  storyImage: document.querySelector("#story-image"),
  storyKicker: document.querySelector("#story-kicker"),
  storyTitle: document.querySelector("#story-title"),
  storyCopy: document.querySelector("#story-copy"),
  recommendGrid: document.querySelector("#recommend-grid"),
  menuToggle: document.querySelector(".menu-toggle"),
  navigation: document.querySelector("#primary-navigation"),
};

function clampQuantity(value) {

  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    return 1;
  }

  return Math.min(Math.max(parsedValue, 1), 10);
}

function getSelectedOption() {

  return catalog.getOption(product, state.optionId);
}

function renderOptionInputs() {

  const optionEntries = Object.entries(product.options);

  elements.optionLegend.textContent = product.optionLabel;

  elements.sizeOptions.classList.toggle("is-single", optionEntries.length === 1);

  elements.sizeOptions.innerHTML = optionEntries
    .map(
      ([optionId, option]) => `
        <label class="size-option">
          <input
            type="radio"
            name="option"
            value="${optionId}"
            ${optionId === state.optionId ? "checked" : ""}
          />
          <span>${option.label}</span>
          <small>${window.NonfictionCart.formatWon(option.price)}</small>
        </label>
      `,
    )
    .join("");
}

function renderNotes() {

  const notes = product.notes || [];

  elements.scentNotes.hidden = notes.length === 0;

  elements.scentNotes.innerHTML = notes
    .map(
      ([title, copy]) => `
        <div>
          <dt>${title}</dt>
          <dd>${copy}</dd>
        </div>
      `,
    )
    .join("");
}

function renderStory() {

  const story = product.story;

  elements.storySection.hidden = !story;

  elements.storyNavLink.hidden = !story;

  if (!story) {
    return;
  }

  elements.storyImage.src = story.image;

  elements.storyImage.alt = story.alt;

  elements.storyKicker.textContent = story.kicker;

  elements.storyTitle.textContent = story.title;

  elements.storyCopy.textContent = story.text;
}

function renderRecommendations() {

  elements.recommendGrid.innerHTML = product.recommendations
    .map((recommendationId) => {

      const recommendation = catalog.getProduct(recommendationId);

      const option = catalog.getOption(
        recommendation,
        recommendation.defaultOption,
      );

      const detailUrl = catalog.createDetailUrl(
        recommendation.id,
        recommendation.defaultOption,
      );

      return `
        <article>
          <a href="${detailUrl}" aria-label="${recommendation.name} 상세보기">
            <img
              src="${option.image}"
              alt="${recommendation.name} ${option.label}"
              width="2438"
              height="2438"
              loading="lazy"
            />
            <h3>${recommendation.name}</h3>
            <p>${option.label} · ${window.NonfictionCart.formatWon(option.price)}</p>
          </a>
        </article>
      `;
    })
    .join("");
}

function renderStaticProductContent() {

  document.title = `${product.name} | NONFICTION MINHA`;

  elements.pageDescription.content =
    `${product.name}의 옵션과 수량을 선택하고 장바구니에 담아보는 포트폴리오용 상품 상세 페이지입니다.`;

  elements.breadcrumbCategory.textContent = product.category;

  elements.breadcrumbProduct.textContent = product.englishName;

  elements.productType.textContent = product.type;

  elements.productTitle.textContent = product.name;

  elements.productKeywords.textContent = product.keywords;

  elements.productDescription.textContent = product.description;

  elements.productInfo.textContent = product.productInfo;
  elements.productUsage.textContent = product.usage;
  elements.productShipping.textContent = product.shipping;

  elements.wishButton.setAttribute(
    "aria-label",
    `${product.name} 관심 상품에 추가`,
  );

  renderOptionInputs();

  renderNotes();

  renderStory();

  renderRecommendations();
}

function renderProductState() {

  const selectedOption = getSelectedOption();

  const total = selectedOption.price * state.quantity;

  elements.productImage.src = selectedOption.image;

  elements.productImage.alt = `${product.name} ${selectedOption.label}`;

  elements.imageLabel.textContent = selectedOption.label;

  elements.galleryCaption.textContent =
    Object.keys(product.options).length > 1
      ? "옵션을 선택하면 상품 이미지와 가격이 함께 변경됩니다."
      : `${selectedOption.label} 구성의 포트폴리오용 상품 이미지입니다.`;

  elements.productPrice.textContent = window.NonfictionCart.formatWon(
    selectedOption.price,
  );

  elements.quantityInput.value = state.quantity;

  elements.totalPrice.value = window.NonfictionCart.formatWon(total);
  elements.totalPrice.textContent = window.NonfictionCart.formatWon(total);

  elements.mobileOption.textContent =
    `${selectedOption.label} · ${state.quantity}개`;

  elements.mobileTotal.textContent = window.NonfictionCart.formatWon(total);

  elements.sizeOptions
    .querySelectorAll('input[name="option"]')
    .forEach((input) => {
      input.checked = input.value === state.optionId;
    });
}

function updateAddress() {

  const nextUrl = new URL(window.location.href);

  nextUrl.searchParams.set("product", product.id);

  nextUrl.searchParams.set("option", state.optionId);

  nextUrl.searchParams.delete("size");

  window.history.replaceState({}, "", nextUrl);
}

function addSelectedProductToCart() {

  const selectedOption = getSelectedOption();

  cartUI.addItem(
    {
      id: product.id,
      name: product.name,
      optionId: state.optionId,
      size: selectedOption.label,
      price: selectedOption.price,
      image: selectedOption.image,
      messageCard: elements.messageCard.value,
      quantity: state.quantity,
    },
    {

      message: `${product.name} ${selectedOption.label} 상품을 장바구니에 담았습니다.`,
    },
  );
}

elements.sizeOptions.addEventListener("change", (event) => {

  if (!event.target.matches('input[name="option"]')) {
    return;
  }

  state.optionId = event.target.value;

  renderProductState();

  updateAddress();
});

elements.quantityButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const changeAmount = button.dataset.action === "increase" ? 1 : -1;

    state.quantity = clampQuantity(state.quantity + changeAmount);

    renderProductState();
  });
});

elements.quantityInput.addEventListener("input", (event) => {

  state.quantity = clampQuantity(event.currentTarget.value);

  renderProductState();
});

elements.purchaseForm.addEventListener("submit", (event) => {

  event.preventDefault();

  addSelectedProductToCart();
});

elements.mobileAddToCart.addEventListener(
  "click",
  addSelectedProductToCart,
);

elements.demoBuy.addEventListener("click", () => {
  cartUI.showToast("포트폴리오 데모에서는 실제 결제가 진행되지 않습니다.");
});

elements.wishButton.addEventListener("click", () => {

  const isPressed =
    elements.wishButton.getAttribute("aria-pressed") === "true";

  elements.wishButton.setAttribute("aria-pressed", String(!isPressed));

  elements.wishButton.querySelector("span").textContent = isPressed ? "♡" : "♥";

  elements.wishButton.setAttribute(
    "aria-label",
    `${product.name} ${isPressed ? "관심 상품에 추가" : "관심 상품에서 제거"}`,
  );
});

elements.accordions.forEach((accordion) => {
  accordion.addEventListener("toggle", () => {

    if (!accordion.open) {
      return;
    }

    elements.accordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.open = false;
      }
    });
  });
});

elements.menuToggle.addEventListener("click", () => {

  const isOpen = elements.navigation.classList.toggle("is-open");

  elements.menuToggle.setAttribute("aria-expanded", String(isOpen));

  elements.menuToggle.querySelector(".sr-only").textContent = isOpen
    ? "메뉴 닫기"
    : "메뉴 열기";

  document.body.classList.toggle("menu-open", isOpen);
});

elements.navigation.addEventListener("click", (event) => {

  if (!event.target.matches("a")) {
    return;
  }

  elements.navigation.classList.remove("is-open");

  elements.menuToggle.setAttribute("aria-expanded", "false");

  elements.menuToggle.querySelector(".sr-only").textContent = "메뉴 열기";

  document.body.classList.remove("menu-open");
});

document.addEventListener("keydown", (event) => {

  if (
    event.key !== "Escape" ||
    !elements.navigation.classList.contains("is-open")
  ) {
    return;
  }

  elements.navigation.classList.remove("is-open");

  elements.menuToggle.setAttribute("aria-expanded", "false");

  elements.menuToggle.querySelector(".sr-only").textContent = "메뉴 열기";

  document.body.classList.remove("menu-open");

  elements.menuToggle.focus();
});

window.addEventListener("resize", () => {

  if (window.innerWidth <= 980) {
    return;
  }

  elements.navigation.classList.remove("is-open");

  elements.menuToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
});

renderStaticProductContent();

renderProductState();

updateAddress();
