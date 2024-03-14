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
                <AppWithPaper />
            </ColorSchemeProvider>
        </SessionProvider>
    );
};

const AppWithPaper = () => {
    const { paperTheme, colorScheme } = useColorScheme();
    const statusBarBackgroundColor = paperTheme.colors?.background;
    const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

    return (
        <PaperProvider theme={paperTheme}>
            <SessionProvider>
                <StatusBar
                    style={statusBarStyle}
                    backgroundColor={statusBarBackgroundColor}
                />
                <Home />
            </SessionProvider>
        </PaperProvider>
    );
};

export default App;
