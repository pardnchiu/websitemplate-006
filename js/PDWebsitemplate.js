let hover_observer = null;
let global_animation = null;
function unhover(element) {
  element.classList.add('unhover');
  var global_animation = setTimeout(() => {
    clearTimeout(global_animation);
    global_animation = null;
    element.classList.remove('unhover');
  }, 500);
};

let preY = null;
let scrollTimer = null;
window.onscroll = function() {
  const isOver  = (this.pageYOffset >= 16 * 4);
  const elmNav  = document.getElementById('nav');
  if (preY === null) return preY = this.pageYOffset;
  if (isOver) {
    elmNav.className = "toppest";
  } else if (elmNav.classList.contains("toppest")) {
    elmNav.className = "float";
  };
};


let animation_observer = null;
document.addEventListener("DOMContentLoaded", () => {
  const is_fine   = matchMedia('(pointer:fine)').matches;
  const is_coarse = matchMedia('(pointer:coarse)').matches;

  let animations = [].slice.call(document.querySelectorAll("*[animation='1']"));

  if ("IntersectionObserver" in window) {
    (function hover() {
      animation_observer = new IntersectionObserver((entries, observer) => {
        for (i = 0; i < entries.length; i++) {
          const e = entries[i];
          if (e.isIntersecting) {
            e.target.classList = "inview"
            // if (is_fine) {
            //   e.target.addEventListener('mouseout', (e) => {
            //     unhover(e.target);
            //   });
            // } else {
            //   e.target.addEventListener('click', (e) => {
            //     if (e.target.classList.contains('act')) e.target.classList.remove('act');
            //     else {
            //       if (document.querySelectorAll('.act')) document.querySelectorAll('.act').forEach((e) => {
            //         e.classList.remove('act');
            //       });
            //       e.target.classList.add('act');
            //     }
            //   });
            // }
          } else {
            // e.target.classList = "outview"
          }
        };
      });
      animations.forEach((element) => {
        animation_observer.observe(element);
      });
    }());
    // lazyloadObserver = new IntersectionObserver((entries, observer) => {
    //   for (i = 0; i < entries.length; i++) {
    //     const e = entries[i];
    //     if (e.isIntersecting) {
    //       let lazyImage = e.target;
    //       lazyImage.dataset.src.is200().then((r) => {
    //         lazyloadObserver.unobserve(lazyImage);
    //         lazyImage.src = lazyImage.dataset.src;
    //         lazyImage.classList.remove("lazyload");
    //         lazyImage.classList.remove('loading');
    //         lazyImage.removeAttribute("data-src");
    //       }).catch((err) => {
    //         lazyloadObserver.unobserve(lazyImage);
    //         lazyImage.src = '/icon/default/v.svg';
    //         lazyImage.classList.remove("lazyload");
    //         lazyImage.classList.remove('loading');
    //         lazyImage.removeAttribute("data-src");
    //       });
    //     };
    //   };
    // });
    // lazyloadImages.forEach(function (lazyImage) {
    //   lazyloadObserver.observe(lazyImage);
    // });
  };
});