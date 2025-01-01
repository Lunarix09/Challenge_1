let desserts= document.querySelectorAll(".d");
document.querySelector(".cart h2 span").innerHTML= 0;
document.querySelector(".total_count").innerHTML= "$0";
let assets="";
document.querySelectorAll(".d .desserts_img").forEach((img)=> {img.src= "assets/images/loading.svg"});

async function our_assets() {
    assets= await fetch("data.json").then( 
        asset => asset.json()
    );
    for (let i = 0; i < desserts.length; i++) {
        let d= desserts[i];
        let d_json= assets[i].image;
        d.querySelector(".details p").textContent= assets[i].category;
        d.querySelector(".details h3").textContent= assets[i].name;
        d.querySelector(".details h5").textContent= "$" + assets[i].price;
        if (window.innerWidth <= 768) {
            d.querySelector(".desserts_img").src= d_json["tablet"];
            if (window.innerWidth <= 426) {
                d.querySelector(".desserts_img").src= d_json["mobile"];  
            }
        } else {
            d.querySelector(".desserts_img").src= d_json["desktop"];
        }
    }
}setTimeout(() => {our_assets()}, 1000);

document.querySelectorAll(".add_to_cart").forEach((add_bnt)=> {
    add_bnt.addEventListener("click", (event)=> {
        
        let d= event.currentTarget.closest(".d");
        d.querySelector(".desserts_img").classList.add("d_activate");

        let article= createArticle();
        d.querySelector(".counter").style.display= "flex";
        d.querySelector(".counter").className = "counter";
        d.querySelector(".counter").classList.add(`counter_${i}`);

        article.querySelector("h2").textContent= d.querySelector(".details h3").textContent;
        
        d.querySelector(".counter span").innerText= parseFloat(d.querySelector(".counter span").innerText) || 1; 
        let u_p= parseFloat(d.querySelector(".details h5").innerText.replace('$', ''));
        let n_art= parseFloat(d.querySelector(".counter span").innerText);

        article.querySelector(".n_article").innerHTML= n_art + "x";
        article.querySelector(".u_price").innerHTML= "@$" + u_p;
        
        article.querySelector(".n_article_x_u_price").innerHTML= "$" + (u_p *  n_art);
        
        document.querySelector(".confirm_order").style.display= "flex";
        document.querySelector(".empty").style.display= "none";
        d.querySelector(".add_to_cart").style.display= "none";
        
        document.querySelector(".articles").insertAdjacentElement("beforeend", article);
        document.querySelector(".cart").classList.add("cart_impt");
        article.style.display= "flex";

        document.querySelector(".cart h2 span").innerHTML= 1 + parseFloat(document.querySelector(".cart h2 span").innerHTML);
        document.querySelector(".total_count").innerHTML= "$" + ( parseFloat(document.querySelector(".total_count").innerText.replace('$', '')) + parseFloat(article.querySelector(".n_article_x_u_price").innerHTML.replace('$', '')) );
        
        i++;
    });
});

