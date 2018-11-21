// converts the dayNumber into either full or abbreviated names
export function getWeekday(dayNum, abbr) {
	let weekDay = {};
	switch(dayNum) {
		case 0:
		case 7:

			weekDay.fullName = 'Sunday';
			weekDay.abbr = 'Sun';
			break;
		case 1:
			weekDay.fullName = 'Monday';
			weekDay.abbr = 'Mon';
			break;
		case 2:
			weekDay.fullName = 'Tuesday';
			weekDay.abbr = 'Tues';
			break;
		case 3:
			weekDay.fullName = 'Wednessday';
			weekDay.abbr = 'Wed';
			break;
		case 4:
			weekDay.fullName = 'Thursday';
			weekDay.abbr = 'Thurs';
			break;
		case 5:
			weekDay.fullName = 'Friday';
			weekDay.abbr = 'Fri';
			break;
		case 6:
			weekDay.fullName = 'Saturday';
			weekDay.abbr = 'Sat';
	}
	if(abbr == 'full')
		return weekDay.fullName;
	else
		return weekDay.abbr;
}

//Converts from UTC time to a Date Obj
export function setDate(dt) {
	let date = new Date(0);
	date.setUTCSeconds(dt);
	return date;
}