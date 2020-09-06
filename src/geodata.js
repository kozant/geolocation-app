import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Geocoder from 'react-native-geocoding';

export default class Geodata extends Component {
	state = {
		loading: true,
		lat: null,
		lng: null,
		error: false,
		address: null,
		city: null,
		temp: null,
		wind: null,
		humidity: null,
		weather: null,
		date: null,
		time: null,
		seconds: null,
	};

	getRequest = () => {
		let geoOptions = {
			enableHighAccuracy: true,
			timeOut: 20000,
			maximumAge: 60 * 60 * 24,
		};
		this.getDate();
		navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
		this.setState({
			loading: false,
		});
	};

	getDate = () => {
		let current_date = new Date();
		let day, month, year, hours, minutes, seconds;
		year = current_date.getFullYear();
		if (current_date.getDate() > 0 && current_date.getDate() < 10) {
			day = '0' + current_date.getDate();
		} else {
			day = current_date.getDate();
		}

		if (current_date.getMonth() > 0 || current_date.getMonth() < 10) {
			month = '0' + (current_date.getMonth() + 1);
		} else {
			month = current_date.getMonth() + 1;
		}

		if (current_date.getHours() >= 0 && current_date.getHours() < 10) {
			hours = '0' + current_date.getHours();
		} else {
			hours = current_date.getHours();
		}

		if (current_date.getMinutes() >= 0 && current_date.getMinutes() < 10) {
			minutes = '0' + current_date.getMinutes();
		} else {
			minutes = current_date.getMinutes();
		}

		if (current_date.getSeconds() >= 0 && current_date.getSeconds() < 10) {
			seconds = '0' + current_date.getSeconds();
		} else {
			seconds = current_date.getSeconds();
		}
		this.setState({
			date: day + '.' + month + '.' + year,
			time: hours + ':' + minutes + ":" + seconds,
			seconds,
		});
	};

	geoSuccess = (position) => {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		this.setState({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		});

		Geocoder.init('AIzaSyBvObXUMo6gtjWhgwaFY7NCGUWOauMI3qI');
		Geocoder.from({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		})
			.then((json) => {
				const addressComponent = json.results[0].address_components;
				let location = '';
				for (let key in addressComponent) {
					location += addressComponent[key].long_name + ', ';
					if (addressComponent[key].types[0] == 'locality') {
						this.setState({
							city: addressComponent[key].long_name,
						});
					}
				}
				this.setState({
					address: location,
				});
			})
			.catch((e) =>
				this.setState({
					error: true,
				})
			);

		let key = '8ec77eac83e5885a46b364373ab43f19';
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`
		)
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({
					temp: Math.round(data.main.temp - 273),
					wind: data.wind['speed'],
					humidity: data.main.humidity,
					weather: data.weather[0].main,
				});
			})
			.catch((e) =>
				this.setState({
					error: true
				})
			);
	};

	geoFailure = () => {
		this.setState({
			error: true,
		});
	};

	render() {
		const {
			lat,
			lng,
			address,
			temp,
			wind,
			humidity,
			weather,
			error,
			loading,
			date,
			time,
			city,
			seconds,
		} = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.geoData}>
					{!error && !loading && lat !== null && (
						<View>
							<Text style={styles.info}>
								{`Широта: ${lat} \n\n`}
								{`Долгота: ${lng} \n\n`}
								{`Адрес: ${address} \n\n`}
								{`Температура: ${temp} градус(а,ов)\n\n`}
								{`Скорость ветра: ${wind} м/c\n\n`}
								{`Влажность: ${humidity} %\n\n`}
								{`Погода: ${weather}`}
							</Text>
						</View>
					)}
					{error && <Text style={styles.info}>Error</Text>}
					<Button
						style={styles.button}
						color="#8C8C8C"
						title="Сделать запрос"
						onPress={() => this.getRequest()}
					/>
				</View>
				<Button
					style={styles.button}
					color="#8C8C8C"
					title="Перейти к истории запросов"
					onPress={() =>
						this.props.navigation.navigate('История запросов', {
							lat,
							lng,
							address,
							temp,
							wind,
							humidity,
							weather,
							date,
							time,
							city,
							seconds,
						})
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	geoData: {
		flex: 10,
		marginLeft: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	info: {
		fontSize: 20,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
