let index = 0;
let running = true;
let mobile = window.innerWidth < 600;
const imageItemList = document.getElementsByClassName("img-item");
const pauseIcon = document.getElementById("pause-icon");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s4 = document.getElementById("s4");

const elementIsVisibleInViewport = (el) => {
  const { top } = el.getBoundingClientRect();
  return top >= 0 && top < window.innerHeight;
};

const forward = () => {
  if (!elementIsVisibleInViewport(s1)) {
    return;
  }
  gsap.fromTo(
    imageItemList[index],
    { x: 0 },
    {
      x: "-100vw",
      duration: 1,
    }
  );
  if (index == imageItemList.length - 1) {
    index = 0;
  } else {
    index++;
  }

  gsap.fromTo(
    imageItemList[index],
    {
      x: "100vw",
    },
    { x: 0, duration: 1 }
  );
};

const pause = () => {
  if (!running) {
    pauseIcon.classList = ["bi bi-pause"];
    running = true;
    startAnimation();
  } else {
    pauseIcon.classList = ["bi bi-play"];
    running = false;
  }
};

const backward = () => {
  gsap.fromTo(
    imageItemList[index],
    { x: 0 },
    {
      x: "+100vw",
      duration: 1,
    }
  );

  if (index == 0) {
    index = imageItemList.length - 1;
  } else {
    index--;
  }

  gsap.fromTo(
    imageItemList[index],
    {
      x: "-100vw",
    },
    { x: 0, duration: 1 }
  );
};

const startAnimation = () => {
  if (running) {
    forward();
    setTimeout(startAnimation, 3000);
  }
};

//!loader
const loaderVideo = document.getElementById("loader-video");

loaderVideo.addEventListener("play", () => {
  gsap.to(".loaderMask", {
    width: "100%",
    duration: 2.2,
    ease: "none",
    display: "none",
  });
});
loaderVideo.addEventListener("ended", () => {
  // gsap.fromTo("#main", { y: "100%" }, { y: 0, duration: 1 });
  gsap.to(".loader", {
    x: "-100%",
    duration: 0.7,
    display: "none",
  });
  startAnimation();
});

document.addEventListener("DOMContentLoaded", (event) => {
  loaderVideo.play();
});
//!nav toggle
const navLinks = document.getElementById("link");

let active = false;
const toggle = () => {
  if (!mobile) return;
  active = !active;
  navLinks.style.display = active ? "flex" : "none";
};

//!scroll to function
const main = document.getElementsByTagName("main")[0];
const scrollToElement = (e, closeMenu) => {
  if (closeMenu) toggle();
  const element = document.getElementById(e);

  element.addEventListener("click", (event) => {
    event.preventDefault();
  });
  main.scrollTop += element.getBoundingClientRect().y;
};

//!s4 horizontal scroll

// const scrollContainer = document.querySelector(".project-group");
// scrollContainer.addEventListener("wheel", (e) => {
//   const scrollLength = e.deltaY * 2;
//   const scrollEndPosition =
//     scrollContainer.scrollWidth - scrollContainer.clientWidth;
//   if (scrollContainer.scrollLeft === 0 && scrollLength < 0) {
//     return;
//   }

//   if (
//     scrollContainer.scrollLeft >= scrollEndPosition - 10 &&
//     scrollLength > 0
//   ) {
//     return;
//   }
//   e.preventDefault();
//   scrollContainer.scrollLeft += scrollLength;
// });
