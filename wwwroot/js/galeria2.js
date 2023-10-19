var swiper2 = new Swiper('.swiper-2', {
    slidesPerView: "auto",
    init: true,
    loop: true,
    centeredSlides: true,
    noSwiping: true,
    spaceBetween: 0,
    watchOverflow: true, // deshabilita flechas si hay menos elementos
    navigation: {
        nextEl: '.swiper-button-next-2',
        prevEl: '.swiper-button-prev-2',
    },
    pagination: {
      el: '.swiper-pagination-2',
      type:"fraction",
      clickable: true,
  },
  });