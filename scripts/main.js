document.addEventListener("DOMContentLoaded", function() {
  const upButton = document.getElementById("up-button");
  
  window.addEventListener("scroll", function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      upButton.style.display = "block";
    } else {
      upButton.style.display = "none";
    }
  });

  upButton.addEventListener("click", function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  });
});



//! Media İşlemleri
const menu = document.querySelector('header .container .menu');
const mobileMenuButton = document.getElementById("mb-menu");
const menuicon = document.querySelector('#menuicon');


const navbar = document.getElementById("header-box");
let prevScrollPos = window.scrollY;

window.onscroll = function () {
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = `-${navbar.offsetHeight}px`;
  }

  prevScrollPos = currentScrollPos;
};


mobileMenuButton.addEventListener("click", () => {
  if (window.innerWidth < 748) {
    toggleMenu();
  }
});

menu.addEventListener("click", () => {
  if (window.innerWidth < 748) {
    toggleMenu();
  }
});

function toggleMenu() {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
    menuicon.innerHTML = "menu";
  } else {
    menu.style.display = "flex";
    menuicon.innerHTML = "close"; 
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 748) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
    menuicon.innerHTML = "menu";
  }
});


function showButtons(element) {
  const buttons = element.querySelector('.image-buttons');
  buttons.style.opacity = '1';
  buttons.style.transform = 'translateX(-50%) translateY(-50px)';
}

function hideButtons(element) {
  const buttons = element.querySelector('.image-buttons');
  buttons.style.opacity = '0';
  buttons.style.transform = 'translateX(-50%) translateY(0)';
}









