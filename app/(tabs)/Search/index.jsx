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
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

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
	const [disabled, setDisabled] = useState(false); // New state for disabling button
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
		if (disabled) return; // Prevent click if disabled
		setDisabled(true); // Disable the button
		router.push(`/Search/${exerciseId}`);

		// Re-enable after 1.30 seconds
		setTimeout(() => setDisabled(false), 1300);
	};

	return (
		<View style={styles.container}>
			{/* Search Input */}
			<SearchInput value={searchQuery} onChangeText={filterExercises} />

			{/* List of filtered exercises */}
			<ExerciseList
				exercises={filteredExercises}
				onExerciseClick={navigateToExercise}
				disabled={disabled} // Pass disabled state to ExerciseList
			/>
		</View>
	);
};

// Reusable component for the search input with Ionicons
const SearchInput = ({ value, onChangeText }) => (
	<View style={styles.searchBarContainer}>
		<Ionicons
			name="search"
			size={24}
			color="#ABF600"
			style={styles.searchIcon}
		/>
		<TextInput
			style={styles.searchBar}
			placeholder="Search exercises..."
			placeholderTextColor="#888"
			value={value}
			onChangeText={onChangeText}
		/>
	</View>
);

// Reusable component for displaying the list of exercises
const ExerciseList = ({ exercises, onExerciseClick, disabled }) => (
	<FlatList
		data={exercises}
		keyExtractor={(item) => item.id}
		renderItem={({ item }) => (
			<TouchableOpacity
				onPress={() => onExerciseClick(item.id)} // Navigate on click
				style={styles.exerciseItem}
				disabled={disabled} // Disable button when state is true
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
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#333",
		paddingVertical: 5,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 20,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchBar: {
		flex: 1,
		color: "#ABF600",
		fontSize: 18,
		fontFamily: "Karla-Regular",
	},
	exerciseItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
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
		fontFamily: "Karla-Regular",
	},
});

export default Search;
