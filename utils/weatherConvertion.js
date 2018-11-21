

// returns the right name for the MaterialCommunityIcons 
export function setIcon(condition) {
	switch (condition) {
		case 'Clear':
			return "weather-sunny";
			break;
		case 'Clouds':
			return "weather-cloudy";
			break;
		case 'Rain':
			return "weather-rainy";
			break;
	}
}


// returns the highest temp for the day
export function dailyHigh(weatherJson, day) {
	let high = 0;
	let json = JSON.parse(JSON.stringify(weatherJson));
	let intDay = parseInt(day);
	for(let i = intDay; i < (intDay + 8) && i != 30; i++) {
		if (Math.round(json.list[i].main.temp_max) > high ) {
			high = Math.round(json.list[i].main.temp_max);
		}
	};

			 
	return high;
}			 
// returns the lowest temp for the day
export function dailyLow(weatherJson, day) {
	
	let json = JSON.parse(JSON.stringify(weatherJson));
	let intDay = parseInt(day);
	let low = Math.round(json.list[day].main.temp_min);

	for(let i = intDay; i < (intDay + 8) && i != 30; i++) {
		if(Math.round(json.list[i].main.temp_min)< low)
			low = Math.round(json.list[i].main.temp_min);
	};

			 
	return low;
}	
