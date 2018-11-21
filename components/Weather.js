import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_KEY } from '../utils/WeatherAPIKey';
import { getWeekday, setDate } from '../utils/dateConvertions';
import { setIcon } from '../utils/weatherConvertion';



class Weather extends React.Component {
	state = {
		todayTemp: 0,
		todayWeatherCondition: null,
		isLoading: true,
		date: null,
		weekday: null,
		day: null,
		icon: null

	}
	degrees = '\u00B0';
	componentDidMount() {
		return this.callWeather();
	}

	callWeather() {
		return fetch(`http://api.openweathermap.org/data/2.5/weather?id=4393217&APPID=${API_KEY}&units=imperial`) 
			.then((response) => response.json()) // convet response to JSON
			.then((responseJson) => {
				this.setState({
					todayTemp: Math.round((responseJson.main.temp_min + responseJson.main.temp_max)/2), //set temp to the average days temp
					todayWeatherCondition: responseJson.weather[0].main,
					date: setDate(responseJson.dt), //create date Object
					
				});
			})
			.then(() => {
				this.setState({
					weekday: getWeekday(this.state.date.getDay(), 'full'),
					day: `${this.state.date.getMonth() + 1}/${this.state.date.getDate()}`,
					icon: setIcon(this.todayWeatherCondition),
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	render() {
		return (
			<View style={styles.headerContainer}>		
				<Text style={styles.dateHeader}>{this.state.weekday} - {this.state.day}</Text>
				<Text style={styles.tempText}>{this.state.todayWeatherCondition} <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} /></Text>
				<Text style={styles.tempText}>{this.state.todayTemp}{this.degrees}</Text>	
			</View>
			
		)
	}
};




const styles = StyleSheet.create({

	weatherContainer: {
		flex: 1,
		backgroundColor: '#f7b733'
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tempText: {
		fontSize: 48,
		color: '#fff'
	},


	dateHeader: {
		fontSize: 24,
		color: '#fff'
	}
});

export default Weather;