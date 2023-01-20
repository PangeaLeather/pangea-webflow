import $ from 'jquery';
//import 'jquery-scrollify';
import '@accessible360/accessible-slick';
import '../scss/00.global.scss';

if (Webflow.env('editor') != undefined) {
    console.log('Editor is loaded: do not load custom js');
} else {
    console.log('Editor is not loaded: load custom js...');
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
                    offset: 1,
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


                        if ($('body').hasClass('body-scrollify-tabs')) {
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

                        if (window.location.hash) {
                            var hash = window.location.hash; //Puts hash in variable, and removes the # character
                            $.scrollify.instantMove(hash);
                        }
                    }
                });
            });
        }
    }

    scroll_page();

    $(window).resize(function () {
        scroll_page();
        if ($(window).width() > 991) {
            $('.panel-slickslider').not('.slick-initialized').slick();
        }
    });

    if ($(window).width() > 991) {
        $(".menu-toggle").click(function () {
            $("body").toggleClass("body-freeze");
        });
    }

    // modify menu small links in submenu to be the correct scrollify link on page load
    // on current page, need .menu-small-link href = ex: "#our-people"
    // for any other .menu-small-link not related to current page, need href = "/who-we-are#our-people"
    // V1: <a href="[Sub Nav Item 1 URL]" data-page="[Slug]" class="menu-small-link">[Sub Nav Item 1]</a>
    // V2: <a href="/[Slug]" data-anchor="[Sub Nav Item 1 URL]" class="menu-small-link">[Sub Nav Item 1]</a>
    // V3? <a href="/[Slug][Sub Nav Item 1 URL]" data-page="[Slug]" data-anchor="[Sub Nav Item 1 URL]" class="menu-small-link">[Sub Nav Item 1]</a>

    $(".menu-small-link").each(function () {
        var data_page = $(this).data("page");
        var data_anchor = $(this).data("anchor");
        var last_index = window.location.pathname.split("/").pop();
        //var link_href = $(this).attr("href");
        if (last_index == data_page) {
            // $(this).click(function () {
            //     $.scrollify.instantMove(data_anchor);
            // });
            $(this).attr("href", data_anchor);
        }
        // else {
        //     $(this).attr("href", "/" + data_page + link_href);
        // }
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
}
