const group = document.querySelector('.group');

if (group) {
  const scrollWidth = group.scrollWidth / 2;
  group.style.setProperty('--scroll-width', `${scrollWidth}px`);
}

// sidebar (unchanged)
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menu.addEventListener("click", () => {
    sideBar.classList.remove("close-sidebar");
    sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", () => {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
});