let i=1;
// Fonction pour créer l'élément "article"
function createArticle() {
    const articleDiv = document.createElement('div');
    articleDiv.className = `article article_${i} counter_${i}`;
  
    const dessertInfosDiv = document.createElement('div');
    dessertInfosDiv.className = 'dessert_infos';
  
    const h2 = document.createElement('h2');
  
    const infoDiv = document.createElement('div');
    
    const pArticle = document.createElement('p');
    pArticle.className = 'n_article counter_span';
  
    const spanUPrice = document.createElement('span');
    spanUPrice.className = 'u_price';
  
    const spanTotalPrice = document.createElement('span');
    spanTotalPrice.className = 'n_article_x_u_price';
  
    infoDiv.appendChild(pArticle);
    infoDiv.appendChild(spanUPrice);
    infoDiv.appendChild(spanTotalPrice);
  
    dessertInfosDiv.appendChild(h2);
    dessertInfosDiv.appendChild(infoDiv);
  
    const button = document.createElement('button');
    button.className="remove_btn";
    const img = document.createElement('img');
    img.src = 'assets/images/icon-remove-item.svg';
    img.alt = 'icon-remove-item';
    button.appendChild(img);

    button.addEventListener("click",(event)=>{
        let r_btn= event.currentTarget;
        setTimeout(() => {
            document.querySelectorAll(".d").forEach((d)=> {
                if (r_btn.closest(".article").classList[2] == d.querySelector(".counter").classList[1]) {
                    document.querySelector(".cart h2 span").innerHTML= parseInt(document.querySelector(".cart h2 span").innerHTML, 10) - parseFloat(r_btn.closest(".article").querySelector(".n_article").innerText.replace('$', '')) ;
                    d.querySelector(".add_to_cart").style.display= "flex";
                    d.querySelector(".counter span").innerHTML="";
                    d.querySelector(".counter").style.display= "none";
                    d.querySelector(".desserts_img").classList.remove("d_activate");
                    document.querySelector(".total_count").innerHTML= "$" + ( parseFloat(document.querySelector(".total_count").innerHTML.replace('$', '')) - parseFloat(r_btn.closest(".article").querySelector(".n_article_x_u_price").innerHTML.replace('$', '')) ) ;
                }
            });

            if (r_btn.closest(".articles") && r_btn.closest(".articles").childNodes.length == 0) {
                document.querySelector(".confirm_order").style.display= "none";
                document.querySelector(".empty").style.display= "flex";
                document.querySelectorAll(".add_to_cart").forEach((adds) => {adds.style.display= "flex";});
                document.querySelectorAll(".counter").forEach((cts) => {cts.style.display= "none";});
                document.querySelector(".cart h2 span").innerHTML= 0;
                document.querySelector(".total_count").innerHTML= "$0";
            }
            document.querySelectorAll(".counter").forEach((counter)=> {
                if (counter.classList[1] == articleDiv.classList[2]) {
                    counter.classList.className = "counter";
                }
            });
        }, 300);
        r_btn.closest(".article").remove();
    });
  
    articleDiv.appendChild(dessertInfosDiv);
    articleDiv.appendChild(button);
    
    return articleDiv;
}

function in_and_de_crement(){
    document.querySelectorAll(".plus_btn").forEach((bnt) => {
        bnt.addEventListener("click",(event)=>{
            let counter= event.currentTarget.closest(".counter");
            counter.querySelector(".counter_span").innerHTML= 1 + parseInt(counter.querySelector(".counter_span").innerText, 10);
            
            document.querySelectorAll(".article").forEach((article)=> {
                if (article.classList[2] == counter.classList[1]) {
                    let article_copy= article;
                    article_copy.querySelector(".counter_span").innerHTML= counter.querySelector(".counter_span").innerHTML + "x";
                    
                    let u_p= parseFloat(article_copy.querySelector(".u_price").innerText.replace('@$', ''));
                    let n_art= parseFloat(article_copy.querySelector(".counter_span").innerText.replace('x', ''));

                    article_copy.querySelector(".n_article_x_u_price ").innerHTML= "$" + (u_p * n_art);

                    document.querySelector(".cart h2 span").innerHTML= 1 + parseFloat(document.querySelector(".cart h2 span").innerHTML);
                    document.querySelector(".total_count").innerHTML= "$" + ( parseFloat(document.querySelector(".total_count").innerText.replace('$', '')) + u_p );
                }
            });
        })
    });

    document.querySelectorAll(".minus_btn").forEach((bnt) => {
        bnt.addEventListener("click",(event)=>{
            let counter= event.currentTarget.closest(".counter");
            let counter_span= parseFloat(counter.querySelector(".counter_span").innerText);
            counter.querySelector("span").innerHTML= counter_span > 0 ? counter_span -1: 0;

            if (counter.querySelector("span").innerHTML == 0) {
                document.querySelectorAll(".article").forEach((article)=> {
                    if (counter.classList[1] == article.classList[2]) {
                        counter.closest(".d").querySelector(".desserts_img").classList.remove("d_activate");
                        document.querySelector(".total_count").innerHTML= "$" + ( parseFloat(document.querySelector(".total_count").innerText.replace('$', '')) - parseFloat(article.querySelector(".u_price").innerText.replace('@$', '')) );
                        document.querySelector(".cart h2 span").innerHTML= parseInt(document.querySelector(".cart h2 span").innerHTML, 10) - counter_span;
                        article.remove();
                        counter.closest(".d").querySelector(".add_to_cart").style.display= "flex";
                        counter.style.display= "none";
                        counter.classList.className = "counter";
                    }
                });
            }

            document.querySelectorAll(".article").forEach((article)=> {
                if (article.classList[2] == counter.classList[1]) {
                    let article_copy= article;
                    article_copy.querySelector(".counter_span").innerHTML= counter.querySelector(".counter_span").innerHTML + "x";
                    
                    let u_p= parseFloat(article_copy.querySelector(".u_price").innerText.replace('@$', ''));
                    let n_art= parseFloat(article_copy.querySelector(".counter_span").innerText.replace('x', ''));

                    article_copy.querySelector(".n_article_x_u_price ").innerHTML= "$" + (u_p * n_art);
                    
                    if (parseFloat(document.querySelector(".cart h2 span").innerHTML) > 0) {
                        document.querySelector(".cart h2 span").innerHTML= parseFloat(document.querySelector(".cart h2 span").innerHTML) - 1;
                    }
                    document.querySelector(".total_count").innerHTML= "$" + ( parseFloat(document.querySelector(".total_count").innerText.replace('$', '')) - u_p );
                }
            });
            if (document.querySelector(".articles").childNodes.length == 0) {
                setTimeout(() => {
                    document.querySelector(".confirm_order").style.display= "none";
                    document.querySelector(".empty").style.display= "flex";
                    document.querySelectorAll(".add_to_cart").forEach((adds) => {
                        adds.style.display= "flex";
                        adds.closest(".d").querySelector(".desserts_img").classList.remove("d_activate");
                    });
                    document.querySelectorAll(".counter").forEach((cts) => {cts.style.display= "none";});
                    document.querySelector(".cart h2 span").innerHTML= 0;
                    document.querySelector(".total_count").innerHTML= "$0";
                }, 200);
            }
        })
    });
}in_and_de_crement();

