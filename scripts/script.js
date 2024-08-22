const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  mobile: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
  multiplier: 2.5,
});

let index = 0;
let running = false;
const imageItemList = document.getElementsByClassName("img-item");
const pauseIcon = document.getElementById("pause-icon");
const forward = () => {
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
    setTimeout(startAnimation, 5000);
  }
};

document.addEventListener("DOMContentLoaded", startAnimation);

const navLinks = document.getElementById("link");

let active = false;
const toggle = () => {
  active = !active;
  navLinks.style.display = active ? "flex" : "none";
};
