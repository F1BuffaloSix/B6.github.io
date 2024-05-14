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

const images = document.querySelectorAll('.image-container img');
const dots = document.querySelectorAll('.indicator .dot');
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove('active');
    img.classList.add('hidden');
    if (i === index) {
      img.classList.add('active');
      img.classList.remove('hidden');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showImage(currentIndex);
  });
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}, 5000);
