import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			{/* Set StatusBar background color and style */}
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false, headerTitle: "Go back" }}
				/>
				<Stack.Screen
					name="with-ball"
					options={{ headerShown: false, headerTitle: "" }}
				/>
			</Stack>
		</SafeAreaView>
	);
};

export default Layout;
