import React from "react";
import Geodata from "./src/geodata";
import { Table } from "./src/table";
import {FullRequest} from "./src/full-request";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Главная" component={Geodata} />
        <Stack.Screen name="История запросов" component={Table} />
        <Stack.Screen name="Архивный запрос" component={FullRequest} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


