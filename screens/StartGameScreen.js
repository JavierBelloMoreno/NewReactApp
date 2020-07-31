import React, { useState } from "react";

import {
	View,
	StyleSheet,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";

import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState(" ");
	const [confirm, setConfirm] = useState(false);
	const [selectNumber, setSelectNumber] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirm(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be a number between 1 and 99.",
				[
					{
						text: "Okey",
						style: "destructive",
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}
		setConfirm(true);
		setEnteredValue("");
		setSelectNumber(chosenNumber);
		Keyboard.dismiss();
	};

	let confirmOutput;

	if (confirm) {
		confirmOutput = (
			<Card style={styles.sumaryContainer}>
				<BodyText>You Selected</BodyText>
				<NumberContainer>{selectNumber}</NumberContainer>
				<Button
					title="START GAME"
					onPress={() => props.onStartGame(selectNumber)}
				/>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText style={styles.text}>Select a Number</BodyText>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								onPress={resetInputHandler}
								color={colors.secondary}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								onPress={confirmInputHandler}
								color={colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
		marginVertical: 10,
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	button: {
		width: 100,
	},
	input: {
		width: 60,
		textAlign: "center",
	},
	sumaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
});

export default StartGameScreen;
