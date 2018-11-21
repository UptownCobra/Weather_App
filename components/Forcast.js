import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_KEY } from '../utils/WeatherAPIKey';
import { getWeekday, setDate } from '../utils/dateConvertions';
import { setIcon, dailyHigh, dailyLow } from '../utils/weatherConvertion';

class Forecast extends React.Component {


	state = {
		temp: 0,
		condition: null,
		isLoading: true,
		date: null,
		weekday: null,
		day: null,
		icon: null,
		tempHigh: 0,
		tempLow: 0,
		isLoaded: true

	}
	degrees = '\u00B0'; //unicode degrees character
	componentDidMount() {
		return this.callForcasts()
	}

	

	callForcasts() {
		return fetch(`http://api.openweathermap.org/data/2.5/forecast?id=4393217&APPID=${API_KEY}&units=imperial`)
				.then((resp) => resp.json()) //convert data to JSON
				.then((respJson) => {
					
					this.setState({
						condition: respJson.list[this.props.dayIndex].weather[0].main,
						date: setDate(respJson.list[this.props.dayIndex].dt),
						tempHigh: dailyHigh(respJson, this.props.dayIndex),
						tempLow: dailyLow(respJson, this.props.dayIndex) 
					});
				})
					.then(() => {
						this.setState({
							weekday: getWeekday(this.state.date.getDay() + 1, 'part'),
							day: `${this.state.date.getMonth() + 1}/${this.state.date.getDate() + 1}`,
							icon: setIcon(this.state.condition),
							temp: (this.state.tempHigh + this.state.tempLow) / 2,
							
						});
					})
					.catch((error) => {
						console.error(error);
					});
		
	}

	render() {


		return (
			
			< View style={styles.bodyContainer} >
					<Text style={styles.text} >{this.state.day}</Text>
					<Text style={styles.text} >{this.state.weekday}</Text>
					<Text style={styles.icon}> <MaterialCommunityIcons size={32} name={this.state.icon} color={'#fff'} /></Text>
					<Text style={styles.highTemp}>{this.state.tempHigh}</Text>
					<Text style={styles.lowTemp}>{this.state.tempLow}</Text>
					<Text style={styles.text} >{this.state.condition} </Text>
					<Text style={styles.text} >{this.state.temp}{this.degrees}</Text>
			</View >
		);
		

	};

};



const styles = StyleSheet.create({

	
	
	
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		borderWidth: 0.5,
		borderColor: '#fff',
		paddingTop: 30,
		paddingBottom: 40,
		borderBottomWidth:0
	},
	text: {
		fontSize: 16,
		color: '#fff',
		alignItems: 'center'
	},
	
	icon: {
		paddingTop: 5,
		paddingBottom: 5
	},
	highTemp: {
		borderBottomWidth: 1,
		borderBottomColor: '#fff',
		color: '#fff',
		fontSize: 16,
		

	},
	lowTemp: {
		color: '#fff',
		fontSize: 16,
		
	}
});

export default Forecast;