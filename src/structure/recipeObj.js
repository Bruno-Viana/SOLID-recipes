export let nextPage = ''

export function setNextPage(url){
    nextPage = url;
}

export let recipeObjList = []

export function clearObjList(){
    recipeObjList = [];
}

export function getObjList(){
   return recipeObjList;
}

export function handleDataToObj(dataReceived) {
  if (dataReceived["hits"][0] == undefined && dataReceived["_links"] == undefined) {
    clearObjList();
    console.log("Vai limpar a lista");
    return getObjList();
  } else if (dataReceived["hits"][0] !== undefined) {
    if (dataReceived["_links"] && dataReceived["_links"]["next"] && dataReceived["_links"]["next"]["href"] != undefined) {
      setNextPage(dataReceived["_links"]["next"]["href"]);
    }
    //Parse Json to Obj
    const newRecipes = dataReceived["hits"].map(recipe => ({
      label: recipe["recipe"]["label"],
      image: recipe["recipe"]["image"],
      thumbnailUrl: recipe["recipe"]["images"]["THUMBNAIL"]["url"],
      ingredientLines: recipe["recipe"]["ingredientLines"],
      calories: recipe["recipe"]["calories"],
      cuisineType: recipe["recipe"]["cuisineType"],
      instructionsUrl: recipe["recipe"]["url"],
      source: recipe["recipe"]["source"]
    }));

    recipeObjList.push(...newRecipes);
  }
  return getObjList();
}

