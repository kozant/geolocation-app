import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList } from 'react-native';

const data = [];

const Item = ({ time, date, city, lat, lng, seconds, navigation, address, temp, wind, humidity, weather }) => (
	<View style={styles.item}>
		<Text style={styles.text}>Время: {time}</Text>
		<Text style={styles.text}>Дата: {date}</Text>
		<Text style={styles.text}>Город: {city}</Text>
		<Text style={styles.text}>Широта: {lat}</Text>
		<Text style={styles.text}>Долгота: {lng}</Text>
		<Button
      title="Получить архивный запрос"
      color="#8C8C8C"
			onPress={() =>
				navigation.navigate('Архивный запрос', { seconds, lat, lng, address, temp, wind, humidity, weather })
			}
		/>
	</View>
);

export const Table = ({ navigation, route }) => {
	if (data.length == 0 && route.params.seconds !== null) {
		data.push(route.params);
	}
	if (data.length !== 0 && data[data.length - 1].seconds !== route.params.seconds) {
		data.push(route.params);
	}
	return (
		<View style={styles.table}>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<Item
							time={item.time}
							date={item.date}
							city={item.city}
							lat={item.lat}
							lng={item.lng}
							address={item.address}
							temp={item.temp}
							wind={item.wind}
							humidity={item.humidity}
							weather={item.weather}
							seconds={item.seconds}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item) => item.seconds.toString()}
				/>
			</SafeAreaView>
			<Button
				style={styles.button}
				color="#8C8C8C"
				title="Перейти на главную"
				onPress={() => navigation.navigate('Главная')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	table: {
		flex: 1,
	},
	container: { flex: 10 },
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 15,
	},
	button: {
		flex: 1,
		alignItems: 'center',
    justifyContent: 'center'
	},
});
