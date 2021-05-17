import $ from 'jquery';
import 'tooltipster';
import 'tooltipster/dist/css/tooltipster.bundle.min.css';
import '../scss/02.who.scss';

window.jQuery = $;


$('.tl-point').tooltipster({
    functionBefore: function (instance, helper) {
        $.each($.tooltipster.instances(), function (i, instance) {
            instance.close();
        });
    },
    functionReady: function (instance, helper) {
        $.each($.tooltipster.instances(), function (i, instance) {
            $(this).addclass('active');
        });
    },
    maxWidth: 400,
    theme: ['tooltipster-noir', 'tooltipster-timeline'],
    trigger: 'custom',
    triggerOpen: {
        // mouseenter: true,
        click: true,
        tap: true    // For touch device
    },
    triggerClose: {
        // mouseleave: true,
        click: true,
        tap: true    // For touch device
    },
    arrow: false,
})
$('.loc').tooltipster({
    theme: ['tooltipster-noir', 'tooltipster-locations']
})

// $('#tl-year-1832').tooltipster('show');

$('#tl-year-1832').trigger('click');


// $('#heroslide5').click(function (e) {
//     e.preventDefault();
//     $('.hero-link').removeClass('active');
//     $(this).addClass('active');
//     $('.w-round div:nth-child(5)').trigger('tap');
// });
// $('.next-link').click(function (e) {
//     e.preventDefault();
//     $('.w-slider-arrow-right').trigger('tap')
// });
// $('.prev-link').click(function (e) {
//     e.preventDefault();
//     $('.w-slider-arrow-left').trigger('tap')
// });