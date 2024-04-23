let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    // Scrolling up, show the navbar
    document.querySelector(".navbar").classList.add("visible");
    document.querySelector(".navbar").classList.remove("hidden");
  } else {
    // Scrolling down, hide the navbar
    document.querySelector(".navbar").classList.add("hidden");
    document.querySelector(".navbar").classList.remove("visible");
  }
  prevScrollPos = currentScrollPos;
};


