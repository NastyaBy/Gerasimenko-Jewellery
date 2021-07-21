'use strict';

var layout = document.querySelector('.layout');

var noJsIndicator = document.querySelector('html.no-js')
if (noJsIndicator) {
  noJsIndicator.classList.remove('no-js');
}

var menuToggleBtn = document.querySelector('.js-menuToggle');
if (menuToggleBtn) {
  var layoutHeader = document.querySelector('.layout__header');

  menuToggleBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    layout.classList.toggle('layout--is-menu');
    layoutHeader.classList.toggle('layout__header--is-menu');
  })
}

var questions = document.querySelector('.js-questions');
if (questions) {
  var accordionHeading = questions.querySelectorAll('h3');
  if (accordionHeading) {
    accordionHeading.forEach(function(item) {
      item.addEventListener('click', function() {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        } else {
          accordionHeading.forEach(function(element) {
            if (element.classList.contains('active')) {
              element.classList.remove('active');
            }
          });
          item.classList.add('active');
        }
      });
    });
  }
}

var filter = document.querySelector('.filter');
if (filter) {
  var accordionFilter = filter.querySelectorAll('h3');

  if (accordionFilter) {
    accordionFilter.forEach(function(item) {
      item.addEventListener('click', function() {
        item.classList.toggle('active-filter');
      });
    });
  }
}

var sendForms = document.querySelectorAll('.js-sendForm');
if (sendForms) {
  sendForms.forEach(function(trigger) {
    trigger.addEventListener('click', () => {
      var form = trigger.closest("form")
      var inputEmail = form.querySelector('.js-email');
      var inputPassword = form.querySelector('.js-password');

      console.log(form)

      if (inputEmail && inputPassword) {
        var obj = {
          name: inputEmail.value,
          tel: inputPassword.value,
        };

        var serialObj = JSON.stringify(obj);
        localStorage.setItem('order', serialObj);
      }
    });
  });
}

var modalTriggers = document.querySelectorAll('.js-modalOpen');
if (modalTriggers) {
  modalTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(evt) {
      var popupTrigger = trigger.dataset.popupTrigger;
      var popupModal = document.querySelector(
        '[data-popup-modal=' + popupTrigger + ']');
      var popupFocusInput = trigger.dataset.popupFocusInput;
      var popupFocus = popupModal.querySelector(popupFocusInput);
      var bodyBlackout = popupModal.querySelector('.js-modalBlackout');
      var modalCloseBtn = popupModal.querySelector('.js-modalCloseBtn');

      if (popupFocus) {
        popupFocus.focus();
      }

      evt.preventDefault();
      popupModal.classList.add('is--visible');
      bodyBlackout.classList.add('is-blacked-out');
      layout.classList.add('layout--no-scroll');

      bodyBlackout.addEventListener('click', function() {
        popupModal.classList.remove('is--visible');
        bodyBlackout.classList.remove('is-blacked-out');
        layout.classList.remove('layout--no-scroll');
      });

      modalCloseBtn.addEventListener('click', function() {
        popupModal.classList.remove('is--visible');
        bodyBlackout.classList.remove('is-blacked-out');
        layout.classList.remove('layout--no-scroll');
      });

      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
          if (popupModal.classList.contains('is--visible')) {
            e.preventDefault();
            popupModal.classList.remove('is--visible');
            bodyBlackout.classList.remove('is-blacked-out');
            layout.classList.remove('layout--no-scroll');
          }
        }
      });
    });
  });
}
