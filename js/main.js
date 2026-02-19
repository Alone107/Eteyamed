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

document.addEventListener("click", function (event) {
  const arrow = event.target.closest(".arrow-menu-1, .arrow-menu-2");
  if (!arrow) return;

  event.preventDefault();
  event.stopPropagation();

  const menuItem = arrow.closest(".menu-item");
  const subMenu = menuItem.querySelector(".sub-menu");

  if (subMenu) {
    // Переключаем класс для подменю
    subMenu.classList.toggle("open");

    // Дополнительно: добавляем класс к стрелке
    arrow.classList.toggle("open");

    // Дополнительно: добавляем класс к родительскому пункту меню
    menuItem.classList.toggle("open");
  }
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

    // Default parameters
    slidesPerView: 1,
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
