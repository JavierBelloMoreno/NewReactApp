import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNumber = Math.floor(Math.random() * (max - min)) + min;
	if (rndNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNumber;
	}
};

const GameScreen = (props) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don/'t lie", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
	};

	return (
		<View style={styles.screen}>
			<Text>Oponent Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button
					title="LOWER"
					onPress={(nextGuessHandler.bind(this, "lower"))}
				/>
				<Button
					title="GREATER"
					onPress={(nextGuessHandler.bind(this, "greater"))}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		maxWidth: "80%",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
	},
});

export default GameScreen;