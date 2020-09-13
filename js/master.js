// general constant variables
const IMGS_PATH = "../images/";
// Random background vars
let backgroundOption = true;
let backgroundInterval;
// Check if there is main color in local storage
let mainColor = localStorage.getItem('color_option');
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    document.querySelectorAll('.colors-list li').forEach(li => {
        li.classList.remove('active');
        if (li.dataset.color === mainColor) {
            li.classList.add('active');
        }
    });
}
// Check if there is background in local storage
let randomBackgroundState = localStorage.getItem('background_option');
if (randomBackgroundState !== null) {
    backgroundOption = randomBackgroundState !== 'no';
    document.querySelectorAll('.random-background span').forEach(element => {
        element.classList.remove('active');
        if (element.dataset.background === randomBackgroundState) {
            element.classList.add('active');
        }
    });
}
// Check if there is bullets option in local storage
let bulletsNavigationState = localStorage.getItem('bullets_option');
if (bulletsNavigationState !== null) {
    document.querySelector('.nav-bullet').style.display = bulletsNavigationState === 'yes' ? 'block' : 'none';
    document.querySelectorAll('.bullets-navigation span').forEach(element => {
        element.classList.remove('active');
        if (element.dataset.bullets === bulletsNavigationState) {
            element.classList.add('active');
        }
    });
}
// Settings box toggling
document.querySelector('.gear-icon').onclick = function() {
    this.classList.toggle('fa-spin');
    document.querySelector('.settings-box').classList.toggle('open');
};
// Add colors to list items in Settings box and Switching colors
document.querySelectorAll('.colors-list li').forEach(li => {
    li.style.backgroundColor = li.dataset.color;
    li.addEventListener('click', (e) => {
        handleActive(e);
        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // set color on local storage
        localStorage.setItem('color_option', e.target.dataset.color);
    });
});
// Switch random background option
document.querySelectorAll('.random-background span').forEach(element => {
    element.addEventListener('click',function(e) {
        handleActive(e);
        localStorage.setItem('background_option', e.target.dataset.background);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomBackgrounds();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval); 
        }
    });
});
// Check bullets navigation
document.querySelectorAll('.bullets-navigation span').forEach(element => {
    element.addEventListener('click',function(e) {
        handleActive(e);
        localStorage.setItem('bullets_option', e.target.dataset.bullets);
        if (e.target.dataset.bullets === 'yes') {
            document.querySelector('.nav-bullet').style.display = 'block';
        } else {
            document.querySelector('.nav-bullet').style.display = 'none';
        }
    });
});
// To change backgrounds randomly
function randomBackgrounds() {
    // Change images for landing page element
    let landingPageElement = document.querySelector('.landing-page');
    // Declare images
    let imagesArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    // Change images for landing page element each 1 sec
    if (backgroundOption)  {
        backgroundInterval = setInterval(() => {
            var randNum = Math.floor(Math.random() * imagesArr.length);
            landingPageElement.style.backgroundImage = 'url("' + IMGS_PATH + imagesArr[randNum] + '")';
        }, 1000);
    }
}
randomBackgrounds();
// Select skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function() {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window height
    let windowHeight = this.innerHeight;
    // window scrollTop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};
// Create Popup with the image
let ourGallery = document.querySelectorAll('.gallery .images-box img');
ourGallery.forEach(img => {
    img.addEventListener('click', event => {
       // Create overlay element with popup-overlay class
       let overlay = document.createElement('div');
       overlay.className = 'popup-overlay';
       // Append overlay to body
       document.body.appendChild(overlay);
       // Create Popup box element with popup-box class
       let popupBox = document.createElement('div');
       popupBox.className = 'popup-box';
       // Create Popup Image element with popup-box class
       let popupImage = document.createElement('img');
       popupImage.src = img.src;
       // Append popup image to popupbox element
       popupBox.appendChild(popupImage);
        // Append popup box to body
        document.body.appendChild(popupBox);
        // Add heading
        if (img.alt !== null && img.alt !== "") {
            // Create heading element for image
            let imageHeading = document.createElement('h3');
            // Create text for heading element
            let imageText = document.createTextNode(img.alt);
            // Append imageText to imageHeading
            imageHeading.appendChild(imageText);
            // Prepend heading element to popup box
            popupBox.prepend(imageHeading);
            // Create the close span
            let closeButton = document.createElement('span');
            // Create close button text
            let closeButtonText = document.createTextNode('X');
            // Append text to close button
            closeButton.appendChild(closeButtonText);
            // Add class to close button
            closeButton.className = 'close-button';
            // Add close button to popup box
            popupBox.prepend(closeButton);
            // Add action to close button
            closeButton.addEventListener('click', e => {
                popupBox.remove();
                overlay.remove(); 
            });
        }
    });
});

function scrollToViews(elements) {
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
// Get all bullets
scrollToViews(document.querySelectorAll('.nav-bullet .bullet'));
// Get all links
scrollToViews(document.querySelectorAll('.links a'));
// Handle Active status
function handleActive(event) {
    event.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    // add active class to current item
    event.target.classList.add('active');
}
// Reset options button
document.querySelector('.reset-options').onclick = function(e) {
    //stop propagation
    e.stopPropagation();
    localStorage.clear();
    window.location.reload();
};
// Toggle menu
let toggleButton = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');
toggleButton.onclick = function() {
    this.classList.toggle('menu-active');
    links.classList.toggle('open');
}
// stop propagation on menu
links.onclick = function(e) {
    e.stopPropagation();
}

document.addEventListener('click',(e) => {
    if (e.target !== toggleButton && e.target !== links) {
        // check if menu is open
        if (links.classList.contains('open')) {
            toggleButton.classList.toggle('menu-active');
            links.classList.toggle('open');
        }
    }
});
