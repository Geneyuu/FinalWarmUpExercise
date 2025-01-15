import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

export default function Index() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Preload the fonts
		const loadAssets = async () => {
			try {
				await Font.loadAsync({
					"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
					"Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
					"Karla-SemiBold": require("../assets/fonts/Karla-SemiBold.ttf"),
					"Karla-BoldItalic": require("../assets/fonts/Karla-BoldItalic.ttf"),
					"Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
					"Karla-ExtraBoldItalic": require("../assets/fonts/Karla-ExtraBoldItalic.ttf"),
					"Karla-ExtraLight": require("../assets/fonts/Karla-ExtraLight.ttf"),
					"Karla-ExtraLightItalic": require("../assets/fonts/Karla-ExtraLightItalic.ttf"),
					"Karla-Italic": require("../assets/fonts/Karla-Italic.ttf"),
					"Karla-Light": require("../assets/fonts/Karla-Light.ttf"),
					"Karla-LightItalic": require("../assets/fonts/Karla-LightItalic.ttf"),
					"Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
					"Karla-MediumItalic": require("../assets/fonts/Karla-MediumItalic.ttf"),
					"Karla-SemiBoldItalic": require("../assets/fonts/Karla-SemiBoldItalic.ttf"),
					"Oswald-Bold": require("../assets/fonts/Oswald-Bold.ttf"),
					// Add other fonts here as needed
				});

				// Once fonts are loaded, set isLoading to false
				setIsLoading(false);
				router.replace("/(tabs)/home");
				// router.replace("/");
			} catch (error) {
				console.error("Error loading fonts:", error);
				setIsLoading(false);
			}
		};

		loadAssets();
	}, [router]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}

	return null;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	text: {
		marginTop: 10,
		fontSize: 16,
		color: "#333333",
	},
});
