import {setNextPage, recipeObjList, getObjList, clearObjList} from '../api/constants';

export function handleDataToObj(dataReceived) {
  if (dataReceived["hits"][0] == undefined && dataReceived["_links"][0] == undefined) {
    clearObjList();
    return getObjList();
  } else if (dataReceived["hits"][0] !== undefined) {
    if (dataReceived["_links"] && dataReceived["_links"]["next"] && dataReceived["_links"]["next"]["href"] != undefined) {
      setNextPage(dataReceived["_links"]["next"]["href"]);
    }
    // Parse Json to Obj
    const newRecipes = dataReceived["hits"].map(recipe => {
      const totalTime = recipe["recipe"]["totalTime"];
      if (totalTime > 0) {
        return {
          label: recipe["recipe"]["label"],
          image: recipe["recipe"]["image"],
          thumbnailUrl: recipe["recipe"]["images"]["REGULAR"]["url"],
          ingredientLines: recipe["recipe"]["ingredientLines"],
          calories: recipe["recipe"]["calories"],
          cuisineType: recipe["recipe"]["cuisineType"],
          instructionsUrl: recipe["recipe"]["url"],
          source: recipe["recipe"]["source"],
          totalTime: totalTime,
          proteins: recipe["recipe"]["totalNutrients"]["PROCNT"]["quantity"],
          carbs: recipe["recipe"]["totalNutrients"]["CHOCDF"]["quantity"],
          fats: recipe["recipe"]["totalNutrients"]["FAT"]["quantity"],
        };
      }
      return null;
    });
    recipeObjList.push(...newRecipes.filter(recipe => recipe !== null));
  }
  return getObjList();
}


