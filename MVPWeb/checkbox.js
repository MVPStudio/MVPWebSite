document.body.addEventListener('click', function(evt) {
  if (evt.target.type == "checkbox") {
    var container = evt.target.parentNode.parentNode; 
    container.classList.toggle('checked');
    if (!evt.target.checked) {
      var childCheckboxes = container.querySelectorAll('.sub-choices input[type="checkbox"]');
      Array.prototype.forEach.call(childCheckboxes, function(input) {
        input.checked = false;
      });
    } 
  }
});