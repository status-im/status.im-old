(function () {
    var parallaxEls = [].slice.call(document.querySelectorAll('.parallax[data-parallax]'));
    var leftAnimation = {
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
                circleRadius: 70,
                oneCircleX: 40,
                twoCircleX: 70,
                threeCircleX: 90
            },
            tablet: {
                circleRadius: 60,
                oneCircleX: 40,
                twoCircleX: 70,
                threeCircleX: 90
            },
            mobile: {
                circleRadius: 45,
                oneCircleX: 20,
                twoCircleX: 40,
                threeCircleX: 60
            }
        }
    };
    var rightAnimation = {
        settings: {
            rotation: 180,
            desktop: {
                circleRadius: 70,
                oneCircleY: 40,
                twoCircleY: 40,
                threeCircleY: 40
            },
            tablet: {
                circleRadius: 60
            },
            mobile: {
                circleRadius: 45
            }
        }
    };
    var settings = leftAnimation.settings.desktop;
    var animated = false;
    var animationHover = false;
    var leftCard = document.querySelector('.card--left');
    var tlLeft;
    var tlRight;
    var tlMain;

    function tlLeftStep1() {
        animated = true;
        TweenMax.fromTo(tlLeft, tlLeft.duration(), {progress: 0}, {
            progress: .75,
            onComplete: function () {
                animated = false;
                if (animationHover) {
                    tlLeftStep2();
                }
            }
        });
    }

    function tlLeftStep2() {
        animated = true;
        TweenMax.fromTo(tlLeft, tlLeft.duration(), {progress: .75}, {
            progress: 1, onComplete: function () {
                animated = false;
                tlLeftStep1()
            }
        })
    }

    function tlAnimationLeftInit() {
        tlLeft = new TimelineMax({
            paused: window.innerWidth > 991,
            repeat: window.innerWidth < 992 ? -1 : 0
        });
        tlLeft
            .fromTo('.lcircle--one', 1, {x: 0}, {
                x: -(settings.oneCircleX),
                transformOrigin: (settings.circleRadius + settings.oneCircleX + 'px') + ' center'
            })
            .fromTo('.lcircle--two', 1, {x: 0}, {
                x: -(settings.twoCircleX),
                transformOrigin: (settings.circleRadius + settings.twoCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.lcircle--three', 1, {x: 0}, {
                x: -(settings.threeCircleX),
                transformOrigin: (settings.circleRadius + settings.threeCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.lcircle--four', 1, {x: 0}, {
                x: settings.oneCircleX,
                transformOrigin: (settings.circleRadius - settings.oneCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.lcircle--five', 1, {x: 0}, {
                x: settings.twoCircleX,
                transformOrigin: (settings.circleRadius - settings.twoCircleX + 'px') + ' center'
            }, 0)
            .fromTo('.lcircle--six', 1, {x: 0}, {
                x: settings.threeCircleX,
                transformOrigin: (settings.circleRadius - settings.threeCircleX + 'px') + ' center'
            }, 0)

            .fromTo('.lcircle--four', 1.5, {rotation: 0}, {
                rotation: leftAnimation.oneCircle.rotation,
                ease: leftAnimation.oneCircle.ease
            }, 1)
            .fromTo('.lcircle--five', 1.5, {rotation: 0}, {
                rotation: leftAnimation.twoCircle.rotation,
                ease: leftAnimation.twoCircle.ease
            }, 1)
            .fromTo('.lcircle--six', 1.5, {rotation: 0}, {
                rotation: leftAnimation.threeCircle.rotation,
                ease: leftAnimation.threeCircle.ease
            }, 1)

            .fromTo('.lcircle--one', 1.5, {rotation: 0}, {
                rotation: leftAnimation.oneCircle.rotation,
                ease: leftAnimation.oneCircle.ease
            }, 1)
            .fromTo('.lcircle--two', 1.5, {rotation: 0}, {
                rotation: leftAnimation.twoCircle.rotation,
                ease: leftAnimation.twoCircle.ease
            }, 1)
            .fromTo('.lcircle--three', 1.5, {rotation: 0}, {
                rotation: leftAnimation.threeCircle.rotation,
                ease: leftAnimation.threeCircle.ease
            }, 1)

            .to('.lcircle--one', .5, {backgroundColor: leftAnimation.oneCircle.color}, 2.3)
            .to('.lcircle--two', .5, {backgroundColor: leftAnimation.twoCircle.color}, 2.3)
            .to('.lcircle--three', .5, {backgroundColor: leftAnimation.threeCircle.color}, 2.3)

            .to('.lcircle--four', .5, {backgroundColor: leftAnimation.oneCircle.color}, 2.3)
            .to('.lcircle--five', .5, {backgroundColor: leftAnimation.twoCircle.color}, 2.3)
            .to('.lcircle--six', .5, {backgroundColor: leftAnimation.threeCircle.color}, 2.3)

            .to('.lcircle--one', 1, {x: 0, transformOrigin: 'center center'}, 3.4)
            .to('.lcircle--two', 1, {x: 0, transformOrigin: 'center center'}, 3.4)
            .to('.lcircle--three', 1, {x: 0, transformOrigin: 'center center'}, 3.4)
            .to('.lcircle--four', 1, {x: 0, transformOrigin: 'center center'}, 3.4)
            .to('.lcircle--five', 1, {x: 0, transformOrigin: 'center center'}, 3.4)
            .to('.lcircle--six', 1, {x: 0, transformOrigin: 'center center'}, 3.4);
    }

    function tlAnimationRightInit() {
        tlRight = new TimelineMax({repeat: -1});
        tlRight
            .staggerTo('.fill', 1.3, {css: {height: '100%'}})
            .fromTo('.rcircle--one', 1, {rotation: 0}, {rotation: 180}, 1.3)
            .fromTo('.rcircle--two', 1, {rotation: 0}, {rotation: 180}, 1.3)
            .fromTo('.rcircle--two .fill', .1, {css: {bottom: 0, top: 'auto'}}, {css: {top: 0, bottom: 'auto'}})
            .fromTo('.rcircle--one .fill', .1, {css: {bottom: 'auto', top: 0}}, {css: {top: 'auto', bottom: 0}})
            .staggerTo('.fill', 1.3, {css: {height: 0}})
            .fromTo('.rcircle--one', 1, {rotation: 180}, {rotation: 360}, 3.6)
            .fromTo('.rcircle--two', 1, {rotation: 180}, {rotation: 360}, 3.6);
    }

    function tlMainInit() {
        tlMain = new TimelineMax({repeat: -1});
        tlMain
            .fromTo('.block--1', 2, {
                transformOrigin: 'center bottom',
                scaleY: 0,
                alpha: 0
            }, {transformOrigin: 'center bottom', scaleY: 0.4, alpha: 0.15}, 0)
            .fromTo('.block--2', 2, {
                transformOrigin: 'center bottom',
                scaleY: 0.4,
                alpha: 0.15
            }, {transformOrigin: 'center bottom', y: '-40%', scaleY: 0.3, alpha: 0.25}, 0)
            .fromTo('.block--3', 2, {transformOrigin: 'center bottom', y: '-40%', scaleY: 0.3, alpha: 0.25}, {
                y: '-70%',
                scaleY: 0.2,
                alpha: 0.4
            }, 0)
            .fromTo('.block--4', 2, {transformOrigin: 'center bottom', y: '-70%', scaleY: 0.2, alpha: 0.4}, {
                y: '-90%',
                scaleY: 0.07,
                alpha: 0.6
            }, 0)
            .fromTo('.block--5', 2, {transformOrigin: 'center bottom', y: '-90%', scaleY: 0.07, alpha: 0.6}, {
                y: '-97%',
                scaleY: 0.03,
                alpha: 0.9
            }, 0)
            .fromTo('.block--6', 2, {transformOrigin: 'center bottom', y: '-97%', scaleY: 0.03, alpha: 0.9}, {
                y: '-100%',
                scaleY: 0,
                alpha: 1
            }, 0)
            .fromTo('.block--7', .01, {
                transformOrigin: 'center bottom',
                y: '-100%',
                scaleY: 0,
                alpha: 1
            }, {transformOrigin: 'center bottom', scaleY: 0, alpha: 0}, 0);

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
        if (window.innerWidth < 768) {
            document.querySelector('body').classList.add('mobile');
            settings = leftAnimation.settings.mobile;
            if (prevRadius !== settings.circleRadius) {
                tlLeft.stop()
                TweenMax.set(".lcircle", {clearProps: "all"});
                tlAnimationLeftInit();
                tlLeft.restart();
            }
        } else if (window.innerWidth < 991 && window.innerWidth > 767) {
            document.querySelector('body').classList.add('mobile');
            settings = leftAnimation.settings.tablet;
            if (prevRadius !== settings.circleRadius) {
                tlLeft.stop()
                TweenMax.set(".lcircle", {clearProps: "all"});
                tlAnimationLeftInit();
                tlLeft.restart();
            }
        } else {
            document.querySelector('body').classList.remove('mobile');
            settings = leftAnimation.settings.desktop;
            if (prevRadius !== settings.circleRadius) {
                tlLeft.stop();
                TweenMax.set(".lcircle", {clearProps: "all"});
                tlAnimationLeftInit();
            }
        }
    });

    leftCard.addEventListener('mouseenter', function () {
        animationHover = true;
        if (!animated && animationHover && tlLeft.progress() === 0 && window.innerWidth > 991) {
            tlAnimationLeftInit();
            tlLeftStep1();
        } else if (!animated && animationHover && tlLeft.progress() !== 1 && window.innerWidth > 991) {
            tlLeftStep2();
        }

    });
    leftCard.addEventListener('mouseleave', function () {
        if (tlLeft.progress() !== 1 && window.innerWidth > 991) {
            animationHover = false;
        }
    });

    if (window.innerWidth < 991 &&  window.innerWidth > 768) {
        document.querySelector('body').classList.add('mobile');
        leftAnimation.circleRadius = 60;
        settings = leftAnimation.settings.tablet;
    } else if (window.innerWidth < 768) {
        document.querySelector('body').classList.add('mobile');
        leftAnimation.circleRadius = 45;
        settings = leftAnimation.settings.mobile;
    } else {
        document.querySelector('body').classList.remove('mobile');
        leftAnimation.circleRadius = 70;
    }

    tlAnimationLeftInit();
    tlAnimationRightInit();
    tlMainInit();
    tlLeft.progress(.75);

    'use strict';
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
})();