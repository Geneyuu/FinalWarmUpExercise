import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

// Define the TabIcon component
const TabIcon = ({ name, focused, color, icon }) => {
	return (
		<View style={styles.iconWrapper}>
			{/* Show focused border when the tab is active */}
			{focused && <View style={styles.focusedBorder} />}
			<Ionicons
				name={icon}
				size={26}
				color={focused ? "#ABF600" : color}
			/>
		</View>
	);
};

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: true,
				tabBarActiveTintColor: "#ABF600", // Active tab label and icon color
				tabBarInactiveTintColor: "white", // Inactive tab label and icon color
				tabBarStyle: {
					backgroundColor: "#272727", // Tab bar background color
					borderTopColor: "#232522", // Tab bar top border color
					height: 80, // Tab bar height
					borderTopWidth: 0, // Removing the top border line
					paddingTop: 12, // Padding to avoid clipping with the tab icons
					paddingBottom: 5,
					paddingInline: 15,
				},
			}}
		>
			{/* Home Tab */}
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon={focused ? "fitness-sharp" : "fitness-outline"}
							color={color}
							name="Home"
							focused={focused}
						/>
					),
				}}
			/>

			{/* Exercises Tab */}
			<Tabs.Screen
				name="Search"
				options={{
					headerShown: false,
					tabBarLabel: "Exercises",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon="search-sharp"
							color={color}
							name="Exercises"
							focused={focused}
						/>
					),
				}}
			/>

			{/* Profile Tab */}
			<Tabs.Screen
				name="Profile"
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon="person"
							color={color}
							name="Profile"
							focused={focused}
						/>
					),
				}}
			/>

			{/* Settings Tab */}
			<Tabs.Screen
				name="Settings"
				options={{
					tabBarLabel: "Settings",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon="settings"
							color={color}
							name="Settings"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;

const styles = StyleSheet.create({
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: 60,
		paddingTop: 0, // Add padding to avoid clipping with the border
	},
	focusedBorder: {
		width: "100%",
		height: 4,
		backgroundColor: "#ABF600", // Green color for the focused border
		position: "absolute",
		top: -19, // Adjust position for the border
	},
});
