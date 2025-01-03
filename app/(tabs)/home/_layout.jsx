import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#272727" }}>
			{/* Set StatusBar background color and style */}
			<StatusBar backgroundColor="#272727" barStyle="light-content" />
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false, headerTitle: "Go back" }}
				/>
				<Stack.Screen
					name="with-ball"
					options={{ headerShown: false }}
				/>
			</Stack>
		</SafeAreaView>
	);
};

export default Layout;
