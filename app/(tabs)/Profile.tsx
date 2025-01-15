import React, { useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Data } from "../_layout"; // Import the context
import { useRouter } from "expo-router"; // Import router

const Profile = () => {
	const { name, setName } = useContext(Data); // Access name and setName
	const router = useRouter(); // Initialize router

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			textAlign: "center",
			alignItems: "center",
			padding: 20,
			backgroundColor: "#fff",
		},
		title: {
			fontSize: 24,
			fontWeight: "bold",
			marginBottom: 20,
		},
		input: {
			borderWidth: 1,
			borderColor: "#ccc",
			borderRadius: 5,
			padding: 10,
			marginBottom: 20,
		},
		name: {
			marginBottom: 20,
		},
	});

	const handleSave = () => {
		// Save and then redirect to home
		alert(`You set your name to: ${name}!`);
		router.replace("/home");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			<Text style={styles.name}>Current Name: {name}</Text>

			{/* Input to Change Name */}
			<TextInput
				style={styles.input}
				placeholder="Enter new name"
				value={name}
				onChangeText={(text) => setName(text)} // Update name in context
			/>

			{/* Save Button */}
			<Button title="Save" onPress={handleSave} />
		</View>
	);
};

export default Profile;
