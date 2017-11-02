var ip = require('ip')
var buildUrl = require('build-url')
var urlencode = require('urlencode')
var cookie = require('js-cookie')

var formWrapElement = document.querySelectorAll(".email-form")[0]
var formElement = document.querySelectorAll(".email-form__form")[0]
var emailField = document.querySelectorAll(".email-form__input--email")[0]
var submitButton = document.querySelectorAll(".email-form__input--sumbit")[0]
var successMessageElement = document.querySelectorAll(".email-form__success-message")[0]
var errorMessageElement = document.querySelectorAll(".email-form__error-message")[0]

var form_GUID = "31429f69-a0c2-45d6-af33-9e1af2d1b246"
var HUB_ID = "3954379"
var URL = "https://forms.hubspot.com/uploads/form/v2/" +  HUB_ID + "/" + form_GUID

var readCookie = cookie.get('hubspotutk')
var hutk = (readCookie) ? readCookie : ""

var ip = ip.address()
var redirectUrl = "https://hardwallet.status.im/welcome.html"

let data = {
    "hutk": hutk,
    "ipAddress": ip,
    "pageUrl": "http://status.im",
    "pageName": "Status Homepage"
}

var hs_context = urlencode(JSON.stringify(data))


formElement.addEventListener("submit", function(evt) {
  evt.preventDefault()

  var emailValueEncoded

  function validate() {
    var emailValue = emailField.value

    if(!isNotEmpty(emailValue)) {
      shakeForm()
      showErrorMessage("fieldError")
      return false
    }

    if(!isValidEmail(emailValue)) {
      shakeForm()
      showErrorMessage("fieldError")
      return false
    }

    emailValueEncoded = urlencode(emailValue)

    return emailValueEncoded
  }

  function isValidEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(value)
  }

  function isNotEmpty(value) {
    if (value == "" || value == null) {
      return false
    }
    return true
  }

  function shakeForm() {
    addClassToElement(formWrapElement, "email-form--error")
    setTimeout(function(){
			removeClassFromElement(formWrapElement, "email-form--error")
		}, 600)
  }

  function disableFields() {
    emailField.disabled = true
    submitButton.disabled = true
    addClassToElement(formElement, "email-form--loading")
  }

  function enableFields() {
    emailField.disabled = false
    submitButton.disabled = false
    removeClassFromElement(formElement, "email-form--loading")
  }

  function showSuccessMessage() {
    disableFields()
    addClassToElement(successMessageElement, "email-form__success-message--shown")
  }

  function showErrorMessage(type) {
    var errorText
    switch (type) {
      case "fieldError":
        errorText = "Please enter a valid email address"
        break
      case "requestError":
        errorText = 'Sorry, something went wrong with the request. Please <a href="mailto:support@status.im">let us know</a>'
        break
      default:
        errorText = ""
    }
    errorMessageElement.innerHTML = errorText
    addClassToElement(errorMessageElement, "email-form__error-message--shown")
  }

  function hideErrorMessage(type) {
    removeClassFromElement(errorMessageElement, "email-form__error-message--shown")
  }

  if (validate()) {
    sendRequest()
  }


  function sendRequest() {

    disableFields()
    hideErrorMessage()

    var theUrlParams = buildUrl({
      queryParams: {
        email: emailValueEncoded,
        hs_context: hs_context
      }
    })

    var request = new XMLHttpRequest()
    request.open('POST', URL, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.setRequestHeader('Access-Control-Allow-Origin', false)
    request.send(theUrlParams)

    request.onload = function() {
      enableFields()
      //204 when the form submissions is successful
      //302 when the form submissions is successful and a redirectUrl is included or set in the form settings.
      if(request.status == 204 || request.status == 302) {
        showSuccessMessage()
      } else {
        showErrorMessage("requestError")
      }
    }
  }
})


/*---Utils---*/
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
