import AsyncStorage from '@react-native-async-storage/async-storage';

const fromStorage = async <T>(key: string): Promise<T | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        // TODO: handle error
    }
};

const fromStorageDo = async <T>(
    key: string,
    setter: React.Dispatch<React.SetStateAction<T>>,
) => {
    const storageValue = await fromStorage<T>(key);
    if (storageValue !== undefined) setter(storageValue);
};

const intoStorage = async <T>(key: string, value: T) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // TODO: handle error
    }
};

const removeFromStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // TODO: handle error
    }
};

export { fromStorage, fromStorageDo, intoStorage, removeFromStorage };
