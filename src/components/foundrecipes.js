import { View, Text, Image, StyleSheet} from 'react-native';

const FoundRecipes = ({ dataReceived }) => {
    if(dataReceived["hits"][0]!=undefined){
        dataReceived["hits"].forEach(element => {
            element["recipe"]["label"]
            //console.log("AQUI " +  element["recipe"]["label"])
            //console.log("AQUI " +  element["recipe"]["image"])
            //console.log("AQUI " +  element["recipe"]["images"]["THUMBNAIL"]["url"])
            //console.log("AQUI " +  element["recipe"]["ingredientLines"])
            //console.log("AQUI " +  element["recipe"]["calories"])
            //console.log("AQUI " +  element["recipe"]["cuisineType"])
        });
    }
  return (
    <View>{
       dataReceived["hits"][0]==undefined ?(
        <Text>Searched term isn't valid or it's empty.</Text>
      ) :
      dataReceived ? (
        <View style={styles.container}>
            <Text>Termionu fetch com sucesso</Text>
            <Text>{dataReceived["hits"][0]["recipe"]["label"]}</Text>
            <Image 
            style={styles.logo}
            source={{
                uri: dataReceived["hits"][0]["recipe"]["images"]["THUMBNAIL"]["url"],
            }}/>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      alignItems: 'center'
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

export default FoundRecipes;
