// 메인과 상세 페이지가 함께 사용하는 상품 데이터입니다.
"use strict";

(function createProductCatalog() {

  const commonShipping =
    "평일 기준 2–3일 이내 출고되는 상황을 가정한 포트폴리오용 안내입니다.";

  const products = {

    "neroli-pouch-set": {
      id: "neroli-pouch-set",
      category: "GIFT",
      type: "LIMITED SET",
      name: "[LIMITED] 네롤리 드림 썸머 파우치 세트",
      englishName: "NEROLI DREAM SUMMER POUCH SET",
      keywords: "네롤리 · 오렌지 블라썸 · 뮤게 · 머스크",
      description:
        "가볍게 휴대할 수 있는 오 드 퍼퓸과 헤어 세럼 미스트를 함께 구성한 포트폴리오용 리미티드 세트입니다.",
      optionLabel: "구성 선택",
      defaultOption: "set",
      options: {

        set: {
          label: "30mL×1 · 10mL×1",
          price: 68000,
          image: "images/products/product_default_1.jpg",
          hoverImage: "images/products/product_hover_1.jpg",
        },
      },
      productInfo: "오 드 퍼퓸 30mL 1개와 헤어 세럼 미스트 10mL 1개 구성",
      usage:
        "오 드 퍼퓸은 손목과 목 주변에 가볍게 분사하고, 헤어 세럼 미스트는 모발에서 거리를 두고 사용해 주세요.",
      shipping: commonShipping,
      recommendations: ["neroli-hair-serum", "neroli-dream", "citrus-hand-cream-trio"],
    },

    "neroli-hair-serum": {
      id: "neroli-hair-serum",
      category: "HAIR",
      type: "HAIR SERUM MIST",
      name: "네롤리 드림 헤어 세럼 미스트",
      englishName: "NEROLI DREAM HAIR SERUM MIST",
      keywords: "네롤리 · 오렌지 블라썸 · 뮤게 · 머스크",
      description:
        "산뜻한 네롤리 향과 함께 모발에 부드러운 윤기를 더하는 사용 경험을 표현한 헤어 세럼 미스트입니다.",
      optionLabel: "용량 선택",
      defaultOption: "100",
      options: {

        100: {
          label: "100mL",
          price: 49000,
          image: "images/products/product_default_2.jpg",
          hoverImage: "images/products/product_hover_2.jpg",
        },
      },
      productInfo: "용량 100mL · 헤어 세럼 미스트 · 모든 모발용",
      usage:
        "사용 전 가볍게 흔든 뒤 모발에서 충분한 거리를 두고 분사해 주세요. 눈에 직접 닿지 않도록 주의하세요.",
      shipping: commonShipping,
      recommendations: ["neroli-pouch-set", "neroli-dream", "citrus-hand-cream-trio"],
    },

    "neroli-dream": {
      id: "neroli-dream",
      category: "PERFUME",
      type: "EAU DE PARFUM",
      name: "네롤리 드림 오 드 퍼퓸",
      englishName: "NEROLI DREAM",
      keywords: "네롤리 · 오렌지 블라썸 · 뮤게 · 머스크",
      description:
        "새하얀 오렌지 꽃이 피어나는 순간의 화사함과 투명한 꽃내음을 담은 시트러스 플로럴 향입니다.",
      notes: [
        ["TOP", "네롤리, 오렌지 블라썸"],
        ["MIDDLE", "뮤게, 화이트 플라워"],
        ["BASE", "클린 머스크, 앰버"],
      ],
      optionLabel: "용량 선택",
      defaultOption: "50",
      options: {

        50: {
          label: "50mL",
          price: 148000,
          image: "images/products/product_default_3.jpg",
          hoverImage: "images/products/product_hover_3.jpg",
        },
      },
      productInfo: "용량 50mL · 오 드 퍼퓸 · 모든 피부용",
      usage:
        "맥박이 뛰는 손목과 목 주변에 가볍게 분사해 주세요. 화기와 직사광선을 피해 보관하세요.",
      shipping: commonShipping,
      story: {
        kicker: "CITRUS STORY",
        title: "NEROLI DREAM",
        image: "images/banners/slide_banner_5.jpg",
        alt: "빛을 머금은 네롤리 드림 향 이미지",
        text: "깨끗한 네롤리의 첫인상 뒤로 투명한 꽃 향과 부드러운 머스크가 이어집니다. 상품 정보와 향의 분위기를 함께 보여 주는 대표 상세 콘텐츠입니다.",
      },
      recommendations: ["neroli-hair-serum", "tears-in-rain", "dew-and-light"],
    },

    "citrus-hand-cream-trio": {
      id: "citrus-hand-cream-trio",
      category: "HAND & LIP",
      type: "HAND CREAM SET",
      name: "시트러스 핸드 크림 미니 트리오",
      englishName: "CITRUS HAND CREAM MINI TRIO",
      keywords: "시트러스 향 3종 · 미니 사이즈 · 기프트 세트",
      description:
        "서로 다른 시트러스 계열의 향을 작은 용량으로 경험할 수 있도록 구성한 핸드 크림 세트입니다.",
      optionLabel: "구성 선택",
      defaultOption: "trio",
      options: {

        trio: {
          label: "15mL×3",
          price: 34000,
          image: "images/products/product_default_4.jpg",
          hoverImage: "images/products/product_hover_4.jpg",
        },
      },
      productInfo: "핸드 크림 15mL 3개 구성 · 시트러스 향 3종",
      usage:
        "손을 씻은 뒤 적당량을 덜어 부드럽게 펴 발라 주세요. 상처가 있는 부위에는 사용을 피하세요.",
      shipping: commonShipping,
      recommendations: ["neroli-pouch-set", "neroli-hair-serum", "neroli-dream"],
    },

    "dew-and-light": {
      id: "dew-and-light",
      category: "PERFUME",
      type: "EAU DE PARFUM",
      name: "듀 앤 라이트 오 드 퍼퓸",
      englishName: "DEW & LIGHT",
      keywords: "피오니 · 페어 · 화이트 모스 · 아키갈라우드",
      description:
        "이슬이 맺힌 꽃잎과 투명한 빛의 인상을 부드러운 우디 시프레로 풀어낸 향입니다.",
      notes: [
        ["TOP", "페어, 베르가못"],
        ["MIDDLE", "피오니, 화이트 플라워"],
        ["BASE", "화이트 모스, 아키갈라우드"],
      ],
      optionLabel: "용량 선택",
      defaultOption: "50",
      options: {

        50: {
          label: "50mL",
          price: 178000,
          image: "images/products/product_default_5.jpg",
        },

        100: {
          label: "100mL",
          price: 235000,
          image: "images/products/product_default_7.jpg",
        },
      },
      productInfo: "용량 50mL / 100mL · 오 드 퍼퓸 · 모든 피부용",
      usage:
        "맥박이 뛰는 손목과 목 주변에 가볍게 분사해 주세요. 화기와 직사광선을 피해 보관하세요.",
      shipping: commonShipping,
      recommendations: ["tears-in-rain", "neroli-dream", "neroli-hair-serum"],
    },

    "tears-in-rain": {
      id: "tears-in-rain",
      category: "PERFUME",
      type: "EAU DE PARFUM",
      name: "티어스 인 레인 오 드 퍼퓸",
      englishName: "TEARS IN RAIN",
      keywords: "오크우드 · 제라늄 · 베르가못 · 패출리",
      description:
        "비 내린 숲의 고요하고 촉촉한 여운을 담은 우디 시프레 향입니다. 맑은 시트러스 노트로 시작해 제라늄과 오크우드의 깊고 차분한 분위기로 이어집니다.",
      notes: [
        ["TOP", "베르가못, 블랙 페퍼, 카다멈"],
        ["MIDDLE", "제라늄, 로즈 앱솔루트, 바이올렛"],
        ["BASE", "오크우드, 패출리, 베티버"],
      ],
      optionLabel: "용량 선택",
      defaultOption: "50",
      options: {

        50: {
          label: "50mL",
          price: 178000,
          image: "images/products/product_default_6.jpg",
        },

        100: {
          label: "100mL",
          price: 235000,
          image: "images/products/product_default_8.jpg",
        },
      },
      productInfo: "용량 50mL / 100mL · 오 드 퍼퓸 · 모든 피부용",
      usage:
        "맥박이 뛰는 손목과 목 주변에 가볍게 분사해 주세요. 화기와 직사광선을 피해 보관하세요.",
      shipping: commonShipping,
      story: {
        kicker: "SCENT STORY",
        title: "TEARS IN RAIN",
        image: "images/banners/slide_banner_2.jpg",
        alt: "비 내린 숲을 연상시키는 티어스 인 레인 향 이미지",
        text: "베르가못의 맑은 첫인상 뒤로 젖은 흙과 나무의 깊은 향이 이어집니다. 상품 정보와 이미지를 나란히 배치해 사용자가 향의 분위기와 구매 정보를 자연스럽게 연결할 수 있도록 구성했습니다.",
      },
      recommendations: ["dew-and-light", "neroli-dream", "neroli-hair-serum"],
    },
  };

  const collections = {

    newProducts: [
      ["neroli-pouch-set", "set"],
      ["neroli-hair-serum", "100"],
      ["neroli-dream", "50"],
      ["citrus-hand-cream-trio", "trio"],
    ],

    perfumes: [
      ["dew-and-light", "50"],
      ["tears-in-rain", "50"],
      ["dew-and-light", "100"],
      ["tears-in-rain", "100"],
    ],
  };

  function getProduct(productId) {

    return products[productId] || null;
  }

  function getOption(product, optionId) {

    if (!product) {
      return null;
    }

    return product.options[optionId] || product.options[product.defaultOption];
  }

  function createDetailUrl(productId, optionId) {

    const params = new URLSearchParams({ product: productId });

    if (optionId) {
      params.set("option", optionId);
    }

    return `detail.html?${params.toString()}`;
  }

  // 다른 스크립트에서도 같은 상품 정보를 사용하도록 공개합니다.
  window.NonfictionCatalog = {
    products,
    collections,
    getProduct,
    getOption,
    createDetailUrl,
  };
})();
