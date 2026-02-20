let center = [59.77619258911528, 30.126254957672092];

let hrefIcon = "./images/Footer/map-icon.png";

function init() {
  let map = new ymaps.Map("map-test", {
    center: center,
    zoom: 17,
  });

  let placemark = new ymaps.Placemark(
    center,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: hrefIcon,
      iconImageSize: [61, 61],
      iconImageOffset: [0, 0],
    },
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark);
}

ymaps.ready(init);

// -------------------menu----------------------------

const burger = document.querySelector(".header-burger");

if (burger) {
  burger.addEventListener("click", OpenBurger);

  function OpenBurger() {
    const headerBottom = document.querySelector(".header-bottom");
    burger.classList.toggle("open");
    headerBottom.classList.toggle("open");
  }
}

const menuItems = document.querySelectorAll(".menu-item");
let clickedMenu = null; // хранит меню, открытое кликом

menuItems.forEach((item) => {
  let closeTimeout;
  const arrow = item.querySelector(".arrow-menu-1, .arrow-menu-2");
  const subMenu = item.querySelector(".sub-menu");

  if (!arrow || !subMenu) return;

  // Клик — запоминаем открытое меню
  arrow.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Проверяем, не является ли это подменю третьего уровня
    const isThirdLevel = item.closest(".sub-menu")?.closest(".sub-menu");

    if (isThirdLevel) {
      // Для третьего уровня просто переключаем его состояние
      subMenu.classList.toggle("open");
      arrow.classList.toggle("open");
      item.classList.toggle("open");
      return; // не трогаем вышестоящие меню
    }

    // Если уже открыто кликом — закрываем
    if (clickedMenu === item) {
      subMenu.classList.remove("open");
      arrow.classList.remove("open");
      item.classList.remove("open");
      clickedMenu = null;
      return;
    }

    // Закрываем предыдущее открытое кликом меню
    if (clickedMenu) {
      const prevSubMenu = clickedMenu.querySelector(".sub-menu");
      const prevArrow = clickedMenu.querySelector(
        ".arrow-menu-1, .arrow-menu-2",
      );
      prevSubMenu.classList.remove("open");
      prevArrow.classList.remove("open");
      clickedMenu.classList.remove("open");
    }

    // Открываем текущее
    subMenu.classList.add("open");
    arrow.classList.add("open");
    item.classList.add("open");
    clickedMenu = item;
  });

  // Наведение — работает только если не открыто кликом
  item.addEventListener("mouseenter", function () {
    if (clickedMenu !== item) {
      clearTimeout(closeTimeout);
      subMenu.classList.add("open");
      arrow.classList.add("open");
      item.classList.add("open");
    }
  });

  item.addEventListener("mouseleave", function () {
    if (clickedMenu !== item) {
      closeTimeout = setTimeout(() => {
        subMenu.classList.remove("open");
        arrow.classList.remove("open");
        item.classList.remove("open");
      }, 300);
    }
  });
});

// -----------------popup----------------------

// Функция инициализации попапа
function initPopup() {
  const buttonsPopup = document.querySelectorAll(".btn-popup");
  const popupCall = document.querySelector(".popup-call");
  const popupClose = document.querySelector(".popup-close");

  // Проверяем, что все ключевые элементы найдены
  if (!popupCall) {
    console.warn("Элемент .popup-call не найден");
    return;
  }

  // Функция закрытия попапа
  function closePopup() {
    popupCall.classList.remove("show");
  }

  // Обработчик для кнопок открытия
  buttonsPopup.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      popupCall.classList.add("show");
    });
  });

  // Обработчик для кнопки закрытия (если она есть)
  if (popupClose) {
    popupClose.addEventListener("click", closePopup);
  } else {
    console.warn("Кнопка закрытия .popup-close не найдена");
  }

  // Закрытие кликом вне попапа
  popupCall.addEventListener("click", (e) => {
    if (e.target === popupCall) {
      closePopup();
    }
  });

  // Закрытие клавишей Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupCall.classList.contains("show")) {
      closePopup();
    }
  });
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener("DOMContentLoaded", initPopup);

// ---------------swiper--------------------------------

const swiperBlog = document.querySelector(".swiper-blog");

if (swiperBlog) {
  const swiperBlog = new Swiper(".swiper-blog", {
    // Optional parameters
    loop: true,
    init: true,
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      767: {
        init: true,
        slidesPerView: 3,
        spaceBetween: 22,
      },
    },
  });
}

const swiperLicenses = document.querySelector(".swiper-licenses");

if (swiperLicenses) {
  const swiperLicenses = new Swiper(".swiper-licenses", {
    // Optional parameters
    loop: true,
    slidesPerView: 2,
    grabCursor: true,

    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });
}
