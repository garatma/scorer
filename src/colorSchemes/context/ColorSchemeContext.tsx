import React, {
    Dispatch,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import { ColorSchemeName } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { darkPaperColorScheme, lightPaperColorScheme } from '../colorSchemes';
import { fromStorageDo, intoStorage } from '../../utils/storage';

const colorSchemeKey = 'colorScheme';

type ColorSchemeAction =
    | {
          type: 'colorScheme/Toggle';
      }
    | {
          type: 'colorScheme/fromStorage';
          payload: ColorSchemeName;
      };

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
    {} as Dispatch<ColorSchemeAction>,
);

function useColorScheme() {
    return useContext(ColorSchemeContext);
}

function useColorSchemeDispatch() {
    return useContext(ColorSchemeDispatchContext);
}

function colorSchemeReducer(
    colorScheme: ColorScheme,
    action: ColorSchemeAction,
): ColorScheme {
    switch (action.type) {
        case 'colorScheme/Toggle': {
            intoStorage<ColorSchemeName>(
                colorSchemeKey,
                colorScheme.colorScheme === 'dark' ? 'light' : 'dark',
            );

            return colorScheme.colorScheme === 'dark'
                ? lightColorScheme
                : darkColorScheme;
        }
        case 'colorScheme/fromStorage': {
            return action.payload === 'dark'
                ? darkColorScheme
                : lightColorScheme;
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

    useEffect(() => {
        fromStorageDo<ColorSchemeName>(colorSchemeKey, (value) =>
            dispatch({ type: 'colorScheme/fromStorage', payload: value }),
        );
    }, []);

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <ColorSchemeDispatchContext.Provider value={dispatch}>
                {children}
            </ColorSchemeDispatchContext.Provider>
        </ColorSchemeContext.Provider>
    );
}

export { useColorScheme, useColorSchemeDispatch, ColorSchemeProvider };
