import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

// Main Home Component
const Home = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#fff",
		},
	});

	return (
		<View style={styles.container}>
			{/* Header */}
			<Header />

			{/* Featured Exercises */}
			<FeaturedExercises />

			{/* Categories */}
			<Categories />
		</View>
	);
};

// LogoSection Component
const LogoSection = () => {
	const styles = StyleSheet.create({
		logoContainer: {
			flexDirection: "row",
			alignItems: "center",
		},
		logo: {
			position: "absolute",
			top: -15,
			left: 28,
			width: 40,
			height: 50,
			marginRight: 10,
		},
		headerText: {
			fontSize: 38,
			fontFamily: "Oswald-Bold",
			color: "#ABF600",
		},
	});

	return (
		<View style={styles.logoContainer}>
			{/* <Image
				source={{
					uri: "https://via.placeholder.com/60x50.png?text=Logo",
				}}
				style={styles.logo}
			/> */}
			<Image
				source={require("../../../assets/images/logo2.png")}
				style={styles.logo}
			/>
			<Text style={styles.headerText}>HoopReady</Text>
		</View>
	);
};

// ProfileSection Component
const ProfileSection = () => {
	const router = useRouter();
	const styles = StyleSheet.create({
		profileSection: {
			flexDirection: "row",
			alignItems: "center",
		},
		greetingText: {
			fontSize: 14,
			color: "#FFFFFF",
			fontFamily: "Karla-Regular",
		},
		greetingName: {
			color: "#ABF600",
		},
		subGreetingText: {
			fontSize: 12,
			fontFamily: "Karla-Regular",
			color: "#AAAAAA",
			marginTop: 2,
			textAlign: "right",
		},
		profileContainer: {
			marginLeft: 10,
			width: 60,
			height: 60,
			borderRadius: 10,
			overflow: "hidden",
		},
		profileImage: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
	});

	return (
		<View style={styles.profileSection}>
			<View>
				<Text style={styles.greetingText}>
					Hello, <Text style={styles.greetingName}>Eugene</Text>
				</Text>
				<Text style={styles.subGreetingText}>Philippines</Text>
			</View>
			<TouchableOpacity
				style={styles.profileContainer}
				onPress={() => router.push("/Profile")}
			>
				<Image
					source={require("../../../assets/images/default-logo.webp")}
					style={styles.profileImage}
				/>
			</TouchableOpacity>
		</View>
	);
};

// SubHeader Component
const SubHeader = () => {
	const styles = StyleSheet.create({
		subHeaderText: {
			marginTop: 0,
			fontSize: 10,
			color: "#FFFFFF",
			fontFamily: "Karla-ExtraLight",
			width: "50%",
		},
	});

	return (
		<Text style={styles.subHeaderText}>
			Basketball Warm-Up Exercises, exclusive for Lorem ipsum dolor sit
			amet.
		</Text>
	);
};

// Header Component
const Header = () => {
	const styles = StyleSheet.create({
		header: {
			padding: 20,
			backgroundColor: "#272727",
			borderBottomWidth: 5,
			borderBottomColor: "#ABF600",
			borderBottomEndRadius: 55,
		},
		headerRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
	});

	return (
		<View style={styles.header}>
			<View style={styles.headerRow}>
				<LogoSection />
				<ProfileSection />
			</View>
			<SubHeader />
		</View>
	);
};

// FeaturedExercises Component
const FeaturedExercises = () => {
	const styles = StyleSheet.create({
		featuredContainer: {
			marginBottom: 0,
			padding: 20,
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: "bold",
			marginBottom: 5,
			fontFamily: "Karla-Bold",
		},
		featuredBox: {
			height: 150,
			backgroundColor: "#000",
			borderRadius: 10,
		},
	});

	return (
		<View style={styles.featuredContainer}>
			<Text style={styles.sectionTitle}>Featured Exercises</Text>
			<View style={styles.featuredBox}></View>
		</View>
	);
};

// CategoryCard Component
const CategoryCard = ({ title, imageUri, navigationPath }) => {
	const router = useRouter();
	const styles = StyleSheet.create({
		categoryCard: {
			width: "45%",
			marginBottom: 45,
			borderRadius: 10,
			overflow: "hidden",
			backgroundColor: "#f0f0f0",
		},
		cardImage: {
			width: "100%",
			height: 100,
		},
		cardText: {
			textAlign: "center",
			padding: 5,
			fontWeight: "bold",
			fontFamily: "Karla-SemiBold",
		},
	});

	return (
		<TouchableOpacity
			style={styles.categoryCard}
			onPress={() => router.push(navigationPath)}
		>
			<Image style={styles.cardImage} source={{ uri: imageUri }} />
			<Text style={styles.cardText}>{title}</Text>
		</TouchableOpacity>
	);
};

// Categories Component
const Categories = () => {
	const styles = StyleSheet.create({
		categoriesContainer: {
			flex: 1,
			padding: 20,
		},
		categoriesGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
		},
		sectionTitle: {
			fontSize: 18,
			marginBottom: 10,
			fontFamily: "Karla-Bold",
		},
	});

	return (
		<View style={styles.categoriesContainer}>
			<Text style={styles.sectionTitle}>Categories</Text>
			<ScrollView
				contentContainerStyle={styles.categoriesGrid}
				showsVerticalScrollIndicator={false}
			>
				<CategoryCard
					title="Whole Body (Dynamic)"
					imageUri="https://via.placeholder.com/150"
					navigationPath="home/whole-body/details"
				/>
				<CategoryCard
					title="In Place"
					imageUri="https://via.placeholder.com/150"
					navigationPath="home/in-place/inplace"
				/>
				<CategoryCard
					title="With Ball"
					imageUri="https://via.placeholder.com/150"
					navigationPath="home/with-ball/withball"
				/>
				<CategoryCard
					title="Stretching"
					imageUri="https://via.placeholder.com/150"
					navigationPath="home/stretching/stretching"
				/>
			</ScrollView>
		</View>
	);
};

export default Home;
