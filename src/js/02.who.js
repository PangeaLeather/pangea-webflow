import $ from 'jquery';
import 'tooltipster';
import 'tooltipster/dist/css/tooltipster.bundle.min.css';
import '../scss/02.who.scss';

window.jQuery = $;


$('.tl-point').tooltipster({
    maxWidth: 400,
    theme: ['tooltipster-noir', 'tooltipster-timeline'],
    trigger: 'custom',
    triggerOpen: {
        mouseenter: true,
        // click: true,
        tap: true    // For touch device
    },
    triggerClose: {
        mouseleave: true,
        // click: true,
        tap: true    // For touch device
    }
})
$('.loc').tooltipster({
    theme: ['tooltipster-noir', 'tooltipster-locations']
})
// $('#heroslide5').click(function (e) {
//     e.preventDefault();
//     $('.hero-link').removeClass('active');
//     $(this).addClass('active');
//     $('.w-round div:nth-child(5)').trigger('tap');
// });
$('.next-link').click(function (e) {
    e.preventDefault();
    $('.w-slider-arrow-right').trigger('tap')
});
$('.prev-link').click(function (e) {
    e.preventDefault();
    $('.w-slider-arrow-left').trigger('tap')
});

$('.panel-slickslider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: false,
    adaptiveHeight: true
});

//slick slider custom links
$(".next-link").click(function (e) {
    e.preventDefault();
    $('.slick-next').trigger('tap')
});
$(".prev-link").click(function (e) {
    e.preventDefault();
    $('.slick-prev').trigger('tap')
});