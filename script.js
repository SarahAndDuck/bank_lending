'use strict';

///////////////////////////////////////
// modal

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(item =>
  item.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

///////////////////////////////////////
// smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
////  smooth page navigation
///////////////////////////////////////
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const clicktedButton = e.clicktedButton;
  if (clicktedButton.classList.contains('nav__link')) {
    const href = clicktedButton.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
////  слайдер
///////////////////////////////////////

const slides = document.querySelectorAll('.slide');
// slides.forEach(
//   (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
//   // 1 -0%
//   // 2-100%
//   // 3-200%
//   // 3-300%
// );
let currentSlide = 0;
const slidesNumber = slides.length - 1;
const slider = document.querySelector('.slider');

const moveToSlider = function () {};
// /////////////////////////////////////////////////
// временное отображение для разрабор=тки

// slider.style.transform = 'scale(0.4)';
// slider.style.overflow = 'visible';
// /////////////////////////////////////////////////
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// //////////////////////////////////////////
// беcконечный слайдер
//
// Цикл по слайдам
let sliders = [];
for (let i = 0; i < slides.length; ++i) {
  // Добавляем изображение из слайда
  sliders[i] = slides[i].querySelector('img');
  // Удаляем слайд
  slides[i].remove();
}
let viewport = document.querySelector('.slider').offsetWidth;
// Позиция сайда
let offset = 0;
// Функция для отрисовки сайда
function drow() {
  // Создаём элемент слайда
  let slide = document.createElement('div');
  // Добавляем касс slide новому элементу
  slide.classList.add('slide');
  // Добавляем дочерний элемент контент слайда
  slide.appendChild(sliders[currentSlide]);
  // Даём позицию для слайда
  slide.style.left = offset * viewport + 'px';
  // Добавляем слайд в контейнер слайдеров
  document.querySelector('.slider').appendChild(slide);
  // Если следующий слайд равен числу слайдеров, то
  if (currentSlide + 1 == slides.length) {
    // Включаем первый слайд
    currentSlide = 0;
  } else {
    // Иначе
    // Увеличиваем номер слайда на один
    currentSlide++;
  }
  // Назначаем позицию слайда
  offset = 1;
}
drow();
drow();
// Создаём функцию для переключения
function left() {
  // Запрещаем событие кнопки вперёд на клик
  btnRight.removeEventListener('click', left);
  // Берём слайды
  let slides2 = document.querySelectorAll('.slide');
  // Позиция
  let offset2 = 0;
  // Цикл для перемещения слайда
  for (let i = 0; i < slides2.length; i++) {
    // Меняем позицию слайда
    slides2[i].style.left = offset2 * viewport - viewport + 'px';
    // Увеличиваем позицию
    offset2++;
  }
  // Ставим таймер
  setTimeout(function () {
    // Удаляем прошлый слайд
    slides2[0].remove();
    // Рисуем следующий слайд
    drow();
    // Назначаем событие на кнопку вперёд
    btnRight.addEventListener('click', left);
  }, 500);
}

function right() {
  // Запрещаем событие кнопки вперёд на клик
  btnLeft.removeEventListener('click', right);
  // Берём слайды
  let slides2 = document.querySelectorAll('.slide');
  // Позиция
  let offset2 = 0;
  // Цикл для перемещения слайда
  for (let i = 0; i < slides2.length; i++) {
    // Меняем позицию слайда
    slides2[i].style.left = offset2 * viewport - viewport + 'px';
    // Увеличиваем позицию
    offset2++;
  }
  // Ставим таймер
  setTimeout(function () {
    // Удаляем прошлый слайд
    slides2[0].remove();
    // Рисуем следующий слайд
    drow();
    // Назначаем событие на кнопку вперёд
    btnLeft.addEventListener('click', right);
  }, 500);
}

btnRight.addEventListener('click', left);
btnLeft.addEventListener('click', right);

///////////////////////////////////////
////  создание вкладок
///////////////////////////////////////
// контейнер для кнопок табов
const tabsContainer = document.querySelector('.operations__tab-container');
// находим кнопки табы
const operationsTabs = document.querySelectorAll('.operations__tab');
// блоки с контентом
const operationsContent = document.querySelectorAll('.operations__content');
//  ivent deligation
tabsContainer.addEventListener('click', function (e) {
  //closest  возвращает ближайший родительский элемент (или сам элемент) с классом .operations__tab или null
  const clicktedButton = e.target.closest('.operations__tab');

  // техника Guard clause  "пункт охраны"
  if (!clicktedButton) {
    return;
  }
  // у всех таб кнопок убрать класс active
  operationsTabs.forEach(itemTab =>
    itemTab.classList.remove('operations__tab--active')
  );
  // нажатой кнопке табу добавить класс active
  clicktedButton.classList.add(`operations__tab--active`);

  // у контента удаляем класс active
  operationsContent.forEach(itemContent => {
    itemContent.classList.remove('operations__content--active');
  });

  // соответствующему контенту добавляем класс active

  let activContent = document.querySelector(
    `.operations__content--${clicktedButton.dataset.tab}`
  );
  activContent.classList.add('operations__content--active');
});
