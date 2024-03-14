import React from 'react';
import { View } from 'react-native';
import {
    useColorScheme,
    useColorSchemeDispatch,
} from '../../colorSchemes/context/ColorSchemeContext';
import LabeledSwitch from '../../components/LabeledSwitch';

const Config = () => {
    const { colorScheme } = useColorScheme();
    const dispatch = useColorSchemeDispatch();

    return (
        <View>
            <LabeledSwitch
                text="Dark theme"
                value={colorScheme === 'dark'}
                toggle={() => dispatch({ type: 'changeColorScheme' })}
            ></LabeledSwitch>
        </View>
    );
};

export default Config;
