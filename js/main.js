let pokeTable = document.getElementById("poke-table").getElementsByTagName('tbody')[0];
let navAnterior = document.getElementById("nav-anterior")
let navProximo =  document.getElementById("nav-proximo")


let nextUrl=''
let previousUrl=''

navProximo.addEventListener("click",function(event){
   if(!navProximo.classList.contains("disabled")){
      getPokemonList(nextUrl).then(function(data){
        filltable(data)
      })
   }
})

navAnterior.addEventListener("click",function(event){
    if(!navAnterior.classList.contains("disabled")){
        getPokemonList(previousUrl).then(function(data){
            filltable(data)
        })
     }
})

async function getPokemonList(url){   
let response  = await fetch(url)
let json = await response.json()
    return json
}

function clearTabler(){

}

function  filltable(data){
    if(data.previous == null){
        navAnterior.classList.add("disabled")
    }else{
        navAnterior.classList.remove("disabled")
    }
    if(data.next==null){
        navProximo.classList.add("disabled")
    }else{
        navProximo.classList.remove("disabled")
    }
    
    nextUrl = data.next
    previousUrl = data.previous
        
    data.results.forEach(function(element, index, array){
    fetch(element.url)
    .then(function(result){
        return result.json();
    })
    .then(function(data){
    
    let newRow = pokeTable.insertRow(-1)
    
    let idCell = newRow.insertCell(0);
    let idText = document.createTextNode(data.id);
    idCell.appendChild(idText);
    
    let nameCell = newRow.insertCell(1);
    let nameText = document.createTextNode(data.name);
    nameCell.appendChild(nameText);
    
    let weightCell = newRow.insertCell(2);
    let weightText = document.createTextNode(data.weight);
    weightCell.appendChild(weightText);

    let detailCell = newRow.insertCell(3);
    let detailButton = document.createElement("button")
    detailButton.type = "button"
    detailButton.classList.add("btn-primary")
    detailButton.classList.add("btn")
    detailButton.innerHTML = "Detalhes"
    detailButton.addEventListener("click",function(event){
                selecPokemon(`${data.id}`)

    })
    detailCell.appendChild(detailButton);


    const selecPokemon = async (id)=>{
const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
const res = await fetch(url);
const datapoke  = await res.json();
displayPopup(datapoke);
}

    const displayPopup= (datapoke)=>{
            console.log(datapoke);

            const type =  datapoke.types.map(type=>type.type.name).join(',');
            const img = datapoke.sprites['front_default'];
            
            console.log(type)


            const htmlString = `
            <div class="popup">
                <button id="closeBtn" onclick ="closePopup()
                ">Fechar</button>
                    <div class="card">
                        <img class ="card-title" src="${img}"/>
                        <h2 class="card-title">${datapoke.id}. ${datapoke.name}<h2/>
                        <p><small>Height: <small>${datapoke.height}
                        <p><small>Weight: <small>${datapoke.weight}
                        <p><small>Type: <small>${type}
                    </div>
            </div>
            `;
console.log(htmlString)


pokeTable.innerHTML = htmlString + pokeTable.innerHTML;
    }
    const closePopup = () =>{
        const popup = document.querySelector('.popup');
        popup.parentElement.removeChild(popup);
    }
    })
    })
}  

getPokemonList("https://pokeapi.co/api/v2/pokemon").then(function(data){
    filltable(data)
}) 




