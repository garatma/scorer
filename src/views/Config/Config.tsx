import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useConfig, useConfigDispatch } from '../../contexts/ConfigContext';
import LabeledSwitch from '../../components/LabeledSwitch';
import { Button, Text, TextInput } from 'react-native-paper';

const Config = () => {
    const { colors, victoryScore } = useConfig();
    const dispatch = useConfigDispatch();

    // TODO: extract alongside ± buttons to another component
    const onChangeScoreByButton = (delta: number) => {
        const score =
            victoryScore === ''
                ? 0 + delta
                : Number.parseInt(victoryScore) + delta;

        dispatch({ type: 'victoryScore/set', payload: score.toString() });
    };

    return (
        <View style={styles.view}>
            <LabeledSwitch
                text="Dark theme"
                value={colors.colorScheme === 'dark'}
                toggle={() => dispatch({ type: 'colorScheme/Toggle' })}
            ></LabeledSwitch>
            <View style={styles.winScore}>
                <Text>Win score</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Score"
                    value={victoryScore}
                    onChangeText={(text) =>
                        dispatch({ type: 'victoryScore/set', payload: text })
                    }
                />
                <Button
                    icon="minus-circle"
                    onPress={() => onChangeScoreByButton(-1)}
                >
                    {''}
                </Button>
                <Button
                    icon="plus-circle"
                    onPress={() => onChangeScoreByButton(+1)}
                >
                    {''}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: { paddingRight: 20, paddingLeft: 20 },
    winScore: { flexDirection: 'row', alignItems: 'center', gap: 20 },
});

export default Config;
