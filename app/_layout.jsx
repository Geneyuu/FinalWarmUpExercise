import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

// Create Context
export const Data = createContext();

export default function RootLayout() {
	const [name, setName] = useState("SetYourName"); // Default name

	const [exerciseTimer, setExerciseTimer] = useState(5); // Default exercise timer (in seconds)
	const [restTimer, setRestTimer] = useState(6); // Default rest timer (in seconds)
	// New states
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [timer, setTimer] = useState(exerciseTimer); // Set initial timer to exerciseTimer
	const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer state
	const [isResting, setIsResting] = useState(false); // Resting state

	// Load name and timers from AsyncStorage when the app starts
	useEffect(() => {
		const loadData = async () => {
			try {
				const storedName = await AsyncStorage.getItem("userName");
				const storedExerciseTimer = await AsyncStorage.getItem(
					"exerciseTimer"
				);
				const storedRestTimer = await AsyncStorage.getItem("restTimer");

				if (storedName) setName(storedName); // Set the name if found in storage
				if (storedExerciseTimer)
					setExerciseTimer(Number(storedExerciseTimer)); // Set the exercise timer if found in storage
				if (storedRestTimer) setRestTimer(Number(storedRestTimer)); // Set the rest timer if found in storage
			} catch (error) {
				console.error("Failed to load data from AsyncStorage:", error);
			}
		};
		loadData();
	}, []);

	// Save name and timers to AsyncStorage whenever they change
	useEffect(() => {
		const saveData = async () => {
			try {
				await AsyncStorage.setItem("userName", name);
				await AsyncStorage.setItem(
					"exerciseTimer",
					String(exerciseTimer)
				);
				await AsyncStorage.setItem("restTimer", String(restTimer));
			} catch (error) {
				console.error("Failed to save data to AsyncStorage:", error);
			}
		};
		saveData();
	}, [name, exerciseTimer, restTimer]);

	// Update timer state when exerciseTimer or restTimer changes
	useEffect(() => {
		setTimer(exerciseTimer); // Update timer when exerciseTimer changes
	}, [exerciseTimer]);

	return (
		<Data.Provider
			value={{
				name,
				setName,
				exerciseTimer,
				setExerciseTimer,
				restTimer,
				setRestTimer,
				currentExerciseIndex,
				setCurrentExerciseIndex,
				timer,
				setTimer,
				isTimerRunning,
				setIsTimerRunning,
				isResting,
				setIsResting,
			}}
		>
			{/* Wrap the entire app's screen stack with the Data context */}
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</Data.Provider>
	);
}
