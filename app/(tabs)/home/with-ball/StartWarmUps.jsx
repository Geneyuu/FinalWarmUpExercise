import React, { useEffect, useContext, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
} from "react-native";
import { Video } from "expo-av";
import { router } from "expo-router";
import { Data } from "../../../_layout"; // Adjust the path as needed

// Exercise data
const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		video: require("../../../../assets/videos/pushup.mp4"),
		image: require("../../../../assets/images/withballpreview.png"),
		description:
			"Stretch your left arm upwards and hold for a few seconds to increase flexibility.",
		performDescription:
			"Extend your left arm straight up, keeping your elbow locked. Hold this position for 10-20 seconds and then switch arms.",
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		video: require("../../../../assets/videos/pushup.mp4"),
		image: require("../../../../assets/images/inplacepreview.png"),
		description:
			"Stretch your right arm upwards and hold for a few seconds to increase flexibility.",
		performDescription:
			"Extend your right arm straight up, keeping your elbow locked. Hold this position for 10-20 seconds and then switch arms.",
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		video: require("../../../../assets/videos/pushup.mp4"),
		image: require("../../../../assets/images/stretchingpreview.png"),
		description:
			"Rotate your arms in small circles to warm up your shoulder joints.",
		performDescription:
			"Extend your arms out to the sides and make small circles, gradually increasing the size of the circles. Do this for 30 seconds in each direction.",
	},
];

// Main Component to start warmup exercises
const StartWarmups = () => {
	// Extracting values from context
	const {
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
		exerciseTimer, // Timer duration for exercise
		restTimer, // Timer duration for rest period
	} = useContext(Data); // Access the global context values

	// Reset states on component mount
	useEffect(() => {
		return () => {
			setIsTimerRunning(false);
			setCurrentExerciseIndex(0);
			setTimer(exerciseTimer);
			setIsResting(false);
		};
	}, []); // Runs only on initial mount

	// Timer logic and exercise progression
	useEffect(() => {
		let interval;

		// When timer is running and not resting, start countdown
		if (isTimerRunning && timer > 0 && !isResting) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		} else if (timer === 0 && !isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setIsResting(true);
				setTimer(restTimer);
			} else {
				setIsTimerRunning(false);
				setCurrentExerciseIndex(0);
				setTimer(exerciseTimer);
				setIsResting(false);
				router.replace("../../home"); // Navigate to home

				setTimeout(() => {
					alert("With Ball Exercises Completed! Congrats!");
				}, 1000);
			}
		} else if (timer === 0 && isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex((prev) => prev + 1);
				setIsResting(false);
				setTimer(exerciseTimer);
			}
		}

		return () => clearInterval(interval);
	}, [
		isTimerRunning,
		timer,
		currentExerciseIndex,
		isResting,
		restTimer,
		exerciseTimer,
	]);

	useEffect(() => {
		if (isResting && timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isResting, timer]);

	// Helper function to format the timer into MM:SS format
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	};

	// Get current and next exercise
	const currentExercise = exercises[currentExerciseIndex];
	const nextExercise = exercises[currentExerciseIndex + 1];

	// Functions for controlling the warmup flow
	const startWarmup = () => {
		setIsTimerRunning(true);
	};

	const stopWarmup = () => {
		setIsTimerRunning(false);
	};

	const restartWarmup = () => {
		setIsTimerRunning(false);
		setCurrentExerciseIndex(0);
		setTimer(exerciseTimer);
		setIsResting(false);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise.name}
				</Text>

				{isResting ? (
					<>
						<Text style={styles.heading}>
							Next Warm Up: {nextExercise?.name}
						</Text>
						<Image
							source={
								nextExercise
									? nextExercise.image
									: currentExercise.image
							}
							style={styles.image}
						/>
					</>
				) : (
					<Video
						source={currentExercise.video}
						style={styles.videoPlayer}
						resizeMode="contain"
						isLooping
						shouldPlay
						isMuted={true}
					/>
				)}

				{!isResting && (
					<>
						<Text style={styles.performDescriptionTitle}>
							How to Perform:
						</Text>
						<Text style={styles.performDescription}>
							{currentExercise.performDescription}
						</Text>
					</>
				)}

				{/* Format the timer */}
				<Text style={styles.timerText}>{formatTime(timer)}s</Text>

				{/* Start/Pause Exercise Button */}
				{!isResting && (
					<TouchableOpacity
						style={[
							styles.button,
							isTimerRunning
								? styles.pauseButton
								: styles.startButton,
						]}
						onPress={isTimerRunning ? stopWarmup : startWarmup}
					>
						<Text style={styles.buttonExercise}>
							{isTimerRunning
								? "Pause Exercise"
								: "Start Exercise"}
						</Text>
					</TouchableOpacity>
				)}

				{/* Restart Exercise Button */}
				<TouchableOpacity
					style={[styles.button, styles.restartButton]}
					onPress={restartWarmup}
				>
					<Text style={styles.buttonText}>Restart Exercise</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

// Styles moved to the last part
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
	exerciseContainer: { marginBottom: 20 },
	heading: {
		fontSize: 30,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 8,
		textAlign: "center",
	},
	timerText: {
		fontSize: 65,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginTop: 55,
		textAlign: "center",
	},
	videoPlayer: {
		width: "100%",
		height: 250,
		borderRadius: 12,
		marginBottom: 16,
	},
	image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 16 },
	button: {
		paddingVertical: 12,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: { color: "black", fontSize: 18, fontFamily: "Karla-Bold" },
	performDescription: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "#555",
		textAlign: "center",
		marginTop: 16,
		textAlign: "left",
	},
	performDescriptionTitle: {
		fontSize: 20,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 8,
	},
	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 2, borderColor: "black", color: "black" },
	buttonExercise: { color: "white", fontFamily: "Karla-Bold", fontSize: 18 },
});

export default StartWarmups;
