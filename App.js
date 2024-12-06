import { Text, SafeAreaView, StyleSheet,View,FlatList,Image, TouchableOpacity,TextInput} from 'react-native';
import add from './assets/plus.png'
import { useState, useEffect } from 'react';
import axios from 'axios'; 





const renderDonut = ({item}) => {
  return(
    <View style={styles.item}>
      <Image source = {{uri:item.img}} style={{width:120,height:120,marginLeft:10,borderRadius:10}} />
      <View style ={styles.detail}>
        <Text style={{fontWeight:'bold',fontSize:24}}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text  style={{fontWeight:'bold',fontSize:18}}>${item.price}</Text>
      </View>

       <TouchableOpacity  style={{width:50, height:50,position:'absolute', right:0,bottom:0}}>
        <Image 
        source ={add} 
        style={{width:40, height:40}}
        />
       </TouchableOpacity>
    </View>
   
  )
}



export default function App() {
  const [donut,setDonut]=useState([]);
  
  
  const fetchData = async () => {
    try {
      let donutURL = 'https://6752a38cd1983b9597b6ce4c.mockapi.io/Donuts';


      const [donutResponse] = await Promise.all([
        axios.get(donutURL),

      ]);

      setDonut(donutResponse.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text>Welcome,Jala!</Text>
      <Text style={{fontWeight:'bold',fontSize:18}}>Choice your best food</Text>
    </View>
      <TextInput
        style={styles.input}
        placeholder='Search food'
      />

      <View style={styles.category}>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text style={{textAlign:'center'}}>Donut</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryBtn}>
            <Text style={{textAlign:'center'}}>Pink Donut</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryBtn}>
            <Text style={{textAlign:'center'}}>Floating</Text>
          </TouchableOpacity>
      </View>
    <View>
      <FlatList
      data={donut}
      renderItem={renderDonut}
      keyExtractor={item=>item.name}
      />
    </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  item: {
    flexDirection:'row',
    width:400,
    height:150,
    backgroundColor:'#F4DDDD',
    alignItems:'center',
    position:'relative',
    margin:6,
    borderRadius:20
    
  },
  detail:{
    marginLeft:10,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  input:{
    borderWidth:1,
    borderRadius:3,
    width:370,
    margin:10
  },
  header:{
    marginTop:30,
    margin:10
  },
  category:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:370,
    height:40,
    marginTop:10,
    marginLeft:10
  },
  categoryBtn:{
    borderWidth:1,
    width:100,
    height:30,
    justifyContent:'center',
  }
});
