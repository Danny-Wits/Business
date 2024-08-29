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
  document.getElementsByTagName("nav")[0].style.backdropFilter = active
    ? "blur(20px)"
    : "blur(0px)";
};

//!s2 hover
const s2Links = document.getElementsByClassName("list-container");
const s2LinksAnchors = document.getElementsByClassName("list-item");
const s2ImgContainer = document.getElementById("img-div");
let isMouseOver = false;

Array.from(s2Links).forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.classList.remove("none");
    isMouseOver = true;
    s2ImgContainer.style.backgroundImage = `url(${element.getAttribute(
      "data-image"
    )})`;
  });
  element.addEventListener("mouseleave", () => {
    element.classList.add("none");
    isMouseOver = false;
  });
});

//!s2 mobile animation
let s2Index = 0;

function animateS2() {
  if (!elementIsVisibleInViewport(s2)) {
    return;
  }
  if (s2Index == s2Links.length) {
    s2Index = 0;
  }
  if (s2Index == 0) {
    s2LinksAnchors[s2Links.length - 1].classList.remove("list-item-hover");
    s2Links[s2Links.length - 1].dispatchEvent(new Event("mouseleave"));
    s2Index++;
    s2Links[0].dispatchEvent(new Event("mouseenter"));
    s2LinksAnchors[0].classList.add("list-item-hover");
  } else {
    s2Links[s2Index - 1].dispatchEvent(new Event("mouseleave"));
    s2LinksAnchors[s2Index - 1].classList.remove("list-item-hover");
    s2Links[s2Index].dispatchEvent(new Event("mouseenter"));
    s2LinksAnchors[s2Index].classList.add("list-item-hover");
    s2Index++;
  }
}

const startAnimationS2 = () => {
  animateS2();
  setTimeout(startAnimationS2, 1000);
};

if (window.innerWidth < 600) {
  startAnimationS2();
}

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

//!s3 popup
const s3 = document.getElementById("s3");
const popUp = document.getElementById("popup");
const createPopUp = (e) => {
  const image = e.getAttribute("data-image");
  const title = e.getElementsByTagName("h2")[0].innerText;
  const info = e.getAttribute("data-info");
  popUp.getElementsByTagName("img")[0].src = image;
  popUp.getElementsByClassName("popUpTitle")[0].innerHTML = title;
  popUp.getElementsByClassName("popUpText")[0].innerHTML = info;
  popUp.style.display = "flex";
  gsap.fromTo(
    popUp,
    { opacity: 0, scale: 0.2 },
    { opacity: 1, scale: 1, duration: 0.3 }
  );
  s3.style.backgroundImage = `url(${image})`;
};

const closePopUp = () => {
  gsap.to(popUp, { opacity: 0, scale: 0.1, display: "none", duration: 0.3 });
};

//!s4 horizontal scroll

const scrollContainer = document.querySelector(".project-group");
scrollContainer.addEventListener("wheel", (e) => {
  const scrollLength = e.deltaY * 2;
  const scrollEndPosition =
    scrollContainer.scrollWidth - scrollContainer.clientWidth;
  if (scrollContainer.scrollLeft === 0 && scrollLength < 0) {
    return;
  }

  if (
    scrollContainer.scrollLeft >= scrollEndPosition - 10 &&
    scrollLength > 0
  ) {
    return;
  }
  e.preventDefault();
  scrollContainer.scrollLeft += scrollLength;
});
