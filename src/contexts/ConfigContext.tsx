import React, {
    Dispatch,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import { ColorSchemeName } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import {
    darkPaperColorScheme,
    lightPaperColorScheme,
} from '../colorSchemes/colorSchemes';
import { fromStorageDo, intoStorage } from '../utils/storage';

const colorSchemeKey = 'colorScheme';
const victoryScoreKey = 'victoryScore';

type ColorScheme = {
    colorScheme: ColorSchemeName;
    paperTheme: ThemeProp;
};

type Config = {
    colors: ColorScheme;
    victoryScore: string;
};

type ConfigAction =
    | {
          type: 'colorScheme/Toggle';
      }
    | {
          type: 'colorScheme/fromStorage';
          payload: ColorSchemeName;
      }
    | {
          type: 'victoryScore/fromStorage';
          payload: string;
      }
    | {
          type: 'victoryScore/set';
          payload: string;
      };

const lightColorScheme: ColorScheme = {
    colorScheme: 'light',
    paperTheme: lightPaperColorScheme,
};

const darkColorScheme: ColorScheme = {
    colorScheme: 'dark',
    paperTheme: darkPaperColorScheme,
};

const initialConfig: Config = {
    colors: darkColorScheme,
    victoryScore: '100',
};

const ConfigContext = createContext<Config>(initialConfig);
const ConfigDispatchContext = createContext<Dispatch<ConfigAction>>(
    {} as Dispatch<ConfigAction>,
);

function useConfig() {
    return useContext(ConfigContext);
}

function useConfigDispatch() {
    return useContext(ConfigDispatchContext);
}

function configReducer(config: Config, action: ConfigAction): Config {
    switch (action.type) {
        case 'colorScheme/Toggle': {
            intoStorage<ColorSchemeName>(
                colorSchemeKey,
                config.colors.colorScheme === 'dark' ? 'light' : 'dark',
            );

            const colors =
                config.colors.colorScheme === 'dark'
                    ? lightColorScheme
                    : darkColorScheme;

            return {
                ...config,
                colors,
            };
        }
        case 'colorScheme/fromStorage': {
            const colors =
                action.payload === 'dark' ? darkColorScheme : lightColorScheme;

            return {
                ...config,
                colors,
            };
        }
        case 'victoryScore/set': {
            intoStorage<string>(victoryScoreKey, action.payload);
            return {
                ...config,
                victoryScore: action.payload,
            };
        }
        case 'victoryScore/fromStorage': {
            return {
                ...config,
                victoryScore: action.payload,
            };
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
}

type ConfigProviderProps = {
    children: React.ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
    const [config, dispatch] = useReducer(configReducer, initialConfig);

    useEffect(() => {
        fromStorageDo<ColorSchemeName>(colorSchemeKey, (value) =>
            dispatch({ type: 'colorScheme/fromStorage', payload: value }),
        );

        fromStorageDo<string>(victoryScoreKey, (value) =>
            dispatch({ type: 'victoryScore/fromStorage', payload: value }),
        );
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            <ConfigDispatchContext.Provider value={dispatch}>
                {children}
            </ConfigDispatchContext.Provider>
        </ConfigContext.Provider>
    );
}

export { useConfig, useConfigDispatch, ConfigProvider };
