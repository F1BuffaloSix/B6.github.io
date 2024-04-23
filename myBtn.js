// Get the button:
let mybutton = document.getElementById("myBtn");

// Cuando el usuario se desplaza hacia abajo desde la parte superior de la página, muestra el botón
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 150) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Cuando el usuario hace clic en el botón, se desplaza suavemente hacia arriba
function topFunction() {
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
  const scrollStep = Math.round(currentPosition / 10);

  function smoothScroll() {
    if (window.pageYOffset === 0) {
      clearInterval(scrollInterval);
    }
    window.scrollBy(0, -scrollStep);
  }

  const scrollInterval = setInterval(smoothScroll, 15);
}
