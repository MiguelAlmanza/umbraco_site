'use strict';
var swiperauto = new Swiper('.swiper-auto', {
    slidesPerView: "auto",
    //init: true,
    loop: true,
    centeredSlides: true,
    noSwiping: true,
    //autoHeight: true,
    spaceBetween: 0,
    watchOverflow: true, // deshabilita flechas si hay menos elementos
    navigation: {
        nextEl: '.swiper-button-next-auto',
        prevEl: '.swiper-button-prev-auto',
    },
    pagination: {
      el: '.swiper-pagination-auto',
      clickable: true,
    },
  });
  // tabs

  function Tabs() {
  var bindAll = function() {
      var menuElements = document.querySelectorAll('[data-tab]');
      for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
      }
  }

  var clear = function() {
      var menuElements = document.querySelectorAll('[data-tab]');
      for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active');
      var id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
      }
  }

  var change = function(e) {
      clear();
      e.target.classList.add('active');
      var id = e.currentTarget.getAttribute('data-tab');
      document.getElementById(id).classList.add('active');
      swiperauto.forEach((element) => (element.destroy()));
      swiperauto = new Swiper('.swiper-auto', {
        slidesPerView: "auto",
        init: true,
        loop: true,
        centeredSlides: true,
        noSwiping: true,
        autoHeight: true,
        spaceBetween: 0,
        watchOverflow: true, // deshabilita flechas si hay menos elementos
        navigation: {
            nextEl: '.swiper-button-next-auto',
            prevEl: '.swiper-button-prev-auto',
        },
        pagination: {
          el: '.swiper-pagination-auto',
          clickable: true,
        },
      });
  }

  bindAll();
  }

  var connectTabs = new Tabs();