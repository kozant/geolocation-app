import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FullRequest = ({ route }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{`Широта: ${route.params.lat} \n\n`}
				{`Долгота: ${route.params.lng} \n\n`}
				{`Адрес: ${route.params.address} \n\n`}
				{`Температура: ${route.params.temp} градус(а,ов)\n\n`}
				{`Скорость ветра: ${route.params.wind} м/c\n\n`}
				{`Влажность: ${route.params.humidity} %\n\n`}
				{`Погода: ${route.params.weather}`}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 10,
		marginLeft: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
	},
});
