import $ from 'jquery';
import 'jquery-scrollify';
import 'slick-carousel';
import '../scss/00.global.scss';

window.jQuery = $;

// scrollify .panel scrolljack + scrollsnap
function scroll_page() {
    if (window.innerWidth < 1024) {
        if (window.innerHeight > window.innerWidth) {
            $.scrollify.destroy();
        }
    }
    else {
        $(function () {
            $.scrollify({
                section: ".panel",
                before: function (i, panels) {

                    var ref = panels[i].attr("data-section-name");

                    $(".pagination .active").removeClass("active");

                    $(".pagination").find("a[href=\"#" + ref + "\"]").parent().addClass("active");
                },
                afterRender: function () {
                    var pagination = "<ol class=\"pagination\">";
                    var activeClass = "";

                    $(".panel").each(function (i) {
                        var section = $(this).attr("data-section-name");
                        var prettyname = section.split('-').join(' ');
                        activeClass = "";
                        if (i === $.scrollify.currentIndex()) {
                            activeClass = "active";
                        }
                        pagination += "<li class=\"" + activeClass + "\"><a href=\"#" + section + "\"><span class=\"hover-text\">" + prettyname.charAt(0).toUpperCase() + prettyname.slice(1) + "</span></a></li>";
                    });

                    pagination += "</ol>";

                    //$("body").append(pagination);


                    if ($('body').hasClass('scrollify-tabs')) {
                        $('body').append("<div class=\"pagination-tabbed-wrapper\"><div class=\"container w-container\">" + pagination + "</div></div>");
                    } else {
                        $('body').append(pagination);
                    };


                    /*

                    Tip: The two click events below are the same:

                    $(".pagination a").on("click",function() {
                      $.scrollify.move($(this).attr("href"));
                    });

                    */
                    $(".pagination a").on("click", $.scrollify.move);
                }
            });
        });
    }
}

scroll_page();

window.addEventListener('resize', function (event) {
    scroll_page();
});

$(".menu-toggle").click(function () {
    $("body").toggleClass("body-freeze");
});

$(".menu-small-link").each(function () {
    var data_page = $(this).data("page");
    var href = $(this).attr("href");
    if (window.location.href.indexOf(data_page) > -1) {
        $(this).click(function () {
            $.scrollify.instantMove(href);
        });
    }
    else {
        $(this).attr("href", "/" + data_page + href);
    }
});

$('.panel-slickslider').each(function () {
    $(this).slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: false,
        adaptiveHeight: true,
        prevArrow: $(this).find('.prev-link'),
        nextArrow: $(this).find('.next-link'),
        responsive: [
            {
                breakpoint: 991,
                settings: "unslick"
            },

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});