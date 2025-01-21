import React, { useEffect, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
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

const StartWarmups = () => {
	const {
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
		exerciseTimer, // Get the exerciseTimer from context
		restTimer, // Get the restTimer from context
	} = useContext(Data); // Get context values from the root

	useEffect(() => {
		let interval;

		// Handle exercise timer
		if (isTimerRunning && timer > 0 && !isResting) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		} else if (timer === 0 && !isResting) {
			// Start rest period
			if (currentExerciseIndex < exercises.length - 1) {
				setIsResting(true);
				setTimer(restTimer); // Use restTimer from context
			} else {
				// Stop if the last exercise has been completed
				setIsTimerRunning(false);
				setCurrentExerciseIndex(0); // Reset exercise index
				setTimer(exerciseTimer); // Reset timer to exerciseTimer
				setIsResting(false); // End resting state
				router.replace("../../home"); // Navigate to home

				setTimeout(() => {
					alert("With Ball Exercises Completed! Congrats!");
				}, 1000); // 1000 milliseconds
			}
		} else if (timer === 0 && isResting) {
			// Move to the next exercise after rest
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex((prev) => prev + 1);
				setIsResting(false); // End rest period
				setTimer(exerciseTimer); // Reset exercise timer for next exercise
			}
		}

		return () => clearInterval(interval); // Cleanup interval on state change
	}, [
		isTimerRunning,
		timer,
		currentExerciseIndex,
		isResting,
		restTimer,
		exerciseTimer,
	]);

	// New effect to handle rest period countdown
	useEffect(() => {
		if (isResting && timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			// Cleanup interval when rest time ends or is stopped
			return () => clearInterval(interval);
		}
	}, [isResting, timer]); // This effect will only run when resting and timer is active

	// Start the warm-up
	const startWarmup = () => {
		setIsTimerRunning(true);
	};

	// Pause the warm-up
	const stopWarmup = () => {
		setIsTimerRunning(false);
	};

	const currentExercise = exercises[currentExerciseIndex];
	const nextExercise = exercises[currentExerciseIndex + 1];

	const styles = StyleSheet.create({
		container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
		heading: {
			fontSize: 30,
			fontFamily: "Karla-Bold",
			color: "#161616",
			marginBottom: 8,
			textAlign: "center",
		},
		timerText: {
			fontSize: 50,
			fontFamily: "Karla-Bold",
			color: "#161616",
			marginTop: 20,
			textAlign: "center",
		},
		videoPlayer: {
			width: "100%",
			height: 250,
			borderRadius: 12,
			marginBottom: 16,
		},
		image: {
			width: "100%",
			height: 250,
			borderRadius: 12,
			marginBottom: 16,
		},
		button: {
			paddingVertical: 12,
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
			marginTop: 20,
		},
		buttonText: { color: "#fff", fontSize: 18, fontFamily: "Karla-Bold" },
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
		// Conditional styling for button
		startButton: {
			backgroundColor: "#28a745", // Green for Start Exercise
		},
		pauseButton: {
			backgroundColor: "#dc3545", // Red for Pause Exercise
		},
		restButton: {
			backgroundColor: "#f0ad4e", // Yellow for Rest period
		},
	});

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise.name}
				</Text>

				{/* Video Display or Rest Image */}
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
						shouldPlay={true}
					/>
				)}

				{/* How to Perform Section */}
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

				{/* Timer Display */}
				<Text style={styles.timerText}>{timer}s</Text>

				{/* Start/Pause Button */}
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
						<Text style={styles.buttonText}>
							{isTimerRunning
								? "Pause Exercise"
								: "Start Exercise"}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	);
};

export default StartWarmups;
