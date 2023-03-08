"use strict";

/* ==================================================
   Website Scripts
   ================================================== */

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//if browser does not support svg, swap svgs with pngs
function svgasimg() {
    return document.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

if (!svgasimg()) {
    var e = document.getElementsByTagName("img");
    if (!e.length) {
        e = document.getElementsByTagName("IMG");
    }
    for (var i = 0, n = e.length; i < n; i++) {
        var img = e[i],
            src = img.getAttribute("src");
        if (src.match(/svgz?$/)) {
            /* URL ends in svg or svgz */
            img.setAttribute("src",
                img.getAttribute("fallback"));
        }
    }
}


(function ($) {

    var mainnavanimate;

    $(function () {

        //general modal START
        if ($('.modal__inner').length && !Cookies.get('welcome')) {
            window.setTimeout(function () {
                $('.modal').addClass('show-me');
                $('body').addClass('no-scroll');
            }, 1000);


            let howManyDays = 7;

            if (modalFrequency != null) {
                switch (modalFrequency) {
                    case "OncePerWeek":
                        howManyDays = 7;
                        break;
                    case "TwicePerWeek":
                        howManyDays = 3;
                        break;
                    case "Always":
                        howManyDays = 0;
                        break;
                    case "Once":
                        howManyDays = 1000;
                        break;
                    default:
                        howManyDays = 7;
                }
            }


            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + howManyDays);

            $('.js-close-modal').on('click', function () {
                $('.modal').removeClass('show-me');
                $('body').removeClass('no-scroll');

                Cookies.set("welcome", "dismissed", { expires: expirationDate });
            });

            $('.modal .btn').on('click', function () {
                Cookies.set("welcome", "dismissed", { expires: expirationDate });
            });
        }
        //general modal END

        //cookie concent START
        if ($('.js-cookie').length && !Cookies.get('cookie')) {

            $('.js-cookie').addClass('show-me');

            $('.js-cookie-accept').on('click', function () {
                $('.js-cookie').removeClass('show-me');

                Cookies.set("cookie", "dismissed");
            });
        }
        //cookie concent END

        //Initialize waves for buttons
        Waves.attach('.js--btn--wave', ['waves-button', 'waves-float', 'waves-light']);
        Waves.init();


        //animate labels of inputs in forms
        if ($('.form__items').length) {
            highLightLabel();
        }


        // ----------- Toggle Mobile NAV centre list ----------- //
        $('.js-nav-centre__item .nav-centre__title').on('click', function () {
            if (window.innerWidth < 1020) {
                $(this).parents('.js-nav-centre__item').toggleClass('active');
            }

            else {
                $('.js-nav-centre__item').removeClass('active');
            }
        });



        $('.header-upper .search-form').removeAttr('style');

        $('.js-icon--search').on('click', function (e) {
            $(this).toggleClass('form-open');
            $('.header-upper .search-form').toggleClass('open');
        });


        // ----------- Burger menu ----------- //
        $('.burger-icon').on('click', function (e) {
            $(this).toggleClass('open');
            $('.site-header').toggleClass('menu-open');
            $("body").toggleClass("stop-scrolling");
            e.stopPropagation();
        });


        // ----------- Equalize heights for lists ----------- //

        // articles lists
        if ($('.articles').length) {
            $('.articles .article__body p').matchHeight({ byRow: false });
        }



        // ----------- Toggle Mobile categories' Dropdown list ----------- //
        $('.js-select-category').on('click', function () {
            $(this).parent().toggleClass('open');
        });

        mainnavanimate = function () {
            if (window.innerWidth < 1020) {
                $('.header-lower .nav__list > li > *').on('click', function (e) {

                    $('.nav__list.top-menu > .has-submenu').removeClass('active');
                    $(this).parent().toggleClass('active');

                    var $otherLis = $('.header-lower .nav__list > li > *').not(this).parent();

                    if ($otherLis.hasClass('active')) {
                        $otherLis.removeClass('active');
                        $(this).parent().addClass('active');
                    }

                    e.preventDefault();
                    e.stopPropagation();
                });

                $('.nav__list.top-menu > .has-submenu > *').on('click', function (e) {

                    $('.header-lower .nav__list > li').removeClass('active');
                    $(this).parent().toggleClass('active');

                    var $otherLis = $('.nav__list.top-menu > .has-submenu > *').not(this).parent();

                    if ($otherLis.hasClass('active')) {
                        $otherLis.removeClass('active');
                        $(this).parent().addClass('active');
                    }

                    e.preventDefault();
                    e.stopPropagation();
                });

                $('.site-nav .nav__list .nav__level-hidden > *').on('click', function (e) {
                    e.stopPropagation();
                });
            }
        };


        mainnavanimate();

        // ----------- Minimize texts for Directors ----------- //


        //---- take 2 ---- //
        if ($('.director__cv hr').length) {
            $('.director__cv').each(function () {
                var counter = 1;
                var $this = $(this);
                var dir = $this.html();
                var splitted = dir.split('<hr>');

                if (splitted[1]) {
                    //console.log($this.html());
                    var sp = splitted[0] + '<a href="#" class="link link--more more--gold js-link--more">Show more</a>' + '<span style="display:none;">' + splitted[1] + '</span>' +
                        '<p><a href="#" class="link link--more more--gold link--less js-link--less" style="display:none;">Show less</a></p>';
                    $this.html(sp);
                }
            });

        }

        $('a.js-link--more').click(function (event) {
            event.preventDefault();
            $(this).hide();
            $(this).next().show();
            $(this).parents('.director__cv').find('.js-link--less').show();
            $(this).parents('.director__cv').find('p').show();
        });

        $('a.js-link--less').click(function (event) {
            event.preventDefault();
            $(this).parents('.director__cv').find('.js-link--more').show().prev().show();
            $(this).parents('.director__cv').find('.js-link--more').show().next().hide();
            $(this).parents('.director__cv').find('p').not('.first').hide();
        });

        // ----------- Datepicker init for NAV centre list ----------- //
        if ($('[data-toggle="datepicker"]').length) {
            $('.r').on('click', function () {
                $(this).parent().click();
                //console.log('click t');
            });
            var container = $('.nav-centre__list');
            $.get({
                url: "/api/NavCentre/dates"
            }).done(function (response) {
                //console.log('dates response:');
                //console.log(response);

                var arrDates = [];

                if (response != '') {
                    arrDates = response.split(",");
                }                

                var qsDate = getParameterByName('date');

                var initDate = null;

                if (qsDate != null) {
                    var year = qsDate.substr(0, 4);

                    if (qsDate.substr(4, 1) == "0")
                        var month = qsDate.substr(5, 1);
                    else
                        var month = qsDate.substr(4, 2);

                    if (qsDate.substr(6, 1) == "0")
                        var day = qsDate.substr(7, 1);
                    else
                        var day = qsDate.substr(6, 2);

                    initDate = year + ',' + month + ',' + day;

                    $('[data-toggle="datepicker"]').datepicker({
                        trigger: '.nav-centre__date',
                        filter: function (date) {
                            var formatedDate = date.getFullYear().toString() + ("0" + (date.getMonth() + 1)).slice(-2).toString() + ("0" + date.getDate()).slice(-2).toString();
                            return arrDates.indexOf(formatedDate) > -1;
                        },
                        date: new Date(initDate),
                        format: 'dd/mm/yyyy'
                    });

                    //setTimeout(function () {
                    //    $('[data-toggle="datepicker"]').datepicker({
                    //        trigger: '.nav-centre__date',
                    //        filter: function (date) {
                    //            var formatedDate = date.getFullYear().toString() + ("0" + (date.getMonth() + 1)).slice(-2).toString() + ("0" + date.getDate()).slice(-2).toString();
                    //            return arrDates.indexOf(formatedDate) > -1;
                    //        },
                    //        date: new Date(initDate),
                    //        format: 'dd/mm/yyyy'
                    //    });
                    //}, 1000);

                }
                else {
                    //setTimeout(function () {

                        qsDate = arrDates[0];
                        // console.log('qs: ' + qsDate);

                        var year = qsDate.substr(0, 4);

                        if (qsDate.substr(4, 1) == "0")
                            var month = qsDate.substr(5, 1);
                        else
                            var month = qsDate.substr(4, 2);

                        if (qsDate.substr(6, 1) == "0")
                            var day = qsDate.substr(7, 1);
                        else
                            var day = qsDate.substr(6, 2);

                        initDate = year + ',' + month + ',' + day;

                        $('[data-toggle="datepicker"]').datepicker({
                            trigger: '.nav-centre__date',
                            filter: function (date) {
                                var formatedDate = date.getFullYear().toString() + ("0" + (date.getMonth() + 1)).slice(-2).toString() + ("0" + date.getDate()).slice(-2).toString();
                                return arrDates.indexOf(formatedDate) > -1;
                            },
                            date: new Date(initDate),
                            format: 'dd/mm/yyyy'
                        });

                    //}, 1000);
                }

                $('[data-toggle="datepicker"]').on('pick.datepicker', function (e) {
                    //console.log('toggle: ' + { e }); 
                    var selectedDate = e.date;
                    var formatedDate = e.date.getFullYear().toString() + ("0" + (e.date.getMonth() + 1)).slice(-2).toString() + ("0" + e.date.getDate()).slice(-2).toString();
                    var url = [location.protocol, '//', location.host, location.pathname].join('');
                    window.location.href = url + '?date=' + formatedDate;
                });

            })
        }
        // ----------- End Datepicker init for NAV centre list ----------- //



        // ----------- Activate Overlay when Datepicker shows ----------- //
        if ($('.js-datepicker').length) {

            $('.js-datepicker').on('click', function () {
                //console.log('datepicker click');
                $('.overlay').show(60, function () {
                    $('.overlay').removeAttr('style');
                });
            });

            $('.datepicker-container').on('click', function (e) {
                e.stopPropagation();
            });
        }

        if ($('.overlay').length) {
            $('.overlay').on('click', function () {

                if ($('.popup').length) {
                    $('.popup').animate({ 'top': '-2000px' }, 500, function () {
                        $('.overlay').fadeOut('fast');
                    });
                }

                else { $('.overlay').fadeOut('fast'); }
            });
        }

        if ($('.js-open-form').length) {
            $('.js-open-form').on('click', function () {
                $(this).toggleClass('form-open');
                $(this).siblings('.form-wrapper').toggleClass('open');
            });

            if ($('.scfValidationSummary ul').length) {
                $('.js-open-form').addClass('form-open');
                $('.section__form').addClass('form-invalid');
                $('.js-open-form').siblings('.form-wrapper').addClass('open');
            }
        }


        // ----------- Activate Bank holidays popups ----------- //
        if ($('.popup').length) {
            $('.js-activate').on('click', function () {
                var $popup = $(this).siblings('.popup');

                $('.overlay').fadeIn(200, function () {
                    $popup.animate({ 'top': '70px' }, 200);
                });
            });
        }



        // ----------- Close Bank holidays popups ----------- //
        $('.js-popup__close').on('click', function () {
            $(this).parent().animate({ 'top': '-2000px' }, 500, function () {
                $('.overlay').fadeOut('fast');
            });
        });

        // ----------- Media Gallery @ article / Slick Slider Init ----------- //
        if ($('.article__gallery .gallery__item').length > 1) {
            $('.article__gallery').slick({
                dots: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        dots: false,
                        arrows: true
                    }
                }]
            });
        }

        if ($('.js-cta-slick').length) {
            $('.js-cta-slick').slick({
                dots: false,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 700,
                fade: true
            });
        }
    });

    // ----------- on Resize ----------- //
    window.addEventListener('resize', function () {
        //mainnavanimate();			
        if (window.innerWidth > 1019) {
            $('.site-nav .nav__list > li').removeClass('active');
            $('.burger-icon').removeClass('open');
            $('.site-header').removeClass('menu-open');
            $("body").removeClass("stop-scrolling");
        }
    });


    //progressive image

    window.onload = function () {
        if ($('.js-top-image').length) {
            var placeholder = document.querySelector('.js-top-image'),
                small = placeholder.querySelector('.loadThis')

            // 1: load small image and show it
            var img = new Image();
            img.srcset = small.srcset;
            img.onload = function () {
                small.parentElement.classList.add('loaded');
            };

        }
    }

    /*
		function initialize() {
		  var mapProp = {
		    center:new google.maps.LatLng(37.99040,23.77011),
		    zoom: 17,
		    scrollwheel: false,
		    draggable: false,
		    disableDefaultUI: true,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		  var map = new google.maps.Map(document.getElementById("googleMap2"),mapProp);
		} 
		    
		google.maps.event.addDomListener(window, 'load', initialize); */

    function highLightLabel() {
        var $target = $(".js-label input, .js-label textarea");

        $target.each(function () {
            var text_value = $(this).val();
            if (text_value != '') {
                $(this).parents('.form__animitem').addClass('filled');
            }
        });

        $target.bind('blur', function () {
            if (!$(this).val() || $(this).hasClass('error')) {
                if (!$(this).val())
                    $(this).parents('.form__animitem').removeClass('filled');
            }
        });
        $target.bind('focus', function () {
            if (!$(this).val() || $(this).hasClass('error')) {
                $(this).parents('.form__animitem').addClass('filled');
            }
        });
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})(jQuery);