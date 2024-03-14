import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './src/Home';
import ColorSchemeProvider, {
    useColorScheme,
} from './src/colorSchemes/context/ColorSchemeContext';
import SessionProvider from './src/context/SessionContext';

const App = () => {
    return (
        <SessionProvider>
            <ColorSchemeProvider>
                <StatusBar></StatusBar>
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
