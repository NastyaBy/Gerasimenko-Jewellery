var questions = document.querySelector('.questions');
var accordionHeading = questions.querySelectorAll('h3');


if (accordionHeading) {
  accordionHeading.forEach(function (item) {
    item.addEventListener('click', function () {
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
    });
  });
}
