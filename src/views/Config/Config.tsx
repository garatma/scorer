import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    useColorScheme,
    useColorSchemeDispatch,
} from '../../colorSchemes/context/ColorSchemeContext';
import LabeledSwitch from '../../components/LabeledSwitch';

const Config = () => {
    const { colorScheme } = useColorScheme();
    const dispatch = useColorSchemeDispatch();

    return (
        <View style={styles.view}>
            <LabeledSwitch
                text="Dark theme"
                value={colorScheme === 'dark'}
                toggle={() => dispatch({ type: 'colorScheme/Toggle' })}
            ></LabeledSwitch>
        </View>
    );
};

const styles = StyleSheet.create({
    view: { paddingRight: 20, paddingLeft: 20 },
});

export default Config;
