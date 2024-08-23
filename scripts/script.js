let index = 0;
let running = true;
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
  document.getElementsByTagName("nav")[0].style.backdropFilter = active
    ? "blur(20px)"
    : "blur(0px)";
};

const s2Links = document.getElementsByClassName("list-container");
const s2ImgContainer = document.getElementById("img-div");
let isMouseOver = false;
console.log(Array.from(s2Links));
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

let s2Index = 0;

function animateS2() {
  if (s2Index == s2Links.length) {
    s2Index = 0;
  }
  if (s2Index == 0) {
    s2Links[s2Links.length - 1].dispatchEvent(new Event("mouseleave"));
    s2Index++;
    s2Links[0].dispatchEvent(new Event("mouseenter"));
  } else {
    s2Links[s2Index - 1].dispatchEvent(new Event("mouseleave"));
    s2Links[s2Index].dispatchEvent(new Event("mouseenter"));
    s2Index++;
  }
}

const startAnimationS2 = () => {
  animateS2();
  setTimeout(startAnimationS2, 3000);
};

if (window.innerWidth < 600) {
  startAnimationS2();
}
