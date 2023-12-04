export let searchText = ''

export function setSearchText(text){
    searchText = text;
}

export let url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchText + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b"

export function updateUrl(text){
  url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + text + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b";
}


//Lazy loading

export let nextPage = ''

export function setNextPage(url){
    nextPage = url;
}

//Handling dos objetos

export let recipeObjList = []

export function clearObjList(){
    recipeObjList = [];
}

export function getObjList(){
   return recipeObjList;
}