/* Get all sections */
const aboutSection = document.querySelector("#about-me");
const contactSection = document.querySelector("#contact-me");
const hobbiesSection = document.querySelector("#my-hobbies");
const allSections = Array.from(document.querySelectorAll("section"));

/* Other selectors */
const unorderedList = document.querySelector(".nav_list");
const allLinks = document.querySelectorAll(".nav_link");
let activeLink = document.querySelector(".active");

/* Dynamic Menu */
const dynamicMenu = () => {
  for (const section of allSections) {
    const navLinks = document.createElement("a");
    const list = document.createElement("li");
    navLinks.className = "nav_link";
    list.className = "nav_item";
    navLinks.textContent = section.getAttribute("data-nav");
    navLinks.setAttribute("href", `#${section.getAttribute("id")}`);
    list.appendChild(navLinks);
    unorderedList.appendChild(list);
  }
  return;
};

/* Clear active class from all links */

const removeActiveClasses = (links) => {
  links.forEach((navLink) => {
    navLink.classList.remove("active");
  });
};

dynamicMenu();

/* Scroll  */
const scrollEffect = () => {
  const navLinks = document.querySelectorAll(".nav_link");
  for (const navLink of navLinks) {
    navLink.addEventListener("click", function (e) {
      e.preventDefault();
      removeActiveClasses(navLinks);
      const links = navLink.getAttribute("href");
      document.querySelector(links).scrollIntoView({ behavior: "smooth" });
      navLink.classList.add("active");
    });
  }
  return;
};

scrollEffect();

/* Active state */

const checkViewport = () => {
  const startCheck = () => {
    for (section of allSections) {
      const sec = section.getAttribute("data-nav").split("#")[1];
      const rect = document.getElementById(section).getBoundingClientRect();

      const isActive = rect.top <= window.innerHeight && rect.top >= 0;

      if (isActive) {
        removeActiveClasses(sec);
        sec.classList.add("active");
        /*This stops it from adding the active class to the rest of the section */

        break;
      }
    }

    /* Run function first before scroll listener is triggered */

    startCheck();
    window.addEventListener("scroll", startCheck);
    return;
  };
};
checkViewport();

/* Active state 2.0 */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li");

// event listener that listens on scroll
window.addEventListener("scroll", () => {
  let currentSection = "";

  // Go through the sections and figure out which section we're in
  sections.forEach((section) => {
    // how far each section is from the top of the page
    const sectionTop = section.offsetTop;
    console.log(section.id, ">> sectionTop = ", sectionTop);
    console.log("current location ", scrollY);

    // scrollY is how much we have scrolled in the page
    // I added a + 80 (height of the navbar) to offset the navbar
    // because on larger windows and safari (smh safari) even if you scrolled all the way down
    // contact us wouldnt be selected 

    // If that didn't make any sense - sorry lmao remove the + 80
    // open it on safari and try to scroll all the way down and I promise 
    // it'll make sense

    if ((scrollY + 80) >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  // Go through the nav links and remove prev active class and set the new active class
  navLinks.forEach((link) => {
    link.classList.remove("nav_link_active");

    // Gets the href value from the link inside the list item, which is #<section-id>
    const linkHref = link.firstChild.getAttribute("href");
    // Trim the # to get just the id
    const id = linkHref.substring(1);
    // console.log(linkHref, ">> id = ", id);

    // If the current section equals the id, add active class to the list item
    if (currentSection === id) {
      // console.log(currentSection, id);
      link.classList.add("nav_link_active");
    }
  });
});
