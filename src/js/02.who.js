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
    viewportAware: false,
    side: ['top'],
})
$('.loc').tooltipster({
    theme: ['tooltipster-noir', 'tooltipster-locations']
})

var tl_point = $('.tl-point');
tl_point.click(function () {
    $(this).toggleClass('active-tooltip');
    tl_point.not(this).removeClass('active-tooltip');
});

window.addEventListener("load", function () {
    // $(".tl-point").each(function () {
    //     var tl_embed = $(this).parent();
    //     var styleStr = $(this).attr("style");
    //     tl_embed.attr("style", styleStr);
    //     $(this).attr("style","");
    // });
    $('#tl-year-1832').tooltipster('show').addClass('active-tooltip');
});

function myFunction(x) {
    if (x.matches) { // If media query matches
        document.body.style.backgroundColor = "yellow";
    } else {
        document.body.style.backgroundColor = "pink";
    }
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


// $('#tl-year-1832').trigger('click');

// $('.tl-point')
//     .focus(function () {
//         $(this).tooltipster('show');
//     })
//     .blur(function () {
//         $(this).tooltipster('hide');
//     });


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