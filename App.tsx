import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './src/Home';

const App = () => {
    return (
        <PaperProvider>
            <SafeAreaView>
                <View style={styles.view}>
                    <Home />
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default App;
