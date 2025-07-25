import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, Button, ImageBackground } from 'react-native';
import { useState } from 'react';

export default function App() {
  const ItemListContainer = [
    { id: '1', titulo: 'Elemento 1' },
    { id: '2', titulo: 'Elemento 2' },
    { id: '3', titulo: 'Elemento 3' },
    { id: '4', titulo: 'Elemento 4' },
    { id: '5', titulo: 'Elemento 5' },
    { id: '6', titulo: 'Elemento 6' },
    { id: '7', titulo: 'Elemento 7' },
  ];

  //variable texto y su función setter
  const [text, setText] =useState ('');

  //const taskList y su setter
const [taskList, setTaskList] = useState([]);
  //acá va el handle y en el return va el botón
  const handleAddTask = () =>{
    if (text.trim() !==''){
    Alert.alert('Tarea agregada !!! ');
    setTaskList(prevState=>[...prevState, {id:Math.random().toString(), value: text}]);
    setText(''); //limpiar texto
    }else{
      Alert.alert('error, Ingrese una cadena de texto')
    }
  }
  
  return (
    
       <ImageBackground
    source={require('./assets/imagenPortada.jpg')}
     style={styles.backgroundImage}
    >
   
      <Text style={styles.mainTitle}>Esto es una prueba</Text>       
    
    <View style={styles.inputContainer}>
       <TextInput style={styles.emailInput}
      placeholder='Ingresá el texto'
      onChangeText={(text)=>setText(text)} 
      value={text}
    />

    <Button
    title='Agregar Tarea'
    onPress={handleAddTask}
    color= '#1bd042ff'/>   

    </View>  
  
    <FlatList style={styles.flatListContainer} data={taskList}
    renderItem={({item})=>
    <View style={styles.flatListItem}>
     <Text style={styles.flatListItemText}>{item.value}</Text>
    </View>
    }
     keyExtractor={(item) => item.id.toString()} 
    />
 
      <StatusBar style="auto" />     
    
   
    </ImageBackground>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',      
    padding: 20 ,
    paddingHorizontal:20,    
    paddingBottom: 20,
    alignItems: 'center',    
    
  },

  mainTitle: { 
    color: '#212121' , 
    fontSize: 22,
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold', 
    marginBottom: 20,
    marginTop: 50,   
  },

  inputContainer: {
    flexDirection: 'row',   
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
  },

  emailInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#8c8c8c',
    height: 40,
    borderRadius: 5 ,
    borderBottomWidth: 1,  
    flex: 1,
    textAlign:'center',
    width:'70%',
  },

flatListContainer: {

  width: '100%', 
  marginTop: 20,
  marginBottom: 60,
},

flatListItem: {
  backgroundColor: '#264a77ff',
  marginTop: 30,
  color: 'white',
  textAlign: 'center',
},

flatListItemText: {
  color:'#f7eeeeff' ,
},

backgroundImage: {
flex: 1,
verticalAlign: 'center',
resizeMode: 'cover',
 justifyContent: 'center', 
  alignItems: 'center'
},
  
});
