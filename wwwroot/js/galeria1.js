// Script JS Funcionalidades de GALERIA #1

var swiper1 = new Swiper('.swiper-1', {
    slidesPerView: "auto",
    init: true,
    loop: true,
    centeredSlides: true,
    noSwiping: true,
    //   autoHeight: true,
    spaceBetween: 0,
    watchOverflow: true, // deshabilita flechas si hay menos elementos
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
    },
    pagination: {
    el: '.swiper1-pagination',
    clickable: true,
    },
});

if($(".carousel-tabs-swiper").length > 0){
    let uniqueElement = (array, element, class_name) => {
        array.each(function(index, currentValue) {
            $(this).removeClass(class_name);
        })
        $(element).addClass(class_name);
    }

    let getElementPosition = (array, element) => {
        let position;
        array.each(function(index, currentValue) {
            if(element == currentValue) {
                position = index;
                return false
            }
    })
    return position;
    }
    // Al hacer SWIPER en la galeria, la opción que le corresponde en el nav es centrada
    swiper1.on('slideChangeTransitionEnd', () => {
        let position = parseInt($($('.swiper-slide-active')[0]).attr('data-swiper-slide-index'));
        let element = document.querySelectorAll('#parte5 .slideChange-tab')[position];
        
        let tab = $("#parte5 .slideChange-tab").eq(position);
        let item = $("#parte5 .slideChange-item").eq(position);
        uniqueElement($("#parte5 .slideChange-tab"), tab, "active");
        uniqueElement($("#parte5 .slideChange-item"), item, "active");
        document.querySelector('#parte5 .cont-tabs').scrollLeft=element.offsetLeft-(window.innerWidth/2)+element.clientWidth/2;
    });
    // Al hacer CLICK en unas de las opciones del nav, este es centrado.
    $("#parte5 .slideChange-tab").on("click", (event) =>{
        const position = getElementPosition($("#parte5 .slideChange-tab"), event.currentTarget);
        const item = $("#parte5 .slideChange-item").eq(position);
        uniqueElement($("#parte5 .slideChange-tab"), $(event.currentTarget), "active");
        uniqueElement($("#parte5 .slideChange-item"), item, "active");
        document.querySelector('#parte5 .cont-tabs').scrollLeft=event .currentTarget.offsetLeft-(window.innerWidth/2)+event.currentTarget.clientWidth/2;
        $("#parte5 .swiper1-pagination").children().eq(position).click();
    })
}