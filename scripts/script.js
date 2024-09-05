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
    setTimeout(startAnimation, 6000);
  }
};

//!loader

const loaderStart = () => {
  gsap.to(".loaderMask", {
    width: "100%",
    duration: 2,
    ease: "none",
    display: "none",
  });
};
const loaderEnd = () => {
  gsap.to(".loader", {
    x: "-100%",
    duration: 0.7,
    display: "none",
  });
  startAnimation();
};

document.addEventListener("DOMContentLoaded", (event) => {
  loaderStart();
  const image = document.querySelector("#last-img");
  if (image.complete) {
    setTimeout(loaderEnd, 500);
  } else {
    image.addEventListener("load", () => {
      setTimeout(loaderEnd, 200);
    });
  }
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
  });
};
//!scroll to function
const main = document.getElementsByTagName("main")[0];
const scrollToElement = (e, closeMenu, timeout) => {
  if (closeMenu && window.innerWidth <= 768) {
    if (timeout) {
      setTimeout(toggle, timeout);
    } else {
      toggle();
    }
  }
  const element = document.getElementById(e);
  main.scrollTop += element.getBoundingClientRect().y;
};

//!s5 pillar animation for mobile
const s5 = document.getElementsByClassName("pillar-group")[0];
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
if (window.innerWidth <= 768) {
  startS5Animation();
}

//! fill the form
const defaultMessage = {
  0: "HI ! _",
  3: "Hi there, I want to build a site for my _",
  2: "Hi there, I need a software solution for my _",
  4: "Hi there, I want to a mobile application for my _",
  5: "Hi there, I want to promote my _",
};
const nameF = document.getElementById("name");
const service = document.getElementById("topic");
const message = document.getElementById("message");
function fillInForm(index) {
  service.selectedIndex = index;
  message.textContent = defaultMessage[index];
  nameF.focus();
}
