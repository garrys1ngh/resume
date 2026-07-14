/* Auto typing and deleting name */
/* Auto typing and deleting multiple names */

const texts = [
    "Gurinder Singh",
    "Accommodation Supervisor",
    "Facilities Supervisor",
    "Customer Handler"];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

    let display = document.getElementById("typing");
    let currentText = texts[textIndex];

    if (!deleting) {

        display.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typingEffect, 1500); // Pause before deleting
            return;
        }

    } else {

        display.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length; // Next text
        }

    }

    setTimeout(typingEffect, deleting ? 80 : 120);
}

typingEffect();



/* Mobile Navigation */

const menu=document.getElementById("menuBtn");

const sidebar=document.querySelector(".sidebar");


menu.onclick=function(){

sidebar.classList.toggle("active");

};





/* Hide menu after click */


document.querySelectorAll("nav a").forEach(link=>{


link.onclick=function(){

sidebar.classList.remove("active");

};


});





/* Scroll Animation */


const sections=document.querySelectorAll(".section");


function reveal(){


sections.forEach(section=>{


let position=section.getBoundingClientRect().top;


let screen=window.innerHeight;


if(position < screen-100){

section.classList.add("show");

}


});


}



window.addEventListener("scroll",reveal);


reveal();