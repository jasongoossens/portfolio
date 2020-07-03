const navToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

function showMenu() {
  menu.classList.toggle("display-menu");
}

function hideMenu() {
  menu.classList.remove("display-menu");
  console.log("lmkjlm");
}

navToggle.addEventListener("click", (e) => {
  showMenu();
  e.stopPropagation();
});

window.onwheel = hideMenu;
window.onscroll = hideMenu;
window.ontouchmove = hideMenu;
document.addEventListener("click", hideMenu);
