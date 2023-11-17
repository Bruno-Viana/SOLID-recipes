import { requestData } from '../utils/requestData';
import { handleDataToObj, clearObjList } from '../structure/recipeObj';
import { Keyboard } from 'react-native';

export let searchText = ''

export function setSearchText(text){
    searchText = text;
}

export let showFoundRecipes = false;

export let dataFromAPI = []

export let url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchText + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b"

export function updateUrl(text){
  url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + text + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b";
}

export const handleSearch = async (textInput, handleShowFoundRecipes) => {
    Keyboard.dismiss()
    handleShowFoundRecipes(false);
    clearObjList();
    setSearchText(textInput)
    updateUrl(textInput)

    try {
      dataFromAPI = await requestData(url);
      if(dataFromAPI["hits"][0] === undefined){
        return;
      }else{
        handleShowFoundRecipes(true)
        handleDataToObj(dataFromAPI)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };