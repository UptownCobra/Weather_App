import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Weather  from './components/Weather';
import Forecast from './components/Forcast';

export default class App extends React.Component {

	

	render() {
		return (
			
			<View style={styles.container}>
				<Weather />
			<View style={styles.forecastContainer}>
				<Forecast dayIndex="0" />
				<Forecast dayIndex="8" />
				<Forecast dayIndex="16" />
				<Forecast dayIndex="24" />

			</View>
			</View>
			
	    );
  }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		borderWidth: .5,
		borderColor: '#fff',
		

	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000'
	},
	loadingText: {
		fontSize: 30
	},
	forecastContainer: {
		flexDirection: 'row'
	}
});