import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Config from './Config';

const Home = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ ...styles.view, paddingTop: insets.top }}>
            <Config />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default Home;