function thumbnail() {
    document.querySelectorAll(".article").forEach((article)=> {
        for (let i = 0; i < 9; i++) {
            let a= article;
            let a_json= assets[i].image;
            
            if (assets[i].name == a.querySelector(".dessert_infos h2").textContent) {
                let img= document.createElement("img");
                img.classList.add("article_img");

                img.src= a_json["thumbnail"];
                a.insertAdjacentElement("afterbegin", img);
            }
        }
    });
}

document.querySelector(".cofirm_order_btn").addEventListener("click",()=>{
    document.querySelector(".pop_up_background").classList.add("active");
    document.querySelector(".pop_up").classList.add("pop_in");
    
    document.querySelectorAll(".article").forEach((article)=> {
        article.querySelector(".remove_btn").disabled= true;
        article.querySelector(".remove_btn").style.display= "none";
        article.querySelector(".u_price").style.display= "none";
    });

    document.querySelector(".pop_up_background .order").insertAdjacentElement("afterbegin", document.querySelector(".articles"));
    document.querySelector(".pop_up_background .order").insertAdjacentElement("beforeend", document.querySelector(".total"));
    thumbnail();
});
document.querySelector(".pop_up_background").addEventListener("click",(event)=>{
        if (event.target == document.querySelector(".pop_up_background") || event.target == document.querySelector(".start")) {
            document.querySelector(".pop_up").classList.add("pop_out");
            setTimeout(() => {
                document.querySelectorAll(".pop_up .order .article_img").forEach((img)=> {img.remove()});
                document.querySelector(".cart").childNodes[1].insertAdjacentElement("afterend", document.querySelector(".order .articles"));
                document.querySelector(".confirm_order").insertAdjacentElement("afterbegin", document.querySelector(".order .total"));
                document.querySelector(".pop_up .order").innerHTML="";
                
                document.querySelectorAll(".article").forEach((article)=> {
                    article.querySelector(".remove_btn").disabled= false;
                    article.querySelector(".remove_btn").style.display= "flex";
                    article.querySelector(".u_price").style.display= "flex";
                });
            }, 200);
            
            setTimeout(() => {
                document.querySelector(".pop_up_background").classList.remove("active");
                document.querySelector(".pop_up").classList.remove("pop_out", "pop_in"); 
            }, 300); 
        }
});