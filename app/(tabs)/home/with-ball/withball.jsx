import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

// Exercises data
const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../../assets/images/default-logo.webp"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../../assets/images/default-logo.webp"),
	},
];

// ExerciseItem Component
const ExerciseItem = ({ id, name, image }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const styles = StyleSheet.create({
		exercise: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: "#252525",
			borderRadius: 12,
			padding: 12,
			marginBottom: 12,
			shadowColor: "#252525",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
		},
		exerciseImage: {
			width: 80,
			height: 80,
			borderRadius: 8,
			marginRight: 12,
		},
		exerciseText: {
			fontSize: 19,
			color: "#FFFFFF",
			fontFamily: "Karla-Bold",
			flexShrink: 1,
			flexWrap: "wrap",
		},
		touchableOpacity: {
			backgroundColor: "transparent",
		},
	});

	const handlePress = () => {
		if (disabled) return; // Prevent further clicks while disabled
		setDisabled(true); // Disable the button after the first click

		// Navigate to the next screen
		router.push(`/home/with-ball/${id}`);

		// Re-enable the button after 1.30 seconds
		setTimeout(() => {
			setDisabled(false); // Enable the button after 1.30 seconds
		}, 1300); // 1300 milliseconds (1.30 seconds)
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.touchableOpacity}
			disabled={disabled} // Disable the TouchableOpacity after first click
		>
			<View style={styles.exercise}>
				<Image source={image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{name}</Text>
			</View>
		</TouchableOpacity>
	);
};

// StickyButton Component
const StickyButton = () => {
	const styles = StyleSheet.create({
		stickyButtonContainer: {
			position: "absolute",
			bottom: 18,
			left: 16,
			right: 16,
		},
		stickyButton: {
			backgroundColor: "#fff", // Custom color for the button
			paddingVertical: 12,
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		stickyButtonText: {
			fontSize: 18,
			color: "#272727",
			fontFamily: "Karla-Bold",
		},
	});

	return (
		<View style={styles.stickyButtonContainer}>
			<TouchableOpacity style={styles.stickyButton}>
				<Text style={styles.stickyButtonText}>Start</Text>
			</TouchableOpacity>
		</View>
	);
};

// WithBall Component (Main Component)
const WithBall = () => {
	const styles = StyleSheet.create({
		container: {
			padding: 16,
			backgroundColor: "#161616",
		},
		mainImage: {
			width: "100%",
			height: 250,
			resizeMode: "cover",
			borderRadius: 12,
			marginBottom: 20,
		},
		description: {
			fontSize: 16,
			lineHeight: 22,
			color: "#EDEDED",
			marginBottom: 16,
			textAlign: "justify",
			fontFamily: "Karla-ExtraLight",
		},
		subheading: {
			fontSize: 22,
			marginBottom: 20,
			color: "#fff",
			fontFamily: "Oswald-Bold",
		},
		exerciseContainer: {
			flexDirection: "column",
			marginBottom: 50,
		},
	});

	return (
		<>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={require("../../../../assets/images/default-logo.webp")}
					style={styles.mainImage}
				/>
				<Text style={styles.description}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Maecenas et consectetur ante. Vivamus vulputate nibh eros,
					vel tempor magna posuere sed. Sed fermentum tortor tellus,
					tempor malesuada nibh fringilla non.
				</Text>
				<Text style={styles.subheading}>Included exercises:</Text>
				<View style={styles.exerciseContainer}>
					{exercises.map((exercise) => (
						<ExerciseItem
							key={exercise.id}
							id={exercise.id}
							name={exercise.name}
							image={exercise.image}
						/>
					))}
				</View>
			</ScrollView>
			<StickyButton />
		</>
	);
};

export default WithBall;
