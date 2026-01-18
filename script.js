const throttle = (fn, delay = 50) => {
  let last = 0;
  return () => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn();
    }
  };
};

const progress = document.getElementById("scroll-progress");
const header = document.querySelector(".header");
const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const updateUI = () => {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  progress.style.width = `${(scrollTop / height) * 100}%`;
  header.classList.toggle("scrolled", scrollTop > 30);

  reveals.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 120) {
      section.classList.add("active");
    }
  });

  let current = "";
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", throttle(updateUI));
window.addEventListener("load", updateUI);

console.log("Portfolio ready 🚀");
