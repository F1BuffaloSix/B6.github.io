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
  // Utiliza scrollIntoView() con el comportamiento de desplazamiento suave
  document.documentElement.scrollIntoView({ behavior: 'smooth' });
}

