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

// Exercises data
const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../../assets/images/wholebodypreview.png"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../../assets/images/withballpreview.png"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../../assets/images/stretchingpreview.png"),
	},
];

// ExerciseItem Component
const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();
	const styles = StyleSheet.create({
		exercise: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: "#fff",
			shadowOffset: { width: 10, height: 3 },
			borderRadius: 0,
			padding: 12,
			marginBottom: 12,
			shadowOpacity: 0.2,
			shadowRadius: 5,
			borderWidth: 1,
			borderRadius: 8,
		},
		exerciseImage: {
			width: 80,
			height: 80,
			borderRadius: 8,
			marginRight: 12,
		},
		exerciseText: {
			fontSize: 19,
			color: "#161616",
			fontFamily: "Karla-Regular",
			flexShrink: 1,
			flexWrap: "wrap",
		},
	});

	const handlePress = () => {
		router.push(`/home/with-ball/${id}`);
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
			backgroundColor: "#161616", // Custom color for the button
			paddingVertical: 12,
			borderWidth: 2,
			elevetion: 0,
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		stickyButtonText: {
			fontSize: 18,
			color: "#fff",
			fontFamily: "Karla-Bold",
		},
	});

	return (
		<View style={styles.stickyButtonContainer}>
			<TouchableOpacity style={styles.stickyButton}>
				<Text style={styles.stickyButtonText}>Start Warmups</Text>
			</TouchableOpacity>
		</View>
	);
};

// WithBall Component (Main Component)
const WithBall = () => {
	const styles = StyleSheet.create({
		container: {
			padding: 16,
			backgroundColor: "#fff",
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
			color: "#161616",
			marginBottom: 16,
			textAlign: "justify",
			fontFamily: "Karla-Regular",
		},
		subheading: {
			fontSize: 22,
			marginBottom: 20,
			color: "#161616",
			fontFamily: "Karla-Bold",
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
					source={require("../../../../assets/images/withballpreview.png")}
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
