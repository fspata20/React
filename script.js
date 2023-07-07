function showMessage() {
    alert("Button was clicked!");
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('button');
    button.addEventListener('click', showMessage);
  });

var image = document.getElementById("myImage");

var hideButton = document.getElementById("hideButton");

hideButton.addEventListener("click", function() {
//   image.style.display = "none";
  document.getElementById("image").style.visibility = "hidden";
});
