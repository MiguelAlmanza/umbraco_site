// Script JS Funcionalidades de GALERIA #1

var swiper1 = new Swiper(".swiper-1", {
  slidesPerView: "auto",
  init: true,
  loop: true,
  centeredSlides: true,
  noSwiping: true,
  //   autoHeight: true,
  spaceBetween: 0,
  watchOverflow: true, // deshabilita flechas si hay menos elementos
  navigation: {
    nextEl: ".swiper-button-next1",
    prevEl: ".swiper-button-prev1",
  },
  pagination: {
    el: ".swiper1-pagination",
    clickable: true,
  },
});

if (document.querySelectorAll(".carousel-tabs-swiper").length > 0) {
  const uniqueElement = (array, element, class_name) => {
    // Recorre todos los elementos en el array y elimina la clase
    array.forEach((currentValue) => {
      currentValue.classList.remove(class_name);
    });

    // Agrega la clase al elemento específico
    element.classList.add(class_name);
  };

  const getElementPosition = (array, element) => {
    let position;
    for (let index = 0; index < array.length; index++) {
        if (element === array[index]) {
            position = index;
            break;
        }
    }
    return position;
};

  // Al hacer SWIPER en la galeria, la opción que le corresponde en el nav es centrada
  swiper1.on("slideChangeTransitionEnd", () => {
    let activeSlide = document.querySelector(".swiper-slide-active");
    let position = parseInt(
      activeSlide.getAttribute("data-swiper-slide-index")
    );
    let element = document.querySelectorAll("#parte5 .slideChange-tab")[
      position
    ];

    let tab = document.querySelectorAll("#parte5 .slideChange-tab")[position];
    let item = document.querySelectorAll("#parte5 .slideChange-item")[position];
    uniqueElement(
      document.querySelectorAll("#parte5 .slideChange-tab"),
      tab,
      "active"
    );
    uniqueElement(
      document.querySelectorAll("#parte5 .slideChange-item"),
      item,
      "active"
    );
    document.querySelector("#parte5 .cont-tabs").scrollLeft =
      element.offsetLeft - window.innerWidth / 2 + element.clientWidth / 2;
  });
  // Al hacer CLICK en unas de las opciones del nav, este es centrado.
  document.querySelectorAll("#parte5 .slideChange-tab").forEach((e) => {
    e.addEventListener("click", (event) => {
      const position = getElementPosition(
        document.querySelectorAll("#parte5 .slideChange-tab"),
        event.currentTarget
      );
      const item = document.querySelectorAll("#parte5 .slideChange-item")[
        position
      ];
      uniqueElement(
        document.querySelectorAll("#parte5 .slideChange-tab"),
        event.currentTarget,
        "active"
      );
      uniqueElement(
        document.querySelectorAll("#parte5 .slideChange-item"),
        item,
        "active"
      );
      document.querySelector("#parte5 .cont-tabs").scrollLeft =
        event.currentTarget.offsetLeft -
        window.innerWidth / 2 +
        event.currentTarget.clientWidth / 2;
      let paginationItems = document.querySelectorAll(
        "#parte5 .swiper1-pagination > *"
      );
      // Hacer clic en el elemento con el índice 'position'
      if (position < paginationItems.length) {
        paginationItems[position].click();
      }
    });
  });
}
