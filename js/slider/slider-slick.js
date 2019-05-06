$(document).ready(() => {
  const slider = $('.slider');
  const paging = $('.pagination-dots');
  const images = Array.from($('.slider img'));
  images.forEach((item, i) => {
    const newDots = document.createElement('button');
    newDots.classList.add('img-navigation');
    newDots.innerText = i + 1;
    document.querySelector('.pagination-dots').appendChild(newDots);
  });

  slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dots: false,
    arrows: true,
    appendArrows: '.pagination-block',
    prevArrow: '<button class="slide-navigation">Назад</button>',
    nextArrow: '<button class="slide-navigation">Вперед</button>',
    autoplay: false,
    speed: 2000,
  });

  const indexPaging = 3;
  paging.slick({
    slidesToShow: indexPaging,
    slidesToScroll: indexPaging,
    dots: false,
    infinite: false,
    focusOnSelect: false,
    prevArrow: '<button class="lessImg"><<</button>',
    nextArrow: '<button class="moreImg">>></button>',
  });

  let indexImg = 0;

  paging.on('click', '.slick-slide', function (event) {
    event.preventDefault();
    const goToSingleSlide = $(this).data('slick-index');
    slider.slick('slickGoTo', goToSingleSlide);
  });

  $('.lessImg').on('click', () => {
    console.log(indexImg);
    addClass(indexImg);
  });

  $('.moreImg').on('click', () => {
    console.log(indexImg);
    addClass(indexImg);
  });

  slider.on('afterChange', (event, slick, currentSlide) => {
    paging.slick('slickCurrentSlide', currentSlide);
    indexImg = currentSlide;
    const currrentNavSlideElem = `.pagination-dots .slick-slide[data-slick-index="${currentSlide}"]`;
    addClass(currentSlide);
    $('.slick-slide').find('.img-navigation').removeClass('active');
    $(currrentNavSlideElem).find('.img-navigation').addClass('active');
  });

  paging.find('.slick-slide').addClass('slider-nav');
  paging.find('.slick-list').addClass('slick-list-nav');
  paging.find('.slick-current').find('.img-navigation').addClass('active');

  function addClass(index) {
    const currentNavPaging = Array.from(paging.find('.slick-active'));
    $('.lessImg').removeClass('active');
    $('.moreImg').removeClass('active');
    if (currentNavPaging[0].getAttribute('data-slick-index') > index) {
      $('.lessImg').addClass('active');
    } if (currentNavPaging[2].getAttribute('data-slick-index') < index) {
      $('.moreImg').addClass('active');
    }
  }
  slider.on('setPosition', () => {
    slider.find('.slick-slide').height('auto');
    const slickTrack = $('.body-block').find('.slider');
    const slickTrackHeight = $(slickTrack).height();
    slider.find('img').css('height', `${slickTrackHeight}px`);
  });

  paging.on('setPosition', () => {
    paging.find('.slick-slide').width('50px');
  });
});
