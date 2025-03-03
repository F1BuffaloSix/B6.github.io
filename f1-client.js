document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.game-overlay');
  
  function setupDevice() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 1024;
    
    // Eliminar todos los event listeners existentes
    overlay.removeEventListener('touchstart', handleTouch);
    document.removeEventListener('mousedown', handleMouseClick);
    document.removeEventListener('keydown', handleKeyDown);
    
    if (isMobile) {
      // Configuración para móvil/tablet
      overlay.classList.add('show-overlay');
      overlay.addEventListener('touchstart', handleTouch, { passive: false });
      console.log("Modo móvil/tablet activado");
    } else {
      // Configuración para PC
      overlay.classList.remove('show-overlay');
      document.addEventListener('mousedown', handleMouseClick, { passive: false });
      document.addEventListener('keydown', handleKeyDown, { passive: false });
      console.log("Modo PC activado");
    }
  }

  function handleTouch(event) {
    event.preventDefault();
    tap(event);
  }
  
  function handleMouseClick(event) {
    if (event.button === 0) tap(event);
  }
  
  function handleKeyDown(event) {
    if (event.key === ' ') tap(event);
  }

  setupDevice();
  window.addEventListener('resize', setupDevice);
});

const lights = Array.prototype.slice.call(document.querySelectorAll('.light-strip'));
const time = document.querySelector('.time');
const best = document.querySelector('.best span');
let bestTime = Number(localStorage.getItem('best')) || Infinity;
let started = false;
let lightsOutTime = 0;
let raf;
let timeout;

function formatTime(time) {
  time = Math.round(time);
  let outputTime = time / 1000;
  if (time < 10000) {
    outputTime = '0' + outputTime;
  }
  while (outputTime.length < 6) {
    outputTime += '0';
  }
  return outputTime;
}

if (bestTime != Infinity) {
  best.textContent = formatTime(bestTime);
}

function start() {
  for (const light of lights) {
    light.classList.remove('on');
  }

  time.textContent = '00.000';
  time.classList.remove('anim');

  lightsOutTime = 0;
  let lightsOn = 0;
  const lightsStart = performance.now();

  function frame(now) {
    const toLight = Math.floor((now - lightsStart) / 1000) + 1;

    if (toLight > lightsOn) {
      for (const light of lights.slice(0, toLight)) {
        light.classList.add('on');
      }
      lightsOn = toLight;
    }

    if (toLight < 5) {
      raf = requestAnimationFrame(frame);
    } else {
      const delay = Math.random() * 4000 + 1000;
      timeout = setTimeout(() => {
        for (const light of lights) {
          light.classList.remove('on');
        }
        lightsOutTime = performance.now();
      }, delay);
    }
  }

  raf = requestAnimationFrame(frame);
}

function end(timeStamp) {
  cancelAnimationFrame(raf);
  clearTimeout(timeout);

  if (!lightsOutTime) {
    time.textContent = "Jump start!";
    time.classList.add('anim');
    return;
  } else {
    const thisTime = timeStamp - lightsOutTime;
    time.textContent = formatTime(thisTime);

    if (thisTime < bestTime) {
      bestTime = thisTime;
      best.textContent = time.textContent;
      localStorage.setItem('best', thisTime);

      if (typeof confetti !== 'undefined') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }

    time.classList.add('anim');
  }
}

function tap(event) {
  let timeStamp = performance.now();

  if (!started && event.target && event.target.closest && event.target.closest('a')) return;
  if (event.preventDefault) event.preventDefault();

  if (started) {
    end(timeStamp);
    started = false;
  } else {
    start();
    started = true;
  }
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}