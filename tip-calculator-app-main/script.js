let tip_percent= 0; 

document.querySelector(".reset_btn").addEventListener("click",(event)=>{
    document.querySelectorAll("input").forEach((inp)=> {
        inp.value="";
    });
    document.querySelector(".amount span h2").innerHTML= "0.00";
    document.querySelector(".total span h2").innerHTML= "0.00";
    tip_percent= 0;
    document.querySelectorAll(".btn_percent").forEach((btn) => {
        btn.classList.remove("btn_activate");
    });
    setTimeout(() => {
        document.querySelector(".bill_1 div").classList.remove("input_error");
        document.querySelector(".bill_1 .error").style.display="none";
        document.querySelector(".people div").classList.remove("input_error");
        document.querySelector(".people .error").style.display="none";
    }, 3005);
});

document.querySelectorAll(".btn_percent").forEach( (btn_percent)=> {
    btn_percent.addEventListener("click",(event)=>{
        document.querySelectorAll(".btn_percent").forEach((btn) => {
            btn.classList.remove("btn_activate");
        });
        setTimeout(() => {
            event.target.classList.add("btn_activate");
        }, 100);
        document.querySelector("#custom_btn").value= "";
        tip_percent= parseInt(event.target.innerHTML.replace("%", ""));
        tip();
    }); 
});

document.querySelector("#custom_btn").addEventListener("input", () => {
    document.querySelectorAll(".btn_percent").forEach((btn) => {
        btn.classList.remove("btn_activate");
    });
    tip_percent = parseFloat(document.querySelector("#custom_btn").value);
    tip();
});
document.querySelector("#bill").addEventListener("input", tip);
document.querySelector("#people_nb").addEventListener("input", tip);
    
function tip() {
    if (parseFloat(document.querySelector("#bill").value) > 0 && parseInt(document.querySelector("#people_nb").value) > 0) {
        document.querySelector(".amount span h2").innerHTML= ( ( parseFloat(document.querySelector("#bill").value) * (tip_percent / 100) ) / parseFloat(document.querySelector("#people_nb").value) ).toFixed(2);
        document.querySelector(".total span h2").innerHTML= ( ( parseFloat(document.querySelector(".amount h2").innerHTML) + parseFloat(document.querySelector("#bill").value) ) / parseFloat(document.querySelector("#people_nb").value ) ).toFixed(2);
    }
    setTimeout(() => {
        if (document.querySelector("#bill").value == 0) {
            document.querySelector(".bill_1 div").classList.add("input_error");
            document.querySelector(".bill_1 .error").style.display="flex";
        }else{
            document.querySelector(".bill_1 div").classList.remove("input_error");
            document.querySelector(".bill_1 .error").style.display="none";
        }
        if (document.querySelector("#people_nb").value == 0) {
            document.querySelector(".people div").classList.add("input_error");
            document.querySelector(".people .error").style.display="flex";
        }else{
            document.querySelector(".people div").classList.remove("input_error");
            document.querySelector(".people .error").style.display="none";
        }
    }, 2600);
}    
