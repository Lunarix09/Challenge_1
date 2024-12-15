document.querySelector(".share").addEventListener("click",(event)=>{
    
    // Obtenir les coordonnées du bouton
    let position = event.target.getBoundingClientRect();

    // Coordonner par rapport à la fenêtre
    let x = position.left; // Distance du côté gauche
    let y = position.top;  // Distance du haut

    document.querySelector(".popup").classList.add("active");
    document.querySelector(".popup").classList.add("fadeIn")
    
    let popup = document.querySelector(".popup");
    popup.style.top= (y- 45) + "px";
    popup.style.left= x + "px";

    let screenWidth = window.innerWidth;

    // Ajustement pour éviter les débordements
    if (x + popup.offsetWidth > screenWidth) {
        popup.style.left = (screenWidth - popup.offsetWidth*0.86) + "px";
    }
    document.querySelector(".share").disabled=true;    
})
document.addEventListener("click", (e) => {
    if (!e.target.closest(".popup") && !e.target.closest(".share")) {
        let pop= document.querySelector(".popup");
        document.querySelector(".popup").classList.add("fadeOut");
        if (pop) { 
            setTimeout(() => {
                pop.classList.remove("active", "fadeIn", "fadeOut");
            }, 600);  
        }
        document.querySelector(".share").disabled= false;    

    }
});

let mediaQuery = window.matchMedia("(max-width: 587px)");

function show_popup(mediaQuery) {
    if (mediaQuery.matches) {
        document.querySelector(".popup").classList.remove("active");
        document.querySelector(".popup_1").style.display ="flex";

        document.querySelector(".popup_1").classList.add("fadeIn1");

        document.querySelector(".popup").style.display ="none";
        
        setTimeout(() => {
            document.querySelector(".right_side .share").style.display ="none";
            

            document.querySelector(".popup_1 .share img").src= "images/icon-share_1.png";

            document.querySelector(".right_side").style.borderRadius = "0";            
        }, 20);
    }
        
};
document.querySelector(".right_side .share").addEventListener("click", () => show_popup(mediaQuery));


document.addEventListener("click", (e) => {
    if (!e.target.closest(".popup_1") && !e.target.closest(".share")) {
        let popup_1= document.querySelector(".popup_1");

        if (popup_1) {
            document.querySelector(".popup_1").classList.add("fadeOut1");

            setTimeout(() => {
                 document.querySelector(".popup_1").style.display ="none";
                document.querySelector(".right_side .share").style.display ="block";
                document.querySelector(".popup_1").classList.remove("fadeOut1", "fadeIn1");
            }, 600);
        } 
        if (mediaQuery.matches) {
           document.querySelector(".right_side").style.borderRadius = "0 0 16px 16px";
        }   
        
    }
});