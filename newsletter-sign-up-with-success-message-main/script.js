function valideremail(email) {
    let regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexp.test(email);
}
function send(email) {

    if (valideremail(email)) {
        document.querySelector(".sucess_message").classList.add("active");
        document.querySelector("#sucess_message").classList.add("fadeIn1");
        document.querySelector(".email").classList.remove("error");
        
        document.querySelector(".email").id= "email";
        document.querySelector(".placeholder_1").style.display= "none";
        
        setTimeout(() => {
            document.querySelector(".pop_up").classList.add("fadeIn");
        }, 300);
        
        document.querySelector("#sucess_message").addEventListener("click", (event) => {
            if (event.target == document.querySelector(".dismiss_btn") || event.target == document.querySelector("#sucess_message")) {
                document.querySelector(".pop_up").classList.add("fadeOut");
                setTimeout(() => {
                    document.querySelector("#sucess_message").classList.add("fadeOut1");
                }, 300);

                setTimeout(() => {
                    document.querySelector("#sucess_message").classList.remove("active", "fadeOut1");
                    document.querySelector(".pop_up").classList.remove("fadeOut", "fadeIn");
                }, 600);
            }
        })//email@company.com
    } else{
        document.querySelector(".email").classList.add("error");
        document.querySelector(".placeholder_1").style.display= "flex";
    } 
    document.querySelector(".email").addEventListener("change",()=>{
        document.querySelector(".email").classList.remove("error");
        document.querySelector(".placeholder_1").style.display= "none";
    });
}
document.querySelector(".submit").addEventListener("click",(event)=>{
    event.preventDefault();
    let email= document.querySelector(".email").value;
    send(email);
    setTimeout(() => {
        document.querySelector(".email").value="";
    }, 300); 
});
