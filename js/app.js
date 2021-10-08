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

const removeActiveClasses = (links) => {
    links.forEach((navLink) => {
        navLink.classList.remove('active');
    });
}

dynamicMenu();

/* Scroll   */
const scrollEffect = () => {
    const navLinks = document.querySelectorAll('.nav_link');
        for(const navLink of navLinks) {
            navLink.addEventListener('click',  function(e) {
                e.preventDefault();
                removeActiveClasses(navLinks);
                const links = navLink.getAttribute('href');
                document
                    .querySelector(links)
                    .scrollIntoView({ behavior: 'smooth' });
                navLink.classList.add('active');
            });
        }
    return;
}

scrollEffect();

const checkViewport = () => {
const startCheck = () => {  
    for(section of allSections) {
    const sec = section.getAttribute('data-nav').split('#')[1];
    const rect = document.getElementById(section).getBoundingClientRect();

    const isActive = rect.top <=window.innerHeight && rect.top>=0;

    if(isActive) {
        removeActiveClasses(sec);
        sec.classList.add('active');
        break;
    }

}
    startCheck();
    window.addEventListener('scroll', startCheck);
    return;
    
    } 
};
checkViewport();
