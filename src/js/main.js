let ScrollOver = require("./lib/ScrollOver.js")
let animateScroll = require("./lib/animatescroll.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let iphone = document.querySelectorAll(".phone-wrap--iphone")[0],
    android = document.querySelectorAll(".phone-wrap--android")[0],
    features = document.querySelectorAll(".features-wrap")[0],
    slideTwo = document.querySelectorAll(".slide--two")[0],
    slideThree = document.querySelectorAll(".slide--three")[0],
    slideSix = document.querySelectorAll(".slide--six")[0],
    languageSelect = document.querySelectorAll('.language-switcher')[0]

setTimeout(() => body.classList.add("shown"), 400)


document.querySelectorAll(".button--more")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

// document.querySelectorAll(".nav__item--features")[0].addEventListener('click', function(event){
//     animateScroll(slideTwo, 600, "easeInOutCubic", 0)
//     event.preventDefault()
// })
//
// document.querySelectorAll(".nav__item--about")[0].addEventListener('click', function(event){
//     animateScroll(slideThree, 600, "easeInOutCubic", 0)
//     event.preventDefault()
// })


new ScrollOver({
  keyframes : [
    {
      element : iphone,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 60]
        }
      ]
    },
    {
      element : android,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 110]
        }
      ]
    },
    {
      element : features,
      domain : [200, 800],
      animate: [
        {
          property : "translateY",
          range : [0, -40]
        }
      ]
    },
    {
      element : slideTwo,
      reveal:
        {
          when : 440,
          className: "slide--shown"
        }

    },
    {
      element : slideThree,
      reveal:
        {
          when : 1200,
          className: "slide--shown"
        }
    },
    {
      element : slideSix,
      reveal:
        {
          when : 2190,
          className: "slide--shown"
        }
    }
  ]
}).init()

/*--- QR popup ---*/

if(document.querySelectorAll(".nav__item--download")[0]) {
  document.querySelectorAll(".nav__item--download")[0].addEventListener('mouseover', function(event){
      showQRPopup()
  })

  document.querySelectorAll(".nav__item--download")[0].addEventListener('mouseout', function(event){
      hideQRPopup()
  })
}

function showQRPopup() {
  addClassToElement(document.querySelectorAll(".qr-popup")[0], "qr-popup--shown")
}

function hideQRPopup() {
  removeClassFromElement(document.querySelectorAll(".qr-popup")[0], "qr-popup--shown")
}

/*--- Language switcher ---*/
languageSelect.addEventListener('change', function changeLanguage() {
    const lang = languageSelect.options[languageSelect.selectedIndex].value;
    if (lang === 'en') {
      window.location = '/';
    } else if (lang === 'cn') {
      window.location = '//cn.status.im';
    } else {
      window.location = '/' + lang + '.html';
    }
});

/*--- Utils ---*/
function addClassToElement(element, className) {
  (element.classList) ? element.classList.add(className) : element.className += ' ' + className
  return element
}

function removeClassFromElement(element, className) {
  if(element.classList) {
    element.classList.remove(className)
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
  return element
}
