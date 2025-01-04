import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

// Data for exercises (could be fetched from an API in the future)
const exercisesData = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../assets/images/default-logo.webp"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../assets/images/default-logo.webp"),
	},
];

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredExercises, setFilteredExercises] = useState(exercisesData);
	const router = useRouter();

	// Function to filter exercises based on search query
	const filterExercises = (query) => {
		setSearchQuery(query);
		if (!query) {
			setFilteredExercises(exercisesData); // If search is empty, show all exercises
		} else {
			setFilteredExercises(
				exercisesData.filter((exercise) =>
					exercise.name.toLowerCase().includes(query.toLowerCase())
				)
			);
		}
	};

	// Function to navigate to a specific exercise page
	const navigateToExercise = (exerciseId) => {
		router.push(`/Search/${exerciseId}`);
	};

	return (
		<View style={styles.container}>
			{/* Search Input */}
			<SearchInput value={searchQuery} onChangeText={filterExercises} />

			{/* List of filtered exercises */}
			<ExerciseList
				exercises={filteredExercises}
				onExerciseClick={navigateToExercise}
			/>
		</View>
	);
};

// Reusable component for the search input
const SearchInput = ({ value, onChangeText }) => (
	<TextInput
		style={styles.searchBar}
		placeholder="Search exercises..."
		placeholderTextColor="#888"
		value={value}
		onChangeText={onChangeText}
	/>
);

// Reusable component for displaying the list of exercises
const ExerciseList = ({ exercises, onExerciseClick }) => (
	<FlatList
		data={exercises}
		keyExtractor={(item) => item.id}
		renderItem={({ item }) => (
			<TouchableOpacity
				onPress={() => onExerciseClick(item.id)} // Navigate on click
				style={styles.exerciseItem}
			>
				<Image source={item.image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{item.name}</Text>
			</TouchableOpacity>
		)}
	/>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#1a1a1a",
	},
	searchBar: {
		backgroundColor: "#333",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 20,
		color: "#FFF",
		fontSize: 18,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
	},
	exerciseItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#333",
		padding: 15,
		marginBottom: 12,
		borderRadius: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	exerciseImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
		marginRight: 15,
	},
	exerciseText: {
		fontSize: 18,
		color: "#FFF",
		fontWeight: "600",
	},
});

export default Search;
