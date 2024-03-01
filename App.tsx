import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeName, SafeAreaView, StyleSheet, View } from 'react-native';
import { PaperProvider, Switch, Text } from 'react-native-paper';
import Home from './src/Home';
import { useColorScheme } from 'react-native';
import { dark, light } from './src/colorSchemes';
import { fromStorage, intoStorage } from './src/storage';

const colorSchemeKey = 'colorScheme';

const App = () => {
    const deviceColorScheme = useColorScheme();

    const [colorScheme, setColorScheme] = useState<ColorSchemeName | undefined>(
        undefined,
    );

    let backgroundColor;

    if (colorScheme === 'dark') {
        backgroundColor = styles.dark;
    } else if (colorScheme === 'light') {
        backgroundColor = styles.light;
    } else {
        backgroundColor = undefined;
    }

    const onChangeColorScheme = () => {
        setColorScheme((prev) => {
            return prev === 'dark' ? 'light' : 'dark';
        });
        intoStorage<ColorSchemeName>(colorSchemeKey, colorScheme);
    };

    const paperTheme = colorScheme === 'dark' ? dark : light;

    useEffect(() => {
        const setTheme = async () => {
            if (colorScheme !== undefined) return;

            const storageTheme = await fromStorage<ColorSchemeName>(
                colorSchemeKey,
            );

            // use storage theme if defined
            if (storageTheme !== undefined) {
                setColorScheme(storageTheme);
                return;
            }

            // use device theme
            intoStorage<ColorSchemeName>(colorSchemeKey, deviceColorScheme);
            setColorScheme(deviceColorScheme);
        };

        setTheme();
    }, []);

    return (
        <PaperProvider theme={paperTheme}>
            <SafeAreaView style={[styles.view, backgroundColor]}>
                <View>
                    <Home />
                    <StatusBar style="auto" />
                    <View style={styles.switch}>
                        <Text>Dark mode</Text>
                        <Switch
                            value={colorScheme === 'dark'}
                            onValueChange={onChangeColorScheme}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    view: { flex: 1 },
    dark: { backgroundColor: dark.colors.background },
    light: { backgroundColor: light.colors.background },
    switch: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default App;
