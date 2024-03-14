import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { ColorSchemeName } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { darkPaperColorScheme, lightPaperColorScheme } from '../colorSchemes';

type ColorSchemeAction = { type: 'changeColorScheme' };

type ColorScheme = {
    colorScheme: ColorSchemeName;
    paperTheme: ThemeProp;
};

const lightColorScheme: ColorScheme = {
    colorScheme: 'light',
    paperTheme: lightPaperColorScheme,
};

const darkColorScheme: ColorScheme = {
    colorScheme: 'dark',
    paperTheme: darkPaperColorScheme,
};

const initialColorScheme = darkColorScheme;

const ColorSchemeContext = createContext<ColorScheme>(initialColorScheme);
const ColorSchemeDispatchContext = createContext<Dispatch<ColorSchemeAction>>(
    undefined as unknown as Dispatch<ColorSchemeAction>,
); // TODO: fix typings

export function useColorScheme() {
    return useContext(ColorSchemeContext);
}

export function useColorSchemeDispatch() {
    return useContext(ColorSchemeDispatchContext);
}

function colorSchemeReducer(
    colorScheme: ColorScheme,
    action: ColorSchemeAction,
): ColorScheme {
    switch (action.type) {
        case 'changeColorScheme': {
            // TODO: store value in storage
            return colorScheme.colorScheme === 'dark'
                ? lightColorScheme
                : darkColorScheme;
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
}

type ColorSchemeProviderProps = {
    children: React.ReactNode;
};

function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
    const [colorScheme, dispatch] = useReducer(
        colorSchemeReducer,
        initialColorScheme,
    );

    // TODO: initial value from storage

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <ColorSchemeDispatchContext.Provider value={dispatch}>
                {children}
            </ColorSchemeDispatchContext.Provider>
        </ColorSchemeContext.Provider>
    );
}

export default ColorSchemeProvider;
