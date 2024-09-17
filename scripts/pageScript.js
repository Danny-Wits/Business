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
        duration: 0.6,
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

//!goto in Home

function gotoSectionInHome(id) {
  console.log(id);
  window.location.href = "index.html";
  sessionStorage.setItem("section", id);
}
