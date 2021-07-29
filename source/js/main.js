'use strict';

(function () {
  var noJsIndicator = document.querySelector('html.no-js');
  if (noJsIndicator) {
    noJsIndicator.classList.remove('no-js');
  }
})();

(function () {
  var layout = document.querySelector('.layout');
  var menuToggleBtn = document.querySelector('.js-menuToggle');
  if (menuToggleBtn) {
    var layoutHeader = document.querySelector('.layout__header');

    menuToggleBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      layout.classList.toggle('layout--is-menu');
      layoutHeader.classList.toggle('layout__header--is-menu');
    });
  }
})();

(function () {
  var questions = document.querySelector('.js-questions');

  var togglerHandleClick = function (evt) {
    evt.preventDefault();
    var item = evt.target;

    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      accordionHeading.forEach(function (element) {
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        }
      });
      item.classList.add('active');
    }
  };

  if (questions) {
    var activeQuestions = questions.querySelectorAll('.active');
    if (activeQuestions) {
      activeQuestions.forEach(function (item) {
        item.classList.remove('active');
      });
    }

    var accordionHeading = questions.querySelectorAll('a');
    if (accordionHeading) {
      accordionHeading.forEach(function (item) {
        item.addEventListener('click', togglerHandleClick);
      });
    }
  }
})();

(function () {
  var activeFilter = document.querySelectorAll('.active-filter');
  if (activeFilter) {
    activeFilter.forEach(function (item) {
      item.classList.remove('active-filter');
    });
  }
})();

(function () {
  var filter = document.querySelector('.filter');
  if (filter) {
    var accordionFilter = filter.querySelectorAll('a');

    if (accordionFilter) {
      accordionFilter.forEach(function (item) {
        item.addEventListener('click', function (evt) {
          evt.preventDefault();
          item.classList.toggle('active-filter');
        });
      });
    }
  }
})();

(function () {
  var sendForms = document.querySelectorAll('.js-sendForm');
  if (sendForms) {
    sendForms.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var form = trigger.closest('form');
        var inputEmail = form.querySelector('.js-email');
        var inputPassword = form.querySelector('.js-password');

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
})();

(function () {
  var layout = document.querySelector('.layout');
  var modalTriggers = document.querySelectorAll('.js-modalOpen');
  var lastFocus;

  var triggerHandleClick = function (trigger, evt) {
    var popupTrigger = trigger.dataset.popupTrigger;
    var popupModal = document.querySelector('[data-popup-modal=' + popupTrigger + ']');
    var popupFocusInput = trigger.dataset.popupFocusInput;
    var popupFocus = popupModal.querySelector(popupFocusInput);
    var bodyBlackout = popupModal.querySelector('.js-modalBlackout');
    var modalCloseBtn = popupModal.querySelector('.js-modalCloseBtn');
    var popupScrollable = trigger.dataset.popupScrollable;
    lastFocus = document.activeElement;

    if (popupFocus) {
      popupModal.setAttribute('tabindex', '0');
      popupFocus.focus();
    } else  {
      popupModal.setAttribute('tabindex', '0');
      popupModal.focus();
    }

    evt.preventDefault();
    popupModal.classList.add('is--visible');
    layout.classList.add('layout--no-scroll');

    if (bodyBlackout) {
      bodyBlackout.classList.add('is-blacked-out');

      bodyBlackout.addEventListener('click', function () {
        popupModal.classList.remove('is--visible');
        bodyBlackout.classList.remove('is-blacked-out');
        layout.classList.remove('layout--no-scroll');
      });
    }
    if (!popupScrollable) {
      layout.classList.add('layout--no-scroll');
    }

    modalCloseBtn.addEventListener('click', function () {
      popupModal.removeAttribute('tabindex');
      popupModal.classList.remove('is--visible');
      layout.classList.remove('layout--no-scroll');
      lastFocus.focus();

      if (bodyBlackout) {
        bodyBlackout.classList.remove('is-blacked-out');
      }
      if (!popupScrollable) {
        layout.classList.remove('layout--no-scroll');
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          e.preventDefault();
          popupModal.removeAttribute('tabindex');
          popupModal.classList.remove('is--visible');
          lastFocus.focus();

          if (bodyBlackout) {
            bodyBlackout.classList.remove('is-blacked-out');
          }
          if (!popupScrollable) {
            layout.classList.remove('layout--no-scroll');
          }
        }
      }
    });
  };

  if (modalTriggers) {
    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', triggerHandleClick.bind(null, trigger), false);
    });
  }
})();
