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
import { Ionicons } from "@expo/vector-icons";

// Mock Data for Exercises
const exercisesData = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../assets/images/inplacepreview.png"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../assets/images/wholebodypreview.png"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../assets/images/withballpreview.png"),
	},
];

// Main Component
const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredExercises, setFilteredExercises] = useState(exercisesData);
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();

	// Filter exercises based on the search query
	const filterExercises = (query) => {
		setSearchQuery(query);
		if (!query) {
			setFilteredExercises(exercisesData);
		} else {
			setFilteredExercises(
				exercisesData.filter((exercise) =>
					exercise.name.toLowerCase().includes(query.toLowerCase())
				)
			);
		}
	};

	// Navigate to a specific exercise
	const navigateToExercise = (exerciseId) => {
		if (disabled) return;
		setDisabled(true);
		router.push(`/Search/${exerciseId}`);
		setTimeout(() => setDisabled(false), 1300);
	};

	return (
		<View style={styles.container}>
			<SearchInput value={searchQuery} onChangeText={filterExercises} />
			<ExerciseList
				exercises={filteredExercises}
				onExerciseClick={navigateToExercise}
				disabled={disabled}
			/>
		</View>
	);
};

// Child Component: Search Input
const SearchInput = ({ value, onChangeText }) => (
	<View style={styles.searchBarContainer}>
		<Ionicons
			name="search"
			size={24}
			color="#161616"
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

// Child Component: Exercise List
const ExerciseList = ({ exercises, onExerciseClick, disabled }) => (
	<FlatList
		data={exercises}
		keyExtractor={(item) => item.id}
		renderItem={({ item }) => (
			<TouchableOpacity
				onPress={() => onExerciseClick(item.id)}
				style={styles.exerciseItem}
				disabled={disabled}
			>
				<Image source={item.image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{item.name}</Text>
			</TouchableOpacity>
		)}
	/>
);

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#ffff",
	},
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 20,
		marginTop: 20,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchBar: {
		flex: 1,
		color: "#161616",
		fontSize: 18,
		fontFamily: "Karla-Regular",
	},
	exerciseItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 10,
		marginInline: 18,
		marginBottom: 12,
		borderRadius: 10,
		borderWidth: 1,
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
		color: "#161616",
		fontWeight: "600",
		fontFamily: "Karla-Regular",
	},
});

export default Search;
