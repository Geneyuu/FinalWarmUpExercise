import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

// Create Context
export const Data = createContext();

export default function RootLayout() {
	const [name, setName] = useState("SetYourName"); // Default name

	// Load name from AsyncStorage when the app starts
	useEffect(() => {
		const loadName = async () => {
			try {
				const storedName = await AsyncStorage.getItem("userName");
				if (storedName) {
					setName(storedName); // Set the name if found in storage
				}
			} catch (error) {
				console.error("Failed to load name from AsyncStorage:", error);
			}
		};
		loadName();
	}, []);

	// Save name to AsyncStorage whenever it changes
	useEffect(() => {
		const saveName = async () => {
			try {
				await AsyncStorage.setItem("userName", name);
			} catch (error) {
				console.error("Failed to save name to AsyncStorage:", error);
			}
		};
		saveName();
	}, [name]);

	return (
		<Data.Provider value={{ name, setName }}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</Data.Provider>
	);
}
