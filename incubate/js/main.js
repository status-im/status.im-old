function initMap() {
}

(function () {
    var app = document.querySelector('.application');
    var appPage = document.querySelector('.page--application');
    var successPage = document.querySelector('.page--success');
    var appInputs = document.querySelectorAll('.application input');
    var textAreas = [].slice.call(document.querySelectorAll('textarea[data-adaptheight]'));
    var parallaxEls = [].slice.call(document.querySelectorAll('.parallax[data-parallax]'));
    var tlMain;
    var firstAnimation = {
        oneCircle: {
            ease: 'Power3.easeOut',
            rotation: 180,
            color: '#cceef0'
        },
        twoCircle: {
            ease: 'Power2.easeOut',
            rotation: 180,
            color: '#98dce2'
        },
        threeCircle: {
            ease: 'Power1.easeOut',
            rotation: 180,
            color: '#62cbd3'
        },
        settings: {
            desktop: {
                circleRadius: 140,
                oneCircleX: 60,
                twoCircleX: 100,
                threeCircleX: 130
            },
            tablet: {
                circleRadius: 120,
                oneCircleX: 70,
                twoCircleX: 100,
                threeCircleX: 130
            },
            mobile: {
                circleRadius: 50,
                oneCircleX: 20,
                twoCircleX: 40,
                threeCircleX: 60
            }
        }
    };
    var settings = firstAnimation.settings.desktop;
    var styles = {
        silver: [
            {
                "stylers": [
                    {
                        "color": "#b3bbbe"
                    },
                    {
                        "saturation": -65
                    },
                    {
                        "lightness": -100
                    }
                ]
            },
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b3bbbe"
                    }
                ]
            },
            {
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#d2d9db"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c9d0d2"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e0e5e7"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    }
    var markers = {
        one: {
            position: {lat: 52.52000659999999, lng: 13.404953999999975},
            url: 'http://dvlp.cc/projects/status-lp2//img/pages/page_five/dot.svg'
        },
        two: {
            position: {lat: 37.566535, lng: 126.97796919999996},
            url: 'http://dvlp.cc/projects/status-lp2//img/pages/page_five/dot.svg'
        },
        three: {
            position: {lat: 51.5073509, lng: -0.12775829999998223},
            url: 'http://dvlp.cc/projects/status-lp2//img/pages/page_five/dot.svg'
        },
        four: {
            position: {lat: 52.3702157, lng: 4.895167899999933},
            url: 'http://dvlp.cc/projects/status-lp2//img/pages/page_five/dot.svg'
        }
    };
    var map;
    var zoom = window.innerWidth > 991 ? 2.5 : 1;

    window.addEventListener('resize', function () {
        zoom = window.innerWidth > 991 ? 2.5 : 1
    });

    if (typeof Swiper === 'function') {
        var mySwiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
            slidesPerView: 'auto'
        });
    }

    function adjustHeight(textareaElement, minHeight) {
        var outerHeight = parseInt(window.getComputedStyle(textareaElement).height, 10);
        var diff = outerHeight - textareaElement.clientHeight;
        textareaElement.style.height = 0;
        textareaElement.style.height = Math.max(minHeight, textareaElement.scrollHeight + diff) + 'px';
    }

    function tlMainInit() {
        tlMain = new TimelineMax({
            repeat: -1,
            repeatDelay: .5
        });
        tlMain
            .fromTo('.circle--one', 1.5, {x: 0}, {
                x: -(settings.oneCircleX),
                transformOrigin: (settings.circleRadius + settings.oneCircleX + 'px') + ' center'
            })
            .fromTo('.circle--two', 1.5, {x: 0}, {
                x: -(settings.twoCircleX),
                transformOrigin: (settings.circleRadius + settings.twoCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.circle--three', 1.5, {x: 0}, {
                x: -(settings.threeCircleX),
                transformOrigin: (settings.circleRadius + settings.threeCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.circle--four', 1.5, {x: 0}, {
                x: settings.oneCircleX,
                transformOrigin: (settings.circleRadius - settings.oneCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.circle--five', 1.5, {x: 0}, {
                x: settings.twoCircleX,
                transformOrigin: (settings.circleRadius - settings.twoCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.circle--six', 1.5, {x: 0,
                transformOrigin: (settings.circleRadius - settings.threeCircleX + 'px') + ' center'}, {
                x: settings.threeCircleX,
                transformOrigin: (settings.circleRadius - settings.threeCircleX + 'px') + ' center',
            }, 0)

            .fromTo('.circle--four', 1.5, {rotation: 0}, {
                rotation: firstAnimation.oneCircle.rotation,
                ease: firstAnimation.oneCircle.ease
            }, 1.5)
            .fromTo('.circle--five', 1.5, {rotation: 0}, {
                rotation: firstAnimation.twoCircle.rotation,
                ease: firstAnimation.twoCircle.ease
            }, 1.5)
            .fromTo('.circle--six', 1.5, {rotation: 0}, {
                rotation: firstAnimation.threeCircle.rotation,
                ease: firstAnimation.threeCircle.ease
            }, 1.5)

            .fromTo('.circle--one', 1.5, {rotation: 0}, {
                rotation: firstAnimation.oneCircle.rotation,
                ease: firstAnimation.oneCircle.ease
            }, 1.5)
            .fromTo('.circle--two', 1.5, {rotation: 0}, {
                rotation: firstAnimation.twoCircle.rotation,
                ease: firstAnimation.twoCircle.ease
            }, 1.5)
            .fromTo('.circle--three', 1.5, {rotation: 0}, {
                rotation: firstAnimation.threeCircle.rotation,
                ease: firstAnimation.threeCircle.ease
            }, 1.5)

            .to('.circle--one', 1, {x: 0, transformOrigin: 'center center'}, 3)
            .to('.circle--two', 1, {x: 0, transformOrigin: 'center center'}, 3)
            .to('.circle--three', 1, {x: 0, transformOrigin: 'center center'}, 3)
            .to('.circle--four', 1, {x: 0, transformOrigin: 'center center'}, 3)
            .to('.circle--five', 1, {x: 0, transformOrigin: 'center center'}, 3)
            .to('.circle--six', 1, {x: 0, transformOrigin: 'center center'}, 3);
    }

    function isElementVisible(el) {
        var rect     = el.getBoundingClientRect(),
            vWidth   = window.innerWidth || document.documentElement.clientWidth,
            vHeight  = window.innerHeight || document.documentElement.clientHeight,
            efp      = function (x, y) { return document.elementFromPoint(x, y) };

        if (rect.right < 0 || rect.bottom < 0
            || rect.left > vWidth || rect.top > vHeight)
            return false;

        return (
            el.contains(efp(rect.left,  rect.top))
            ||  el.contains(efp(rect.right, rect.top))
            ||  el.contains(efp(rect.right, rect.bottom))
            ||  el.contains(efp(rect.left,  rect.bottom))
        );
    }

    initMap = function () {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.44494696552117, lng: 67.82485539999993},
            zoom: zoom,
            mapTypeControl: false
        });


        var icon = {
            url: markers.one.url,
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        var icon2 = {
            url: markers.two.url,
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        var icon3 = {
            url: markers.three.url,
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        var icon4 = {
            url: markers.four.url,
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };


        var marker = new google.maps.Marker({
            position: markers.one.position,
            icon: icon,
            map: map
        });
        var marker2 = new google.maps.Marker({
            position: markers.two.position,
            icon: icon2,
            map: map
        });
        var marker3 = new google.maps.Marker({
            position: markers.three.position,
            icon: icon3,
            map: map
        });
        var marker4 = new google.maps.Marker({
            position: markers.four.position,
            icon: icon4,
            map: map
        });


        map.setOptions({styles: styles['silver']});
    };

    if (appInputs && appInputs.length) {
        appInputs.forEach(function (elem) {
            elem.addEventListener('focus', function () {
                elem.previousElementSibling.classList.add('hovered');
            });
            elem.addEventListener('blur', function () {
                if (elem.value.length > 0) return false;
                elem.previousElementSibling.classList.remove('hovered');
            })
        });
    }

    if (textAreas && textAreas.length) {
        textAreas.forEach(function (el) {
            el.style.overflowY = 'hidden';
            var minHeight = el.previousElementSibling.scrollHeight;
            el.addEventListener('input', function () {
                adjustHeight(el, minHeight);
            });
            window.addEventListener('resize', function () {
                adjustHeight(el, minHeight);
            });

            el.addEventListener('focus', function () {
                el.previousElementSibling.classList.add('hovered');
                el.parentNode.classList.add('hovered');
            });
            el.addEventListener('blur', function () {
                if (el.value.length > 0) return false;
                el.previousElementSibling.classList.remove('hovered');
                el.parentNode.classList.remove('hovered');
            });

            adjustHeight(el, minHeight);
        });
    }

    window.addEventListener('scroll', function () {
        window.requestAnimationFrame(function () {
            parallaxEls.forEach(function (el, i) {
                var current = parallaxEls[i];
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (window.innerWidth < 991) {
                    current.style.transform = 'translate3d(0, 0, 0)';
                } else {
                    current.style.transform = 'translate3d(0,' + scrolled * 0.2 + 'px, 0)';
                }

            })
        })
    });

    window.addEventListener('resize', function () {
        var prevRadius = settings.circleRadius;
        if (document.documentElement.clientWidth < 768) {
            document.querySelector('body').classList.add('mobile');
            if (mySwiper && mySwiper.destroyed) {
                mySwiper = new Swiper('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    slidesPerView: 'auto'
                });
            } else {
                mySwiper.update();
            }
            settings = firstAnimation.settings.mobile;
        } else if (document.documentElement.clientWidth < 992) {
            document.querySelector('body').classList.add('mobile');
            settings = firstAnimation.settings.tablet;
            mySwiper.destroy(false);
        } else {
            mySwiper.destroy(false);
            document.querySelector('body').classList.remove('mobile');
            settings = firstAnimation.settings.desktop;
        }
        if (prevRadius !== settings.circleRadius) {
            tlMain.stop();
            TweenMax.set(".circle", {clearProps:"all"});
            tlMainInit();
            tlMain.restart();
        }
    });

    if (app) {
        app.addEventListener('submit', function (e) {
            e.preventDefault();
            appPage.classList.add('hide');
            successPage.classList.add('show');
        });
    }

    if (document.documentElement.clientWidth < 768) {
        document.querySelector('body').classList.add('mobile');
        settings = firstAnimation.settings.mobile;
        if (mySwiper && mySwiper.destroyed) {
            mySwiper.init();
        } else {
            mySwiper.update();
        }
    }
    else if (document.documentElement.clientWidth< 992) {
        document.querySelector('body').classList.add('mobile');
        settings = firstAnimation.settings.tablet;
        mySwiper.destroy(false);
    } else {
        mySwiper.destroy(false);
        document.querySelector('body').classList.remove('mobile');
        settings = firstAnimation.settings.desktop;
    }

    console.log(document.documentElement.clientWidth, window.innerWidth);

    tlMainInit();


    var sc1 = {
        el: document.getElementById('sc1'),
        elParent: document.querySelector('.sc1'),
        elBottom: document.querySelector('.sc1bottom'),
        inVP: false,
        showed: false
    };
    var sc2 = {
        el: document.getElementById('sc2'),
        elParent: document.querySelector('.sc2'),
        elLine: document.querySelector('.sc2line'),
        inVP: false,
        showed: false
    };
    var sc3 = {
        el: document.getElementById('sc3'),
        elParent: document.querySelector('.sc3'),
        inVP: false,
        showed: false
    };
    var sc4 = {
        el: document.getElementById('sc4'),
        elParent: document.querySelector('.sc4'),
        inVP: false,
        showed: false
    };
    var sc5 = {
        el: document.getElementById('sc5'),
        elParent: document.querySelector('.sc5'),
        inVP: false,
        showed: false
    };

    window.addEventListener('scroll', function () {
        if (isElementVisible(sc1.elParent) !== sc1.inVP) {
            if (isElementVisible(sc1.elParent)) {
                sc1.inVP = true;
                TweenMax.fromTo('#purse2', 2, {rotation: -22},{rotation: -12, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#purse1', 2, {rotation: -32},{rotation: -26, ease: Elastic.easeOut.config(1, 0.3)});

            } else {
                sc1.inVP = false;
                TweenMax.to('#purse2', .8, {rotation: -12, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#purse1', .8, {rotation: -26, ease: Elastic.easeOut.config(1, 0.3)})
            }
        }
        if (isElementVisible(sc2.elLine) !== sc2.inVP) {
            if (isElementVisible(sc2.elLine)) {
                sc2.inVP = true;
                TweenMax.to(sc2.el, .1, {scale: 1.5});
                TweenMax.fromTo('#legal2', 2, {y: 0},{y: -20, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#legal3', 2, {y: 0},{y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#legal4', 2, {y: 0},{y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#legal5', 2, {y: 0},{y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#legal6', 2, {y: 0},{y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('#legal7', 2, {y: 0},{y: -30, ease: Elastic.easeOut.config(1, 0.3)});

            } else {
                sc2.inVP = false;
                TweenMax.to('#legal2', .8, {y: -20, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#legal3', .8, {y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#legal5', .8, {y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#legal6', .8, {y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#legal7', .8, {y: -30, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('#legal8', .8, {y: -30, ease: Elastic.easeOut.config(1, 0.3)});
            }
        }
        if (isElementVisible(sc3.elParent) !== sc3.inVP) {
            if (isElementVisible(sc3.elParent)) {
                sc3.inVP = true;
                TweenMax.fromTo('#mentorIcon', 2.5, {y: 0},{y: 20, ease: Elastic.easeOut.config(1, 0.3)});

            } else {
                sc3.inVP = false;
                TweenMax.to('#mentorIcon', .8, {y: 0, ease: Elastic.easeOut.config(1, 0.3)});
            }
        }
        if (isElementVisible(sc4.elParent) !== sc4.inVP) {
            if (isElementVisible(sc4.elParent)) {
                sc4.inVP = true;
                TweenMax.fromTo('.marketingIcon', 2.5, {y: 30},{y: 0, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('.marketingIcon2', 2.8, {y: 30},{y: 0, ease: Elastic.easeOut.config(1, 0.3)});

            } else {
                sc4.inVP = false;
                TweenMax.to('.marketingIcon', .8, {y: 0, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.to('.marketingIcon2', .8, {y: 0, ease: Elastic.easeOut.config(1, 0.3)});
            }
        }
        if (isElementVisible(sc5.elParent) !== sc5.inVP) {
            if (isElementVisible(sc5.elParent)) {
                sc5.inVP = true;
                TweenMax.fromTo('.structureIcon', 2.5, {y: -20},{y: 0, ease: Elastic.easeOut.config(1, 0.3)});
                TweenMax.fromTo('.structureIcon2', 2.8, {y: -10},{y: 0, ease: Elastic.easeOut.config(1, 0.3)});

            } else {
                sc5.inVP = false;
                TweenMax.to('.structureIcon', .8, {y: 0, ease: Elastic.easeOut.config(1, 0.3)});
            }
        }

    });



    'use strict';
    // Feature Test
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
        // Function to animate the scroll
        var smoothScroll = function (anchor, duration) {
            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop + 50;
            var distance = endLocation - startLocation;
            var increments = distance / (duration / 16);
            var stopAnimation;
            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };
            // If scrolling down
            if (increments >= 0) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);
        };
        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scroll');
        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {
            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function (e) {
                // Prevent the default link behavior
                e.preventDefault();
                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');
                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }
            }, false);
        });
    }
}());