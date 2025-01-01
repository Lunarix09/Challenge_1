// Initialiser le drag-and-drop après le chargement de la page
document.addEventListener("DOMContentLoaded", initDragAndDrop);

document.querySelector(".downloadImageBtn").addEventListener("click", (event) => {

    // Créer un élément <a> pour le téléchargement
    const a = document.createElement("a");
    a.href = "images/image-avatar.jpg"; // Chemin de l'image
    a.download = "image-avatar.jpg"; // Nom du fichier à télécharger

    // Ajouter temporairement l'élément au DOM et simuler un clic
    document.body.appendChild(a);
    a.click();

    // Supprimer l'élément <a> après le téléchargement
    document.body.removeChild(a);
});

let file= "";
let extension = "";
let size= "";

document.querySelector("#img_input").addEventListener("change", (event)=>{
    file= event.target.files[0];
    size= file.size;
    if (file) {
        extension = file.name.split('.')[1];
        verify_files();
    }
    if (extension && size <= 5000) {
        document.querySelector(".label_2").classList.remove("error");  
        document.querySelector(".label_2 img").src = "images/icon-info.svg"; 
    } 
});
document.querySelector(".buttons .remove_btn").addEventListener("click", (event)=>{
        event.preventDefault();
        document.querySelector("#img_input").value = "";
        extension = "";
        file= "";
        document.querySelector("#img_input_field span").style.backgroundImage = `url('')`;
        document.querySelector("#img_input_field span img").style.display= "flex";
        document.querySelector("#img_input_field p").style.display= "flex";
        document.querySelector("#img_input_field .buttons").style.display= "none";
});

document.querySelector(".buttons .change_btn").addEventListener("click", (event)=>{
        event.preventDefault();
        document.querySelector("#img_input").value = "";
        extension = "";
        file= "";
        document.querySelector("#img_input_field span").style.backgroundImage = `url('')`;
        document.querySelector("#img_input_field span img").style.display= "flex";
        document.querySelector("#img_input_field p").style.display= "flex";
        document.querySelector("#img_input").click(); 
});

function initDragAndDrop() {
    // Empêcher le comportement par défaut
    ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
        document.querySelector("#img_input_field").addEventListener(event, (e) => e.preventDefault());
        document.querySelector("#img_input_field").addEventListener(event, (e) => e.stopPropagation());
    });
    // Ajout de la classe `drag-over` lors du survol
    ["dragenter", "dragover"].forEach((event) => {
        document.querySelector("#img_input_field").addEventListener(event, () => document.querySelector("#img_input_field").classList.add("img_input_field_hover"));
    });

    // Suppression de la classe `drag-over` lorsqu'on quitte la zone
    ["dragleave", "drop"].forEach((event) => {
        document.querySelector("#img_input_field").addEventListener(event, () => document.querySelector("#img_input_field").classList.remove("img_input_field_hover"));
    });

    // Gérer les fichiers glissés
    document.querySelector("#img_input_field").addEventListener("drop", (e) => {
        file = e.dataTransfer.files[0];
        size= file.size;
        if (file) {
            extension = file.name.split('.')[1];
            verify_files();
        }
        if (extension && size <= 5000) {
            document.querySelector(".label_2").classList.remove("error");  
            document.querySelector(".label_2 img").src = "images/icon-info.svg"; 
        } 
    });
}

function verify_files() {
    if (file && (extension == "jpg" || extension == "jpeg"|| extension == "png") && size <= 5000 ) {
        document.querySelector("#img_input_field span img").style.display= "none";
        document.querySelector("#img_input_field span").style.backgroundImage = `url('images/${file.name}')`;
        //document.querySelector("#img_input_field span img").classList.add("avatar");
        document.querySelector("#img_input_field p").style.display= "none";
        document.querySelector("#img_input_field .buttons").style.display= "flex";
        
        extension = true;
    } else {
        extension = false;
    }
};

function validate_email(email) {
    let regexp = new RegExp("^[a-zA-Z0-9&._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]");
    return regexp.test(email);
}
document.querySelector(".h3").addEventListener("click", ()=>{
    location.reload();
});
document.querySelector(".field_3 #field_email").addEventListener("change", ()=>{
    let email= document.querySelector(".field_3 #field_email").value;
    if (validate_email(email)) {
        document.querySelector(".field_3 .error").style.display= "none"; 
        document.querySelector(".field_3 #field_email").style.borderColor= "hsl(252, 6%, 83%)"; 
    }
});
document.querySelector(".submit").addEventListener("click", (event)=>{
    event.preventDefault();
    let email= document.querySelector(".field_3 #field_email").value;

    if (validate_email(email) && extension) {
        document.querySelector(".label_2").classList.remove("error");  
        document.querySelector(".label_2 img").src = "images/icon-info.svg"; 

        document.querySelector(".field_3 .error").style.display= "none";
        document.querySelector(".field_3 #field_email").style.borderColor= "hsl(252, 6%, 83%)"; 

        document.querySelector(".div_2  .span").style.backgroundImage = `url('images/${file.name}')`;
        document.querySelector(".div_2  div h5").innerHTML = document.querySelector("#field_name").value;
        document.querySelector(".div_2  div span p").innerHTML = document.querySelector("#field_github_name").value;
        document.querySelector(".h1_t span").innerHTML = document.querySelector("#field_name").value;
        document.querySelector(".user_infos span").innerHTML = document.querySelector("#field_email").value;

        document.querySelector("form").classList.add("form_out");        
        setTimeout(() => {
            document.querySelector("form").style.display = "none";
            document.querySelector(".h1").style.display = "none";
            document.querySelector(".p").style.display = "none";
        }, 800);

        setTimeout(() => {
            document.querySelector(".ticket_infos").style.display = "flex";
        }, 900);      
          
        setTimeout(() => {
            document.querySelector(".ticket").classList.add("popIn");
        }, 2000);   

        setTimeout(() => {
            document.querySelector(".ticket").classList.remove("popIn");
            document.querySelector(".ticket").style.display = "flex";
            document.querySelector(".attribution").scrollIntoView({ 
                behavior: 'smooth', 
                block: "center",
            }); 
        }, 2500);        

        let date= new Date();
        let day = date.getDate();// Jour du mois (1-31);
        let month = date.getMonth() + 1; // Mois (1-12, car indexé à partir de 0)
        let year = date.getFullYear(); // Année
        document.querySelector(".date").innerHTML = `#${day}${month}${year}`;
        
        //document.querySelector("form").reset();
        //location.reload();
    } else {
        if (!extension) {
            document.querySelector(".label_2").classList.add("error"); 
            document.querySelector(".field_1 .error").style.display= "flex"; 
            document.querySelector(".label_2 img").src = "images/icon-info_error.svg"; 
        }
        if (!validate_email()) {
            document.querySelector(".field_3 .error").style.display= "flex"; 
            document.querySelector(".field_3 #field_email").style.borderColor= "hsl(7, 88%, 67%)"; 
        }
    }
});