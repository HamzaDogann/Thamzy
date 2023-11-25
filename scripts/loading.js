document.addEventListener("DOMContentLoaded", ()=> {
    const loaderContainer = document.querySelector(".loading-overlay");
setTimeout(() => {
    loaderContainer.style.display = "none";
    document.body.style.overflow = 'auto';

}, 500);
    
       

    const upButton = document.getElementById("up-button");

    window.addEventListener("scroll", ()=> {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            upButton.style.display = "block";
        }
        else {
            upButton.style.display = "none";
        }
    });

    upButton.addEventListener("click", ()=> {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

});