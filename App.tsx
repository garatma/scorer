import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import Home from './src/Home';
import { SessionProvider } from './src/contexts/SessionContext';
import { ConfigProvider, useConfig } from './src/contexts/ConfigContext';

const App = () => {
    return (
        <SessionProvider>
            <ConfigProvider>
                <AppWithPaper />
            </ConfigProvider>
        </SessionProvider>
    );
};

const AppWithPaper = () => {
    const { colors } = useConfig();
    const statusBarBackgroundColor = colors.paperTheme.colors?.background;
    const statusBarStyle = colors.colorScheme === 'dark' ? 'light' : 'dark';

    return (
        <PaperProvider theme={colors.paperTheme}>
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
