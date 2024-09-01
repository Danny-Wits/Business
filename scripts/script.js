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
  return top >= 0 && top < window.innerHeight - 20;
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
const navBar = document.getElementsByTagName("nav")[0];
const mobileNav = document.getElementsByClassName("mobile-nav")[0];
const toggleIcon = document.getElementById("toggle-icon");

let active = false;
const toggle = () => {
  if (active) closeNavBar();
  else {
    toggleIcon.classList.remove("bi-list");
    toggleIcon.classList.add("bi-x");
    navBar.classList.add("toggled");
    mobileNav.style.display = "flex";
    gsap.fromTo(
      mobileNav,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: "0",
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }
    );
  }
  active = !active;
};
const closeNavBar = () => {
  navBar.classList.remove("toggled");
  toggleIcon.classList.add("bi-list");
  toggleIcon.classList.remove("bi-x");
  gsap.to(mobileNav, {
    x: "100%",
    opacity: 0,
    display: "none",
    ease: "power4.out",
  });
};
//!scroll to function
const main = document.getElementsByTagName("main")[0];
const scrollToElement = (e, closeMenu) => {
  if (closeMenu && window.innerWidth < 720) toggle();
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
//!s5 pillar animation for mobile
const s5 = document.getElementById("s5");
const s5list = document.getElementsByClassName("pillar");
let s5index = 0;
function s5Animation() {
  if (!elementIsVisibleInViewport(s5)) {
    return;
  }
  s5list[s5index].classList.add("hover");
  s5index++;
}
let timeout = 3400;
const startS5Animation = () => {
  if (s5index == s5list.length) {
    setTimeout(() => {
      Array.from(s5list).forEach((e) => e.classList.remove("hover"));
    }, 800);
    s5index = 0;
    return;
  }

  setTimeout(startS5Animation, timeout);
  s5Animation();
  timeout = 300;
};
if (window.innerWidth <= 720) {
  startS5Animation();
}

//!s8 changing mvv
const imageDiv = document
  .getElementById("mmv")
  .getElementsByClassName("mvv-img")[0];
const titleDiv = document
  .getElementById("mmv")
  .getElementsByClassName("mvv-title")[0];
const subTitleDiv = document
  .getElementById("mmv")
  .getElementsByClassName("mvv-subtitle")[0];

const mvvButtonList = document.getElementsByClassName("mvv-btn");
function changeMVV(element) {
  const title = element.textContent;
  const image = element.getAttribute("data-image");
  const info = element.getAttribute("data-info");
  Array.from(mvvButtonList).forEach((e) => {
    e.classList.remove("active");
  });
  element.classList.add("active");
  imageDiv.style.backgroundImage = `url(${image}) `;
  titleDiv.textContent = title;
  subTitleDiv.textContent = info;
}
