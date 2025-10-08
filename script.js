async function get9Pokemon() {

    const pokemonData = await fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/9').then(res => res.json());

    return pokemonData;

}

async function getPokemonById(pokemonId) {

    const pokemonData = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`).then(res => res.json());
    return pokemonData;



}

async function getPokemonEvolutionData(pokemonData) {

    const pokemonEvoId = pokemonData.apiEvolutions[0].pokedexId;
    const pokemonEvolutionData = await getPokemonById(pokemonEvoId);
    return pokemonEvolutionData;
}

async function getPokemonTypesImgs(pokemonData) {

    const pokemonTypesImgs = [];
    pokemonData.apiTypes.forEach(type => {
        pokemonTypesImgs.push(type.image);
    })
    return pokemonTypesImgs;
}



function createPokemonItem(pokemonData) {

    // Récupération de la div parente
    const pokemonCard = document.createElement('div');

    // Création des sous divs
    const pokemonCardText_div = document.createElement("div");
    const pokemonCardImg_div = document.createElement("div");

    // creation des elements items pokemon
    const pokemonId_elem = document.createElement('p')
    const pokemonName_elem = document.createElement('p')
    const pokemonImage_elem = document.createElement('img');
    // ajout des class par element
    pokemonCard.classList.add('pokemon-card')
    pokemonId_elem.classList.add('pokemon-card-id');
    pokemonName_elem.classList.add('pokemon-card-name');
    pokemonImage_elem.classList.add('pokemon-card-image');

    pokemonCardText_div.classList.add("pokemon-card-text");
    pokemonCardImg_div.classList.add("pokemon-card-img");


    //insertion des données dans les elements pokemon items
    pokemonId_elem.innerText = pokemonData.id;
    pokemonName_elem.innerText = pokemonData.name;
    pokemonImage_elem.setAttribute('src', pokemonData.image);

    pokemonCardText_div.appendChild(pokemonId_elem);
    pokemonCardText_div.appendChild(pokemonName_elem);
    pokemonCardImg_div.appendChild(pokemonImage_elem);

    // Insertion des sous div le container
    pokemonCard.appendChild(pokemonCardText_div);
    pokemonCard.appendChild(pokemonCardImg_div);

    pokemonCard.setAttribute('pokemon-id', pokemonData.id);
    console.log(pokemonCard)
    return pokemonCard;



}

async function displayPokemonInfo(pokemonData, pokemonTypesImgs) {
    // Récupération de la div parente
    const pokemonInfoParentDiv = document.querySelector(".pokemon-infos");
    // Récupération des elements
    const pokemonInfoId_elem = document.querySelector(".pokemon-info-id");
    const pokemonInfoImage_elem = document.querySelector(".pokemon-info-image");
    const pokemonInfoName_elem = document.querySelector(".pokemon-info-name");

    // Récupération de la div parente des img de types
    const pokemonInfoTypesImgDiv = document.querySelector(".pokemon-types-img-container");

    // Insertion des données dans les elements
    pokemonInfoId_elem.innerText = pokemonData.id;
    pokemonInfoImage_elem.setAttribute("src", pokemonData.image);
    pokemonInfoName_elem.innerText = pokemonData.name;

    // Remove display none sur le text Types
    const pokemonInfoTypeText_elem = document.querySelector(".pokemon-info-type-text");
    pokemonInfoTypeText_elem.classList.remove("invisible");
    // Insertion des données dans la div types
    console.log(pokemonTypesImgs);
    pokemonTypesImgs.forEach(img => {
        const pokemonInfoTypesImg = document.createElement("img");
        pokemonInfoTypesImg.setAttribute("src", img);
        pokemonInfoTypesImgDiv.appendChild(pokemonInfoTypesImg)
    })

    // Evolutions
    // Récupération de la div parente Evolution
    const pokemonInfoEvolutionParentDiv = document.querySelector(".pokemon-evolution");
    // Récupération des données de l'évolution
    const pokemonEvoData = await getPokemonEvolutionData(pokemonData);
    // Récupération de la card item
    const pokemonEvoCard = createPokemonItem(pokemonEvoData);
    // Insertion dans la div parente
    pokemonInfoEvolutionParentDiv.appendChild(pokemonEvoCard);

}

function displayPokemonList(pokemonData_arr){
    // Récupération de la div parente
    const pokemonItems_div = document.querySelector(".pokemon-items");
    pokemonData_arr.forEach(pokemon => {
     const pokemonItem = createPokemonItem(pokemon);
     pokemonItems_div.appendChild(pokemonItem);
    })
}
// debug

async function debug() {
    const pokemonData_arr = await get9Pokemon();
    const pokemonData = await getPokemonById(1);
    const pokemonTypesImg = await getPokemonTypesImgs(pokemonData);
    console.log("donnée pokemon data: " + pokemonData);
    createPokemonItem(pokemonData);
    getPokemonEvolutionData(pokemonData);
    getPokemonTypesImgs(pokemonData);
    displayPokemonInfo(pokemonData, pokemonTypesImg);
    displayPokemonList(pokemonData_arr);
}
debug();