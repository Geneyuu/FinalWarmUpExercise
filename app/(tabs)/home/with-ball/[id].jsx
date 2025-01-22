import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video } from "expo-av"; // Import the Video component

// Add the video data for each exercise (you can extend this array based on your needs)
const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/video.mp4"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
];

const ExerciseDetails = () => {
	const { id } = useLocalSearchParams(); // Retrieve the passed id
	console.log(`This is ${id}`);

	// Find the selected exercise based on the id
	const exercise = exercises.find((ex) => ex.id === id);
	console.log(exercise);
	const videoSource = exercise ? exercise.video : null; // Get video source if exercise exists

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exercise Details</Text>
			<Text style={styles.description}>
				You selected exercise with ID: {id}
			</Text>

			{/* Render the video player if the video exists */}
			{videoSource && (
				<Video
					source={videoSource} // Directly use the video source
					style={[styles.video]}
					useNativeControls={false}
					shouldPlay={true}
					isLooping={true}
					resizeMode="cover"
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	video: {
		width: "100%",
		height: 250,
		marginTop: 20,
	},
});

export default ExerciseDetails;
