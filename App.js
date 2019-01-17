import React from 'react';
import { StyleSheet,TextInput,ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const API_KEY ='3ff530579b03ee0cc9925db526dd6127';


export default class App extends React.Component {
  

  state ={
    isLoading: true,
    temprature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  };
  
  getWeather = async(e)=>{
    e.preventDefault();
  
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units-metric`); 
    const data=await api_call.json();
    
    if(city && country){
    this.setState({
      isLoading: false,
      temprature : data.main.temp,
      city : data.name,
      country : data.sys.country,
      humidity : data.main.humidity,
      description : data.weather[0].description,
      error: ""
    });
  }else{
    this.setState({
    isLoading: false,
    temprature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : 'please enter the values'
    });
  }
  }
  

  render() {
   
    return (
      <ImageBackground source={require('./img/bg.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
       <TextInput
        style={styles.textField}
        placeholder="City"
        onChangeText={(city)=>this.setState({city})}/>
       <TextInput
        style={styles.textField}
        placeholder="Country"
        onChangeText={(country)=>this.setState({country})}/> 
        <TouchableOpacity style={styles.submitButton}
          onPress ={
            async(e)=>{
              e.preventDefault();
  
              const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${API_KEY}&units-metric`); 
              const data=await api_call.json();
              
              if(this.state.city && this.state.country){
              this.setState({
                isLoading: false,
                temprature : data.main.temp,
                city : data.name,
                country : data.sys.country,
                humidity : data.main.humidity,
                description : data.weather[0].description,
                error: ""
              });
            }else{
              this.setState({
              isLoading: false,
              temprature : undefined,
              city : undefined,
              country : undefined,
              humidity : undefined,
              description : undefined,
              error : 'please enter the values'
              });
            }
          }
        }
        >
        <Text style={styles.submitButtonText}>Get Weather</Text>
        </TouchableOpacity>
        {!this.state.isLoading ?(
          <View>
            <Text><WeatherHead value="City : " /><WeatherInfo value= {this.state.city}/> , <WeatherHead value=" Country : "/> <WeatherInfo value={this.state.country}/></Text>
            <Text><WeatherHead value="Temprature : "/> <WeatherInfo value={this.state.temprature}/></Text>
            <Text><WeatherHead value="Humidity : "/> <WeatherInfo value={this.state.humidity}/></Text>
            <Text><WeatherHead value="Description : "/><WeatherInfo value= {this.state.description}/></Text>
          </View>
        ):(
         null
        )}
      </View>
      </ImageBackground>
      
    );
  }
}

const WeatherHead = (props)=>{
  return(
    <Text style={styles.weatherHeader}>
      {props.value}
    </Text>
  );
}

const WeatherInfo = (props)=>{
  return(
    <Text style={styles.weatherInfo}>
      {props.value}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField:{
    color: 'blue',
    fontSize : 24
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
    color: 'white'
 },
 weatherHeader :{
   color: '#FF4500' 
 },weatherInfo:{
   color: '#8A2BE2' 
 }
});