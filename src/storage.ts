import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async <T>(key: string): Promise<T | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        // TODO: handle error
    }
};

const storeData = async <T>(key: string, value: T) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // TODO: handle error
    }
};

export { getData, storeData };
