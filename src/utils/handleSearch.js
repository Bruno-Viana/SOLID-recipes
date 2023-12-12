import { requestData } from '../api/axiosGet';
import { handleDataToObj } from '../structure/recipeObj';
import { Keyboard } from 'react-native';
import { url, updateUrl, setSearchText, clearObjList} from '../api/constants';


export let showFoundRecipes = false;
export let dataFromAPI = []


export const handleSearch = async (textInput, handleShowFoundRecipes) => {
    Keyboard.dismiss()
    handleShowFoundRecipes(false);
    clearObjList();
    setSearchText(textInput)
    updateUrl(textInput)

      dataFromAPI = await requestData(url);
      if(dataFromAPI["hits"][0] === undefined){
        return;
      }else{
        handleShowFoundRecipes(true)
        handleDataToObj(dataFromAPI)
      }
  };