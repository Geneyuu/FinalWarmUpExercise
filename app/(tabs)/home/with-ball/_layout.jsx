import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="withball"
				options={{
					headerShown: true,
					headerStyle: {
						backgroundColor: "#272727", // Background color (dark grey)
						height: 150, // Set header height
					},
					headerLeft: () => (
						<Text
							style={{
								color: "#ABF600", // Title text color
								fontSize: 25, // Title font size
								fontWeight: "500", // Title font weight
								marginLeft: 20, // Adjust the margin from the left edge
								fontFamily: "Oswald-Bold",
							}}
						>
							With Ball Exercises
						</Text>
					),
				}}
			/>
		</Stack>
	);
};

export default Layout;
