import React from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

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

const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();

	const handlePress = () => {
		router.push(`/home/with-ball/${id}`); // Make sure this matches the dynamic route
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.exercise}>
				<Image source={image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{name}</Text>
			</View>
		</TouchableOpacity>
	);
};

const WithBall = () => {
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Image
				source={require("../../../../assets/images/default-logo.webp")} // Local image using require
				style={styles.mainImage}
			/>
			<Text style={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Maecenas et consectetur ante. Vivamus vulputate nibh eros, vel
				tempor magna posuere sed. Sed fermentum tortor tellus, tempor
				malesuada nibh fringilla non.
			</Text>
			<Text style={styles.subheading}>Included exercises:</Text>
			<View style={styles.exerciseContainer}>
				{exercises.map((exercise) => (
					<ExerciseItem
						key={exercise.id}
						id={exercise.id}
						name={exercise.name}
						image={exercise.image} // Passing the local image
					/>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#fff",
	},

	mainImage: {
		width: "100%",
		height: 250,
		resizeMode: "cover",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		lineHeight: 22,
		marginBottom: 16,
		textAlign: "justify",
	},
	subheading: {
		fontSize: 20,
		marginBottom: 20,
		fontFamily: "Oswald-Bold",
	},
	exerciseContainer: {
		flexDirection: "column",
	},
	exercise: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	exerciseImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 12,
	},
	exerciseText: {
		fontSize: 19,
		fontFamily: "Karla-Bold",
	},
});

export default WithBall;
