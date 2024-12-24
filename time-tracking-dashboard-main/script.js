async function our_infos() {
    let infos= await fetch("data.json").then( 
        info => info.json()
    );
    let cardis= document.querySelectorAll(".cardi");
    for (let i = 0; i < infos.length; i++) {
        let cardi= cardis[i];
        let info= infos[i];
        
        cardi.querySelector(".label_1").innerHTML= info.title;
    };
    document.querySelectorAll(".infos ul li").forEach((li)=> {
        li.addEventListener("click",(event)=>{
            let li = event.currentTarget;
            switch (li.innerHTML) {
                case "Daily":
                    document.querySelector(".monthly").classList.remove("info_active");
                    document.querySelector(".weekly").classList.remove("info_active");
                    document.querySelector(".daily").classList.add("info_active");

                    for (let i = 0; i < cardis.length; i++) {
                        let cardi= cardis[i];
                        let info= infos[i];
                        cardi.querySelector(".time h1").innerHTML= info["timeframes"]["daily"].current + "hrs";
                        cardi.querySelector(".time p").innerHTML= "Last day - " + info["timeframes"]["daily"].previous + "hrs"; 
                    };
                    break;

                case "Weekly":
                    document.querySelector(".monthly").classList.remove("info_active");
                    document.querySelector(".daily").classList.remove("info_active");
                    document.querySelector(".weekly").classList.add("info_active");

                    for (let i = 0; i < cardis.length; i++) {
                        let cardi= cardis[i];
                        let info= infos[i];
                        cardi.querySelector(".time h1").innerHTML= info["timeframes"]["weekly"].current + "hrs";
                        cardi.querySelector(".time p").innerHTML= "Last week - " + info["timeframes"]["weekly"].previous + "hrs"; 
                    };
                    break;

                case "Monthly":
                    document.querySelector(".daily").classList.remove("info_active");
                    document.querySelector(".weekly").classList.remove("info_active");
                    document.querySelector(".monthly").classList.add("info_active");

                    for (let i = 0; i < cardis.length; i++) {
                        let cardi= cardis[i];
                        let info= infos[i];
                        cardi.querySelector(".time h1").innerHTML= info["timeframes"]["monthly"].current + "hrs";
                        cardi.querySelector(".time p").innerHTML= "Last month - " + info["timeframes"]["monthly"].previous + "hrs"; 
                    };
                    break;
            }
                
        });    
    });
}