// Init slider
let slider = $('.slick-carousel').slick({
    infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        centerMode: true,
        centerPadding: '0',
        variableWidth: true,
        autoplaySpeed: 10000,
        prevArrow:'<button type="button" class="slick-prev"><</button>',
        nextArrow:'<button type="button" class="slick-next">></button>'

});

// Add custom class to next or previous slide depending on change direction
slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    let nextIndex = currentSlide + 1; // assume moving right
    if (currentSlide - 1 == nextSlide || (nextSlide + 1 == slick.slideCount && currentSlide < nextSlide)) {
        nextIndex = currentSlide - 1; // nope, moving left
    }
    $(`[data-slick-index="${nextIndex}"]`).addClass('slick-target');
});

// clear custom class after transition
slider.on('afterChange', () => {
    $('.slick-slide').removeClass('slick-target');
});

$('.slick-slide').click(function(e){
    e.currentTarget.classList.add('slick-current', 'slick-active','slick-center');
});