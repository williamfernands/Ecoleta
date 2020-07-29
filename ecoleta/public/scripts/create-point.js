
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() })
    .then( (states) => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    });
}


populateUFs();


function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( (res) => {return res.json() })
    .then( (cities) => {
       
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    });
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta
// pegar todas li
const itemsToCollet = document.querySelectorAll(".items-grid li");


for(const item of itemsToCollet){
    item.addEventListener("click",handleSelectedItem);
}


// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(){
    const itemLi = event.target;

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");


    const itemId = itemLi.dataset.id;

    //console.log('ITEM ID:', itemId);

    //verificar se existem itens selecionados, se sim, pegar os itens
    const alereadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId;// true ou false
        return itemFound
    });

    // se ja estiver selecionado 
    if(alereadySelected >= 0){
        //tirar da seleção
        const filterItems = selectedItems.filter( (item) =>{
            const itemsDifferent = item != itemId;//false
            return itemsDifferent;
        });

       selectedItems = filterItems;
    }else{
         // se não estiver selecionado adicionar a seleção

        selectedItems.push(itemId);
    }

    //console.log('selectedItems:', selectedItems);

    //atualizar campo escondido
    collectedItems.value = selectedItems;

}