import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

type Props = {
    text: string;
    value: boolean;
    toggle: () => void;
};

const LabeledSwitch = ({ text, value, toggle }: Props) => {
    return (
        <View style={styles.view}>
            <Text>{text}</Text>
            <Switch value={value} onValueChange={toggle}></Switch>
        </View>
    );
};

const styles = StyleSheet.create({
    view: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});

export default LabeledSwitch;
