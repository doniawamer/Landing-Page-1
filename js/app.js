/* Get all sections */ 

const aboutSection = document.querySelector('#about-me');
const contactSection = document.querySelector('#contact-me');
const allSections = Array.from(document.querySelectorAll('section'));


const unorderedList = document.querySelector('.nav_list');
const allLinks = document.querySelectorAll('.nav_link');
let activeLink = document.querySelector('.active');

/* Dynamic Menu */
const dynamicMenu = () => {
    for(const section of allSections) {
        const navLinks = document.createElement('a');
        const list = document.createElement('li');
        navLinks.className = 'nav_link';
        list.className = 'nav_item';
        navLinks.textContent = section.getAttribute('data-nav');
        navLinks.setAttribute('href', `#${section.getAttribute('id')}`);
        list.appendChild(navLinks);
        unorderedList.appendChild(list);
    }
    return;
}

dynamicMenu();
