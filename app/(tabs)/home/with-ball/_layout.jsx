import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CustomHeader = () => {
	const router = useRouter();

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				onPress={() => router.back()}
				style={styles.arrowContainer}
			>
				<Ionicons name="arrow-back" size={24} color="#ABF600" />
			</TouchableOpacity>
			<Text style={styles.headerTitle}>With Ball Exercises</Text>
		</View>
	);
};

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="withball"
				options={{
					headerShown: true,
					header: () => <CustomHeader />,
					// headerStyle: {
					// 	backgroundColor: "#272727", // Background color (dark grey)
					// 	height: 120, // Increase header height
					// },
					headerTitleAlign: "center", // Align the title to the center
					headerBackTitleVisible: false, // Hide back button title
					headerTintColor: "#ABF600", // Set arrow icon color
				}}
			/>
		</Stack>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#272727", // Background color (dark grey)
		height: 100, // Increase header height
		paddingHorizontal: 20, // Add padding to the left and right of the header
		borderBottomWidth: 4,
		borderBottomColor: "#ABF600",
	},
	arrowContainer: {
		marginLeft: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		color: "#ABF600", // Title text color
		fontSize: 30, // Larger font size for emphasis
		fontFamily: "Oswald-Bold", // Custom font family
		textAlign: "center", // Center-align the title
		letterSpacing: 0, // Add spacing between letters
		textTransform: "capitalize", // Make the text uppercase
		flex: 1, // Allow the title to take up remaining space
	},
});

export default Layout;
