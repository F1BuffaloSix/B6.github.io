window.onload = function() {
  window.scrollTo(0, 0);
}

let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;

  // Función para mostrar/ocultar la barra de navegación
  
  if (prevScrollPos > currentScrollPos) {
    document.querySelector(".navbar").classList.add("visible");
    document.querySelector(".navbar").classList.remove("hidden");
  } else {
    document.querySelector(".navbar").classList.add("hidden");
    document.querySelector(".navbar").classList.remove("visible");
  }
  prevScrollPos = currentScrollPos;

  // Función para mostrar/ocultar el botón de "Ir arriba"
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 150) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// Get the button:
let mybutton = document.getElementById("myBtn");

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