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

// $('.menu a').click(function () {
//     var moveTo = $(this).attr('href');
//     $.scrollify("move", moveTo);
// });

// var pathname = window.location.pathname; // Returns path only (/path/example.html)
// var url = window.location.href;     // Returns full URL (https://example.com/path/example.html)
// var origin = window.location.origin;   // Returns base URL (https://example.com)
// var parts = url.split('/');
// var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

$(".menu-small-link").each(function () {
    var data_page = $(this).data("page");
    var href = $(this).attr("href");
    if (window.location.href.indexOf(data_page) > -1) {
        // return false;
    }
    else {
        $(this).attr("href", "/" + data_page + href);
    }
});