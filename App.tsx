import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import Home from './src/Home';
import { SessionProvider } from './src/context/SessionContext';
import {
    ColorSchemeProvider,
    useColorScheme,
} from './src/colorSchemes/context/ColorSchemeContext';

const App = () => {
    return (
        <SessionProvider>
            <ColorSchemeProvider>
                <StatusBar style="auto" />
                <AppWithPaper />
            </ColorSchemeProvider>
        </SessionProvider>
    );
};

const AppWithPaper = () => {
    const { paperTheme } = useColorScheme();

    return (
        <PaperProvider theme={paperTheme}>
            <SessionProvider>
                <Home />
            </SessionProvider>
        </PaperProvider>
    );
};

export default App;
